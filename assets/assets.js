import user_image from "./user-image.png";
import code_icon from "./code-icon.png";
import code_icon_dark from "./code-icon-dark.png";
import edu_icon from "./edu-icon.png";
import edu_icon_dark from "./edu-icon-dark.png";
import project_icon from "./project-icon.png";
import project_icon_dark from "./project-icon-dark.png";
import vscode from "./vscode.png";
import firebase from "./firebase.png";
import figma from "./figma.png";
import git from "./git.png";
import mongodb from "./mongodb.png";
import right_arrow_white from "./right-arrow-white.png";
import logo from "./logo.png";
import logo_dark from "./logo_dark.png";
import mail_icon from "./mail_icon.png";
import mail_icon_dark from "./mail_icon_dark.png";
import profile_img from "./profile-img.png";
import download_icon from "./download-icon.png";
import hand_icon from "./hand-icon.png";
import header_bg_color from "./header-bg-color.png";
import moon_icon from "./moon_icon.png";
import sun_icon from "./sun_icon.png";
import arrow_icon from "./arrow-icon.png";
import arrow_icon_dark from "./arrow-icon-dark.png";
import menu_black from "./menu-black.png";
import menu_white from "./menu-white.png";
import close_black from "./close-black.png";
import close_white from "./close-white.png";
import web_icon from "./web-icon.png";
import mobile_icon from "./mobile-icon.png";
import ui_icon from "./ui-icon.png";
import graphics_icon from "./graphics-icon.png";
import right_arrow from "./right-arrow.png";
import send_icon from "./send-icon.png";
import right_arrow_bold from "./right-arrow-bold.png";
import right_arrow_bold_dark from "./right-arrow-bold-dark.png";
import python from "./python.png";
import solidity from "./solidity.png";
import chainlink from "./chainlink.png";
import css from "./css.png";
import ganache from "./ganache.png";
import hardhat from "./hardhat.png";
import javascript from "./javascript.png";
import nextjs from "./nextjs.png";
import nodejs from "./nodejs.png";
import npm from "./npm.png";
import react from "./react.png";
import typescript from "./typescript.png";
import thegraph from "./thegraph.png";
import vue from "./vue.png";

export const assets = {
  user_image,
  code_icon,
  code_icon_dark,
  edu_icon,
  edu_icon_dark,
  project_icon,
  project_icon_dark,
  vscode,
  firebase,
  figma,
  git,
  mongodb,
  right_arrow_white,
  logo,
  logo_dark,
  mail_icon,
  mail_icon_dark,
  profile_img,
  download_icon,
  hand_icon,
  header_bg_color,
  moon_icon,
  sun_icon,
  arrow_icon,
  arrow_icon_dark,
  menu_black,
  menu_white,
  close_black,
  close_white,
  web_icon,
  mobile_icon,
  ui_icon,
  graphics_icon,
  right_arrow,
  send_icon,
  right_arrow_bold,
  right_arrow_bold_dark,
  python,
  solidity,
  chainlink,
  css,
  ganache,
  hardhat,
  javascript,
  nextjs,
  nodejs,
  npm,
  react,
  typescript,
  thegraph,
  vue,
};

export const workData = [
  {
    title: "AuditFinder.xyz",
    description: "Instant-Search audits reports",
    bgImage: "/work-1.png",
    content: (
      <div className="space-y-6 ml-5">
        <div>
          <strong className="block text-xl font-semibold">Link</strong>
          <a
            href="https://AuditFinder.xyz"
            className="text-blue-600 hover:text-blue-800"
            target="_blank"
          >
            AuditFinder.xyz
          </a>
        </div>

        <div>
          <strong className="block text-xl font-semibold">Tools Used</strong>
          <p>
            Next.js, Tailwind CSS, Docker, Python, JavaScript, Advanced Search
            Features
          </p>
        </div>

        <div>
          <strong className="block text-xl font-semibold">Description</strong>
          <p>
            AuditFinder.xyz is a one of the fastest audit report search platform
            it Instantly search as you type, filter, group and view over 20000+
            smart contract audit reports. it also support typo tolerate search
            and provides a user-friendly interface for search past audit reports
            very fast and easy. With its powerful instant search feature, users
            can quickly find the exact reports they need, saving time and
            enhancing productivity.
          </p>
          <br />

          <ul className="list-disc pl-5 mt-2">
            <li>
              <strong>Instant Search</strong>: Allows users to receive immediate
              search results as they type, enhancing the efficiency of finding
              relevant audit reports.
            </li>
            <li>
              <strong>Typo-Tolerance</strong>: Accommodates search inaccuracies,
              ensuring that users can still locate the correct reports even with
              input errors.
            </li>
            <li>
              <strong>User-Friendly Interface</strong>: The interface is
              optimized for ease of use, enabling both novice and experienced
              users to navigate and operate the platform effectively.
            </li>
            <li>
              <strong>Powerful Filtering and Grouping</strong>: Users can refine
              and categorize search results based on specific parameters, making
              it easier to find the most relevant audit information.
            </li>
          </ul>
          <br />

          <p>
            Built with robust technologies such as Next.js for frontend
            development, Tailwind CSS for design, Docker for containerization,
            Python for backend operations, and JavaScript for interactive
            elements, AuditFinder.xyz offers a reliable and efficient tool for
            professionals and enthusiasts in the blockchain space to enhance
            their productivity and decision-making.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "OptiPair",
    description: "3rd Price 🏆 winner, EthGlobal Bangkok",
    bgImage: "/work-2.png",
    content: (
      <div className="space-y-6 ml-5">
        <div>
          <div className="text-lg">LINK</div>{" "}
          <a
            href="https://ethglobal.com/showcase/optipair-x2hsa"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            ethglobal.com/showcase/optipair-x2hsa
          </a>
          <p>(EthGlobal, Bangkok)</p>
          <p>
            Winner of: Flare Network - Best Usecase of Flare's enshrined Data
            Protocols 3rd place
          </p>
        </div>
        <div className="text-sm">
          {" "}
          <br />
          <div className="text-lg">TOOL USED</div>
          Solidity, Nextjs, Tailwindcss, Javascript, flare-network, web3auth
        </div>
        <br />
        <div className="text-lg">DESCRIPTION</div>{" "}
        <p>
          OptiPair enhances liquidity concentration within the options chain on
          decentralized exchanges (DEXs) through innovative market maker price
          discovery methods. The platform addresses the persistent issue of
          liquidity fragmentation across numerous strike prices in options
          trading. By employing a linear algorithm, OptiPair calculates the
          value of various strike options based on the liquidity of just two
          select strike positions, significantly improving user experience and
          efficiency.
        </p>
        <br />
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The
          system utilizes the Flare Network for real-time, decentralized data
          feeds, critical for accurate pricing and timely settlements. Web3Auth
          is integrated to streamline user login and manage positions securely.
          OptiPair's backbone is constructed on the Ethereum blockchain,
          featuring smart contracts meticulously coded in Solidity, while the
          front end is developed using React to ensure a seamless and
          interactive interface. This combination of advanced technologies
          ensures that OptiPair is not only robust and secure but also
          user-friendly and responsive to market needs.
        </p>
      </div>
    ),
  },
  {
    title: "Munjo",
    description: "EthGlobal Singapore",
    bgImage: "/work-3.png",
    content: (
      <div className="space-y-6 ml-5">
        <div>
          <div className="text-lg">LINK</div>{" "}
          <a
            href="https://ethglobal.com/showcase/munjo-xhkc3"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            ethglobal.com/showcase/munjo-xhkc3
          </a>
          <p>(EthGlobal, Singapore)</p>
        </div>
        <div className="text-sm">
          {" "}
          <br />
          <div className="text-lg">TOOL USED</div>
          Safe, ERC-7579, Rhinestone, Pimlico, The Graph, Next.js, GraphQL
          Solidity, Nextjs, Tailwindcss, Javascript,
        </div>
        <br />
        <div className="text-lg">DESCRIPTION</div>{" "}
        <p>
          Munjo presents a decentralized application (DApp) tailored for
          efficient treasury management of DAOs. It harnesses the capabilities
          of ERC-7579 to facilitate advanced treasury functionalities such as
          gasless transactions and scheduled transfers. This DApp leverages a
          smart modular account framework, enhancing DAOs' financial operations
          with robust, automated solutions.
        </p>
        <br />
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Gasless Transactions</strong>: Utilizes Pimlico to allow
            users to conduct transactions without incurring gas fees, fostering
            greater accessibility and efficiency.
          </li>
          <li>
            <strong>Scheduled Transactions</strong>: Employs the Rhinestone
            ERC-7579 module, enabling users to set up transactions to be
            executed at predetermined times, enhancing planning and financial
            management.
          </li>
          <li>
            <strong>Token Swaps</strong>: Supports direct token swaps via smart
            accounts, streamlining trading operations within the DAO's
            ecosystem.
          </li>
          <li>
            <strong>Efficient Data Querying</strong>: Integrates The Graph for
            decentralized and efficient retrieval of blockchain data, ensuring
            up-to-date and accurate financial tracking.
          </li>
          <li>
            <strong>Modular Architecture</strong>: Developed using Next.js, this
            architecture facilitates seamless integration of various blockchain
            technologies, offering a cohesive and user-friendly experience.
          </li>
        </ul>
        <br />
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The
          Munjo leverages Safe for secure management of treasury operations and
          GraphQL in conjunction with The Graph for sophisticated data querying
          capabilities. This blend of technologies not only ensures security and
          compliance with emerging standards but also optimizes transaction
          processing and gas management, setting a new standard in DAO treasury
          management.
        </p>
      </div>
    ),
  },
  {
    title: "Auditing",
    description: "Smart contract auditing",
    bgImage: "/work-4.png",
    content: true,
  },
  {
    title: "Asanjo_io",
    description: "Hackathon: Build the New Internet",
    bgImage: "/work-5.png",
    content: (
      <div className="ml-5 space-y-6">
        <div>
          <div>
            <strong className="block text-xl font-semibold">Link</strong>
            <a
              href="https://devfolio.co/projects/asanjoio-af00"
              className="text-blue-600 hover:text-blue-800"
            >
              devfolio.co/projects/asanjoio-af00
            </a>
            <p>(Devfolio Online Hackathon)</p>
          </div>
          <br />
          <div>
            <strong className="block text-xl font-semibold">Tools Used</strong>
            <p>
              ERC-4337 & ERC-7579, Smart Accounts, Pimlico, Rhinestone, Safe,
              Next.js
            </p>
          </div>
          <br />

          <div className="mb-6">
            <strong className="block text-xl font-semibold">Description</strong>
            <p>
              Asanjo_io is a comprehensive DeFi trading tool designed to cater
              to the advanced needs of decentralized finance traders. It
              leverages state-of-the-art blockchain technologies, including
              ERC-4337 and ERC-7579, to enable a suite of powerful features such
              as gasless transactions, scheduled transactions, and smart trading
              functionalities like limit orders, stop loss, and take profit
              orders. Built using the robust Next.js framework, Asanjo_io
              integrates smart accounts to streamline the trading process,
              providing a seamless and efficient user experience.
            </p>
          </div>

          <div className="mb-6">
            <strong className="block text-xl font-semibold">Features</strong>
            <ul className="list-disc pl-8 space-y-2">
              <li>
                <strong>Gasless Transactions</strong>: Utilize Pimlico to
                perform transactions without incurring gas fees, optimizing
                cost-efficiency for users.
              </li>
              <li>
                <strong>Scheduled Transactions</strong>: Employ the Rhinestone
                ERC-7579 module, allowing users to plan and execute transactions
                at future dates.
              </li>
              <li>
                <strong>Swaps</strong>: Facilitate token swaps directly through
                smart accounts for enhanced trading flexibility.
              </li>
              <li>
                <strong>Limit Orders</strong>: Execute trades only when assets
                reach a specified price, ensuring traders get the prices they
                want.
              </li>
              <li>
                <strong>Stop Loss Orders</strong>: Automatically execute sell
                orders at preset prices to minimize potential losses during
                market downturns.
              </li>
              <li>
                <strong>Take Profit Orders</strong>: Enable automatic selling
                when assets reach targeted profit levels to secure gains.
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Arbitrage",
    description: "Crosschain Arbitrage strategy",
    bgImage: "/work-6.png",
    content: (
      <div className="ml-5 space-y-6">
        <div>
          <div>
            <strong className="block text-xl font-semibold">Tools Used</strong>
            <p>
              Python, web3.py, odos-swap api, kyberswap-api, axelar for bridge,
              alchemy api
            </p>
          </div>
          <br />

          <div className="mb-6">
            <strong className="block text-xl font-semibold">Description</strong>
            <p>
              Arbitrage trading bot, sophisticated blockchain interaction tool
              designed to automate and optimize profitable arbitrage trading
              strategies over multiple blockchain platforms.
            </p>
          </div>

          <div>
            <section className="mb-8">
              <h3 className="text-xl font-semibold">Key Components</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>CryptoBot Class</strong>: Manages interactions with a
                  Telegram bot.
                </li>
                <li>
                  <strong>Trading Functions</strong>: Executes trades and
                  fetches trade quotes.
                </li>
                <li>
                  <strong>Arbitrage Detection</strong>: Detects price
                  differences between tokens.
                </li>
                <li>
                  <strong>Smart Contract Interaction</strong>: Uses Web3.py to
                  manage tokens and transactions.
                </li>
                <li>
                  <strong>Asynchronous Execution</strong>: Leverages Python's
                  asyncio for API calls and transaction submission.
                </li>
              </ol>
            </section>
          </div>

          <div>
            <section className="mb-8">
              <h3 className="text-xl font-semibold">Workflow</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Setup of bot with token and chat IDs for Telegram
                  communication.
                </li>
                <li>Data loading and configuration from a JSON file.</li>
                <li>
                  Arbitrage execution logic that checks and acts on
                  opportunities.
                </li>
                <li>
                  Transaction management for creation, signing, and execution.
                </li>
                <li>
                  Notification system utilizing a Telegram bot for alerts and
                  updates.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    ),
  },
];

export const serviceData = [
  {
    icon: assets.web_icon,
    title: "Web design",
    description: "Web development is the process of building, programming...",
    link: "",
  },
  {
    icon: assets.mobile_icon,
    title: "Mobile app",
    description:
      "Mobile app development involves creating software for mobile devices...",
    link: "",
  },
  {
    icon: assets.ui_icon,
    title: "UI/UX design",
    description:
      "UI/UX design focuses on creating a seamless user experience...",
    link: "",
  },
  {
    icon: assets.graphics_icon,
    title: "Graphics design",
    description: "Creative design solutions to enhance visual communication...",
    link: "",
  },
];

export const infoList = [
  {
    icon: assets.code_icon,
    iconDark: assets.code_icon_dark,
    title: "Languages",
    description: "Solidity, JavaScript, Python, React Js, Next Js, HTML, CSS",
  },
  {
    icon: assets.edu_icon,
    iconDark: assets.edu_icon_dark,
    title: "Education",
    description: "M.Tech in Mechanical Systems Design",
  },
  {
    icon: assets.project_icon,
    iconDark: assets.project_icon_dark,
    title: "Projects",
    description: "Built more than 5 projects",
  },
];

export const toolsData = [
  assets.solidity,
  assets.javascript,
  assets.python,
  assets.typescript,
  assets.css,
  assets.nodejs,
  assets.npm,
  assets.react,
  assets.vue,
  assets.vscode,
  assets.firebase,
  assets.mongodb,
  assets.figma,
  assets.git,
  assets.chainlink,
  assets.ganache,
  assets.thegraph,
];

export const toolsData2 = [
  assets.vscode,
  assets.firebase,
  assets.mongodb,
  assets.figma,
  assets.git,
  assets.chainlink,
  assets.ganache,
  assets.thegraph,
];
