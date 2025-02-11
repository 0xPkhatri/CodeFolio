## 01
high

# Missing Update for RiskParams.isRegistered Boolean in Operation#setPerpRiskParams Function

## Summary

In the Operation#setPerpRiskParams function, if the perp is already registered and the setPerpRiskParams function is called, it fails to update the boolean isRegistered to true.

## Vulnerability Detail

The setPerpRiskParams function is intended to set or update RiskParams in the perpRiskParams mapping. However, the function does not correctly update the isRegistered in the state.perpRiskParams[perp] mapping when the perp RiskParams are already registered.
Example:

- Suppose the perp and RiskParams are already registered, and the owner wants to set them again, using [setPerpRiskParams](https://github.com/sherlock-audit/2023-04-jojo/blob/main/smart-contract-EVM/contracts/impl/JOJOOperation.sol#L32-L37) which calls [Operation.setPerpRiskParams(state, perp, param)](https://github.com/sherlock-audit/2023-04-jojo/blob/main/smart-contract-EVM/contracts/lib/Operation.sol#L45-L75)
- The setPerpRiskParams function starts by checking if the market is already registered

```solidity
if (state.perpRiskParams[perp].isRegistered && !param.isRegistered)

where,
state.perpRiskParams[perp].isRegistered = true
param.isRegistered = false // param.isRegistered is initially set to false, causing the if statement to execute

```
- The perp is already registered and needs to be removed. It does this by iterating through the state.registeredPerp array, replacing the target perp with the last element in the array, and then removing the last element.
- Finally, the function updates the risk parameters for the given perp in the state.perpRiskParams mapping.

```solidity
state.perpRiskParams[perp] = param;
```

- However, here param.isRegistered = false and the owner neglects to update param.isRegistered = true

## Impact

This results in an incorrect param.isRegistered boolean status and DOS the system.

## Code Snippet

https://github.com/sherlock-audit/2023-04-jojo/blob/main/smart-contract-EVM/contracts/impl/JOJOOperation.sol#L32-L37
https://github.com/sherlock-audit/2023-04-jojo/blob/main/smart-contract-EVM/contracts/lib/Operation.sol#L45-L75

## Tool used

Manual Review

## Recommendation

After setting RiskParams, update param.isRegistered to true:

```diff
function setPerpRiskParams(
    Types.State storage state,
    address perp,
    Types.RiskParams calldata param
) external {
    if (state.perpRiskParams[perp].isRegistered && !param.isRegistered) {
        // remove perp
        for (uint256 i; i < state.registeredPerp.length;) {
            if (state.registeredPerp[i] == perp) {
                state.registeredPerp[i] = state.registeredPerp[
                    state.registeredPerp.length - 1
                ];
                state.registeredPerp.pop();
            }
            unchecked {
                ++i;
            }
        }
    }
    if (!state.perpRiskParams[perp].isRegistered && param.isRegistered) {
        // new perp
        state.registeredPerp.push(perp);
    }
    require(
        param.liquidationPriceOff + param.insuranceFeeRate <=
            param.liquidationThreshold,
        Errors.INVALID_RISK_PARAM
    );
    state.perpRiskParams[perp] = param;
+   state.perpRiskParams[perp].isRegistered = true;
    emit UpdatePerpRiskParams(perp, param);
}
```

## 02
medium

# User not able to claim Prizes in the FootiumPrizeDistributor#claimERC20Prize Function

## Summary

In the FootiumPrizeDistributor#claimERC20Prize function, which prevents users from claiming prizes if user eligible for second time or eligible for multiple prize for the same token. The issue arises due to the implementation of the totalERC20Claimed mapping that does not consider updated prize amounts for the same user.

## Vulnerability Detail

The claimERC20Prize function calculates the value to be claimed by the user using the following line:

```solidity
uint256 value = _amount - totalERC20Claimed[_token][_to];
```
If a user has already claimed a prize for a specific token and wins another prize, the value will be less than or equal to zero due to the totalERC20Claimed[_token][_to] being equal to or greater than the _amount. Consequently, the user will not be able to claim their new prize using the same _amount value.

## Impact

This vulnerability affects users who have won multiple prizes for the same token or eligible for prize another time. They will not be able to claim their new prizes, resulting in a loss of rewards for users.

## Code Snippet

https://github.com/sherlock-audit/2023-04-footium/blob/main/footium-eth-shareable/contracts/FootiumPrizeDistributor.sol#L106-L134

## Tool used

Manual Review

## Recommendation
update mapping for each Round of prize distribution 

```diff
+    uint256 public roundNumber;
-    mapping(IERC20Upgradeable => mapping(address => uint256))
-        private totalERC20Claimed;
-    mapping(address => uint256) private totalETHClaimed;
+    mapping(roundNumber => mapping(IERC20Upgradeable => mapping(address => uint256)))
+        private totalERC20Claimed;
+    mapping(roundNumber => mapping(address => uint256)) private totalETHClaimed;

```
```diff
function claimERC20Prize(
    address _to,
    IERC20Upgradeable _token,
    uint256 _amount,
    bytes32[] calldata _proof
) external whenNotPaused nonReentrant {
    if (_to != msg.sender) {
        revert InvalidAccount();
    }

    if (
        !MerkleProofUpgradeable.verify(
            _proof,
            erc20MerkleRoot,
            keccak256(abi.encodePacked(_token, _to, _amount))
        )
    ) {
        revert InvalidERC20MerkleProof();
    }

-    uint256 value = _amount - totalERC20Claimed[_token][_to];
+    uint256 value = _amount - totalERC20Claimed[roundNumber][_token][_to];

    if (value > 0) {
-        totalERC20Claimed[_token][_to] += value;
+        totalERC20Claimed[roundNumber][_token][_to] += value;
        _token.transfer(_to, value);
    }

    emit ClaimERC20(_token, _to, value);
}
```
## 03
high

# Failure Due to Uninitialized Deadline in USSD#UniV3SwapInput Function Transaction

## Summary

In the USSD#UniV3SwapInput function, the 'deadline' parameter is presently commented out. This parameter is critical for the correct operation of the 'uniRouter.exactInput' function, which utilizes the 'checkDeadline' modifier in 'uniRouter'. The absence of a valid 'deadline' parameter in the function call defaults it to a value of 0, causing the 'UniV3SwapInput' function to revert.

## Vulnerability Detail
The 'deadline' parameter is not initialized when calling the 'uniRouter.exactInput' function within the 'UniV3SwapInput' function. As a result, an uninitialized value for 'deadline' is passed to 'uniRouter.exactInput'.

In the 'UniV3SwapInput' function code snippet below, note that 'deadline' is commented out:

```solidity
    function UniV3SwapInput(
        bytes memory _path,
        uint256 _sellAmount
    ) public override onlyBalancer {
        IV3SwapRouter.ExactInputParams memory params = IV3SwapRouter
            .ExactInputParams({
                path: _path,
                recipient: address(this),
                //deadline: block.timestamp,
                amountIn: _sellAmount,
                amountOutMinimum: 0
            });
        uniRouter.exactInput(params);
    }
```

This leads to a default value of 0 being passed to 'checkDeadline(params.deadline)' modifier, due to the uninitialized 'deadline' parameter.

```solidity
    function exactInput(ExactInputParams memory params)
        external
        payable
        override
        checkDeadline(params.deadline)
        returns (uint256 amountOut)
    {
   //// Rest of the function's logic
 }
```

As a result, the 'require' condition in the modifier fails because the current block timestamp will always be greater than 0, leading to transaction reversion.

```solidity
  modifier checkDeadline(uint256 deadline) {
      require(_blockTimestamp() <= deadline, 'Transaction too old');
      _;
  }
```

## Impact

Any call to the 'UniV3SwapInput' function will fail due to the 'deadline' being initialized to 0 by default.

## Code Snippet

[USSD.sol](https://github.com/sherlock-audit/2023-05-USSD/blob/main/ussd-contracts/contracts/USSD.sol#L227-L240)

[SwapRouter.sol](https://github.com/Uniswap/v3-periphery/blob/6cce88e63e176af1ddb6cc56e029110289622317/contracts/SwapRouter.sol#L132-L166)

[PeripheryValidation.sol](https://github.com/Uniswap/v3-periphery/blob/6cce88e63e176af1ddb6cc56e029110289622317/contracts/base/PeripheryValidation.sol#L7-L10)

## Tool used

Manual Review

## Recommendation

To rectify this issue, properly initialize the 'deadline' parameter before calling the 'exactInput' function. This would ensure that the transaction remains valid within the specified timeframe. Consider uncommenting the 'deadline' parameter and assigning it an appropriate value, typically the current block timestamp plus a desired duration.

## 04
high

# Incorrect Withdrawal Amount for ERC20 Tokens in CollateralEscrowV1

## Summary
The incorrect amount is used when withdrawing ERC20 tokens. The contract uses the stored collateral amount instead of the requested withdrawal amount.

## Vulnerability Detail
In the `_withdrawCollateral` function, when withdrawing an ERC20 token, the function incorrectly uses `_collateral._amount` instead of `_amount`. This could lead to incorrect withdrawal amounts, potentially allowing to withdraw more tokens than intended.

## Impact
This vulnerability could result in incorrect ERC20 token withdrawal amounts, leading to incorrect balances in the contract and potentially allowing the to withdraw more tokens than intended.

## Code Snippet
https://github.com/sherlock-audit/2023-03-teller/blob/main/teller-protocol-v2/packages/contracts/contracts/escrow/CollateralEscrowV1.sol#L95-L100
https://github.com/sherlock-audit/2023-03-teller/blob/main/teller-protocol-v2/packages/contracts/contracts/escrow/CollateralEscrowV1.sol#L165-L170

## Tool used

Manual Review

## Recommendation
To fix this issue, replace _collateral._amount with _amount in the ERC20 withdrawal section of the _withdrawCollateral function:

```solidity
function _withdrawCollateral(
    Collateral memory _collateral,
    address _collateralAddress,
    uint256 _amount,
    address _recipient
) internal {
    // Withdraw ERC20
    if (_collateral._collateralType == CollateralType.ERC20) {
        IERC20Upgradeable(_collateralAddress).transfer(
            _recipient,
-           _collateral._amount  // Remove this line of code
+          _amount // Use _amount instead of _collateral._amount
        );
    }
    ...
}

```

## 05

medium

# Loss of Excess ETH Sent to FootiumAcademy's mintPlayers() Function

## Summary

If users sending more ETH than required to the mintPlayers() function will not receive their excess ETH back. Instead, the excess ETH remains in the contract's balance. result in users losing their ETH unintentionally.

## Vulnerability Detail

In the FootiumAcademy#mintPlayers() function, the contract checks if the sent ETH (msg.value) is greater than or equal to the required total fee (totalFee). However, it does not handle the case where the user sends more ETH than the required total fee. The excess ETH is stored in the contract's balance and can be withdrawn by the contract owner using the withdraw() function.

## Impact

Users who accidentally send more ETH than the required total fee might lose their excess ETH. which result loss of excess eth amount for user.

## Code Snippet

https://github.com/sherlock-audit/2023-04-footium/blob/main/footium-eth-shareable/contracts/FootiumAcademy.sol#L166-L205


## Tool used

Manual Review

## Recommendation

To mitigate this , add a code that returns the excess ETH to the sender after forwarding the required totalFee to the _prizeDistributorAddress. Here's an example of how to do this:

```solidity
// forward total fee to the prize distributor contract
(bool sent, ) = _prizeDistributorAddress.call{value: totalFee}("");
if (!sent) {
    revert FailedToSendETH(totalFee);
}

// Return remaining ETH to the sender
uint256 remainingEth = msg.value - totalFee;
if (remainingEth > 0) {
    (bool returned, ) = payable(msg.sender).call{value: remainingEth}("");
    if (!returned) {
        revert FailedToSendETH(remainingEth);
    }
}
```
## 06
high

# Reentrancy Vulnerability in WalletImpl.sol#execCalls Function

## Summary
The execCalls function allows the contract owner to execute arbitrary calls without any re-entrancy guard. This lack of protection makes the contract vulnerable to re-entrancy attacks, potentially causing unexpected behavior or loss of funds.

## Vulnerability Detail
The execCalls function iterates through an array of calls and executes them one by one. Since it doesn't employ any re-entrancy protection, a malicious actor could exploit this vulnerability by calling back into the execCalls function before the current call execution finishes. This could lead to undesirable side effects, such as draining the contract's balance or manipulating its state.

## Impact
A successful re-entrancy attack could lead to the loss of funds, unauthorized state changes, or other unintended consequences

## Code Snippet
https://github.com/0xSplits/splits-utils/blob/0dd263bf6feb0bd26b054da3cf1bb742d0bfb13e/src/WalletImpl.sol#L43-L65

## Tool used

Manual Review

## Recommendation
To mitigate the re-entrancy vulnerability, implement the provided nonReentrantGuard modifier and use it in the execCalls function. The modifier ensures that the function cannot be called recursively by setting the _notEntered flag before and after the function execution. Here's the implementation of the recommended nonReentrantGuard modifier:

```solidity
bool private _notEntered;

modifier nonReentrantGuard() {
    require(!_notEntered, "ReentrancyGuard: reentrant call");
    _notEntered = true;
    _;
    _notEntered = false;
}
```
To apply the nonReentrantGuard modifier, simply add it to the execCalls function:

```solidity
function execCalls(Call[] calldata calls_)
    external
    payable
    onlyOwner
    nonReentrantGuard // Add this modifier
    returns (uint256 blockNumber, bytes[] memory returnData)
{
    // Function implementation
}
```
## 07
igh

# QueueItem added to rolloverQueue list after attacker add QueueItem can be repeatedly replaced by attacker

---
name: 001-H
about: ""
title: `QueueItem` added to `rolloverQueue` list after attacker add `QueueItem` can be repeatedly replaced by attacker
labels: High
assignees: ""
---

## Summary
The `enlistInRollover` function in the code contains an error that causes the `ownerToRollOverQueueIndex` mapping to be updated incorrectly. The error occurs because the code for updating the mapping is placed outside of an `else` loop, which results in the mapping being updated even when the `if` statement is run. This can lead to the mapping being updated to the wrong list index when a user has already queued up a rollover and runs `enlistInRollover` again.

## Vulnerability Detail
```solidity
function enlistInRollover(
    uint256 _epochId,
    uint256 _assets,
    address _receiver
) public epochIdExists(_epochId) minRequiredDeposit(_assets) {
    // check if sender is approved by owner
    if (
        msg.sender != _receiver &&
        isApprovedForAll(_receiver, msg.sender) == false
    ) revert OwnerDidNotAuthorize(msg.sender, _receiver);
    // check if user has enough balance
    if (balanceOf(_receiver, _epochId) < _assets)
        revert InsufficientBalance();

    // check if user has already queued up a rollover
    if (ownerToRollOverQueueIndex[_receiver] != 0) {
        // if so, update the queue
        uint256 index = getRolloverIndex(_receiver);
        rolloverQueue[index].assets = _assets;
        rolloverQueue[index].epochId = _epochId;
    } else {
        // if not, add to queue
        rolloverQueue.push(
            QueueItem({
                assets: _assets,
                receiver: _receiver,
                epochId: _epochId
            })
        );
    }
    ownerToRollOverQueueIndex[_receiver] = rolloverQueue.length;

    emit RolloverQueued(_receiver, _assets, _epochId);
}
```
(1) Let Attacker run `enlistInRollover` function first time `ownerToRollOverQueueIndex[attacker] == 0` else statement run and it will push `QueueItem` to `rolloverQueue` list and update `ownerToRollOverQueueIndex[attacker] = rolloverQueue.length;`,
assume rolloverQueue.length = 5;

(2) Now normal user come and run `enlistInRollover` function which push it's `QueueItem` to `rolloverQueue`. because user push QueueItem so `rolloverQueue.length = 6` and it will update `ownerToRollOverQueueIndex[user] = 6`.

(3) Attacker run `enlistInRollover` function one more time because attacker has already queued up a rollover now this time if statement run. and because code(#L268): `ownerToRollOverQueueIndex[_receiver] = rolloverQueue.length;` is outside if and else loop #L268 line of code will executed and it will update `ownerToRollOverQueueIndex[attacker]=6` last element of list which is already assign to user who queued up a rollover previously. 

(4) now Attacker run `delistInRollover` function, in line #L286 code: `index = getRolloverIndex(attacker);` point to last user QueueItem  instead of attacker `QueueItem` and it will pop previous user `QueueItem`. also delete `ownerToRollOverQueueIndex[attacker]` 


```solidity
uint256 index = getRolloverIndex(_owner);
uint256 length = rolloverQueue.length;
if (index == length - 1) {
    // if only one item in queue
    rolloverQueue.pop();
    delete ownerToRollOverQueueIndex[_owner];
}
```

(5) attacker again run `enlistInRollover` because `delistRollover` function delete `ownerToRollOverQueueIndex[attacker]` now this time attacker can add `QueueItem` one more time.

(6) if any user add there `QueueItem` again attacker will follow 3, 4, 5 step again and replace user `QueueItem` with his `QueueItem`,and submit multiple `QueueItem` in `rolloverQueue` list.
## Impact

the attacker can repeatedly add their own `QueueItem` to the list and replace other users' `QueueItems`, and causing unexpected behavior in the contract.
## Code Snippet

Added in Vulnerability Detail
https://github.com/sherlock-audit/2023-03-Y2K/blob/main/Earthquake/src/v2/Carousel/Carousel.sol#L238-L271


## Tool used

Manual Review

## Recommendation

#L268 line of code `ownerToRollOverQueueIndex[_receiver] = rolloverQueue.length;` move inside the else loop.
Updated code:

```solidity
function enlistInRollover(
    uint256 _epochId,
    uint256 _assets,
    address _receiver
) public epochIdExists(_epochId) minRequiredDeposit(_assets) {
    // check if sender is approved by owner
    if (
        msg.sender != _receiver &&
        isApprovedForAll(_receiver, msg.sender) == false
    ) revert OwnerDidNotAuthorize(msg.sender, _receiver);
    // check if user has enough balance
    if (balanceOf(_receiver, _epochId) < _assets)
        revert InsufficientBalance();

    // check if user has already queued up a rollover
    if (ownerToRollOverQueueIndex[_receiver] != 0) {
        // if so, update the queue
        uint256 index = getRolloverIndex(_receiver);
        rolloverQueue[index].assets = _assets;
        rolloverQueue[index].epochId = _epochId;
    } else {
        // if not, add to queue
        rolloverQueue.push(
            QueueItem({
                assets: _assets,
                receiver: _receiver,
                epochId: _epochId
            })
        );
        ownerToRollOverQueueIndex[_receiver] = rolloverQueue.length;
    }
    

    emit RolloverQueued(_receiver, _assets, _epochId);
}
```
## 08
medium

# Chainlink Oracle priceFeed Data May Return Stale Prices

## Summary

The StableOracleWBTC, StableOracleWETH, and StableOracleDAI contract does not sufficiently validate the Chainlink oracle data feed for stale prices. If stale prices are used, it could lead to inaccuracies in calculations depending on the price.

## Vulnerability Detail

In the StableOracle contract, the getPriceUSD function retrieves the price of Token in USD using Chainlink's latestRoundData function, without validating the freshness of the returned price. It simply takes the price from the returned data, ignoring other returned parameters such as roundId and answeredInRound. According to Chainlink's documentation, comparing answeredInRound against the current roundId can help determine whether the returned answer is fresh or not. also it not check price > 0.

```solidity
    function getPriceUSD() external view override returns (uint256) {
        //(uint80 roundID, int256 price, uint256 startedAt, uint256 timeStamp, uint80 answeredInRound) = priceFeed.latestRoundData();
        (, int256 price, , , ) = priceFeed.latestRoundData();
        // chainlink price data is 8 decimals for WETH/USD
        return uint256(price) * 1e10;
    }
```

## Impact

The failure to validate the freshness of the price may result in the usage of stale prices, leading to incorrect calculations where price matters.

## Code Snippet

https://github.com/sherlock-audit/2023-05-USSD/blob/main/ussd-contracts/contracts/oracles/StableOracleDAI.sol#L48
https://github.com/sherlock-audit/2023-05-USSD/blob/main/ussd-contracts/contracts/oracles/StableOracleWETH.sol#L23
https://github.com/sherlock-audit/2023-05-USSD/blob/main/ussd-contracts/contracts/oracles/StableOracleWBTC.sol#L23


## Tool used

Manual Review

## Recommendation

please verify whether the price is fresh or stale.

## 09
medium

# Arbitrum Sequencer Down Check Missing in chainlinkAdaptor#getMarkPrice

## Summary

The lack of checks to determine if the Arbitrum L2 sequencer is down. to ensure that the sequencer is live before trusting the data returned by the oracle. This check is not implemented in chainlinkAdaptor#getMarkPrice

## Vulnerability Detail

If the Arbitrum Sequencer goes down, the oracle data will not be kept up-to-date and could become stale. However, users can still continue to interact with the protocol directly. You can review Chainlink's documentation on [L2 Sequencer Uptime Feeds](https://docs.chain.link/docs/data-feeds/l2-sequencer-feeds/) for more details on this.

As a result, users may be able to use the protocol while oracle feeds are stale. This could cause many problems, but as a simple example:

- Alice has an open long position with some leverage.
- The Arbitrum sequencer goes down temporarily.
- While it's down, the price of the token falls to a point where Alice's position does not have enough margin to save it from liquidation.
- Because of the stale price, the protocol does not allow Alice's position to be liquidated, and
- Alice takes advantage of this situation and closes the position without being liquidated.

chainlinkAdaptor#getMarkPrice does not check whether the Arbitrum L2 sequencer is down. As a result, the prices provided might be falsely perceived as fresh, even when the sequencer is down.

```solidity
function getMarkPrice() external view returns (uint256 price) {
    int256 rawPrice;
    uint256 updatedAt;
    (, rawPrice, , updatedAt, ) = IChainlink(chainlink).latestRoundData();
    (, int256 USDCPrice,, uint256 USDCUpdatedAt,) = IChainlink(USDCSource).latestRoundData();
    require(
        block.timestamp - updatedAt <= heartbeatInterval,
        "ORACLE_HEARTBEAT_FAILED"
    );
    require(block.timestamp - USDCUpdatedAt <= heartbeatInterval, "USDC_ORACLE_HEARTBEAT_FAILED");
    uint256 tokenPrice = (SafeCast.toUint256(rawPrice) * 1e8) / SafeCast.toUint256(USDCPrice);
    return tokenPrice * 1e18 / decimalsCorrection;
}
```

## Impact

The impact of this vulnerability is potentially severe, as users could falsely liquidated or book incorrect profit/loss. 

## Code Snippet

https://github.com/sherlock-audit/2023-04-jojo/blob/main/smart-contract-EVM/contracts/adaptor/chainlinkAdaptor.sol#L43-L56

## Tool used

Manual Review

## Recommendation

Implement a check to determine whether the sequencer is down.
It is recommended to follow the code example provided by Chainlinkand re-write getMarkPrice:
https://docs.chain.link/data-feeds/l2-sequencer-feeds#example-code

## 10
high

# Potential Sandwich Attack Due to Minimum Output Amount Set to Zero

## Summary

The function USSD#UniV3SwapInput is susceptible to sandwich attacks due to its minimum output amount (amountOutMinimum) being set to zero. This configuration could potentially enable attackers to manipulate transaction order, thereby sandwiching a user's trades between their own. Consequently, this could result in a total loss of funds for the user.

## Vulnerability Detail

In the UniV3SwapInput function, an ExactInputParams structure is accepted, wherein the amountOutMinimum is hardcoded to 0. This scenario is problematic as it eliminates a lower bound for the trade output, thereby paving the way for possible sandwich attacks. This vulnerability could be exploited by a malicious entity due to the lack of minimum output enforcement.

A sandwich attack occurs when an attacker identifies a transaction in the mempool and creates a higher gas-price transaction to precede it. This action artificially inflates the token's price. Subsequently, the attacker initiates another transaction to sell the token immediately after the victim's transaction is confirmed, thereby benefiting from the artificially elevated price at the victim's expense.

## Impact

Users are at risk of losing 100% of their funds should a successful sandwich attack occur.

## Code Snippet

https://github.com/sherlock-audit/2023-05-USSD/blob/main/ussd-contracts/contracts/USSD.sol#L227-L240

## Tool used

Manual Review

## Recommendation

It's recommended to not hardcode the amountOutMinimum to 0 in the UniV3SwapInput function. Instead, users or the contract itself should specify a minimum output amount that is acceptable for the trade.


