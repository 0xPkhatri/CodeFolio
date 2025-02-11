import { assets, workData } from "../../assets/assets";
import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import MarkdownPreview from "@uiw/react-markdown-preview";
const Work = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [markdownContent, setMarkdownContent] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    fetch("/Audits.md")
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text))
      .catch((error) => console.error("Error fetching markdown", error));
  }, []);

  const showMoreItems = () => {
    setVisibleCount(workData.length); // Adjust this value as needed
  };
  const openModal = (project) => {
    console.log(isOpen);
    setCurrentProject(project);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentProject(null);
  };

  const handleClickOutside = useCallback((event) => {
    if (!document.getElementById("modalContent")?.contains(event.target)) {
      closeModal();
    }
  }, []);

  // Handle the Esc key to close the modal
  const handleKeyDown = useCallback((event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  }, []);

  // Setup event listeners for clicks and keydowns
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    // Cleanup listeners on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClickOutside, handleKeyDown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="work"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mb-2 text-lg font-Ova"
      >
        My portfolio
      </motion.h4>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-center text-5xl font-Ova"
      >
        My latest work
      </motion.h2>
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo"
      >
        Welcome to my web3 development portfolio! Explore a collection of
        projects showcasing my expertise in #defi development.
      </motion.p>

      {isOpen && (
        <div className="relative z-50" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block"
            aria-hidden="true"
          ></div>
          <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
            <div className="  m-3 flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <div
                className="flex w-full sm:w-3/4 transform text-left text-base transition"
                id="modalContent"
              >
                <div className="relative flex w-full items-center overflow-hidden  bg-white rounded-lg shadow-lg sm:p-2 ring-1 ring-slate-900/10 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300 ">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="z-50 absolute  text-center right-4 top-3 text-gray-500 hover:text-gray-800 dark:hover:text-white sm:right-12 sm:top-12"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <div className="hidden sm:block">Close</div>
                  </button>

                  <div className="container mx-auto sm:p-4">
                    <div className="p-2 border border-slate-700 dark:border-black rounded-lg sm:p-4">
                      <div className="flex flex-col ">
                        {/* uppen section */}
                        <div className="border border-black flex-1">
                          <div className="flex flex-col break-all  sm:space-x-6 sm:p-6  ">
                            <div className=" overflow-visible">
                              <article className="text-3xl sm:text-5xl flex items-start m-6 sm:mt-0 p-2 sm:space-x-6 sm:p-6">
                                {currentProject.title}
                              </article>
                            </div>
                          </div>
                        </div>
                        {/* hero section */}
                        <div className=" border-b-2 border-black"></div>

                        <div className="flex-1">
                          <div className="flex flex-col mt-3 sm:mt-0 sm:space-x-6 sm:p-6 ">
                            <div>
                              {currentProject.content === true ? (
                                <div>
                                  <MarkdownPreview
                                    source={markdownContent}
                                    wrapperElement={{
                                      "data-color-mode": isDarkMode
                                        ? "dark"
                                        : "light",
                                    }}
                                    style={{
                                      padding: "16px", // Use consistent unit
                                      backgroundColor: isDarkMode
                                        ? "#1E293B"
                                        : "white", // bg-slate-800 for dark and white for light
                                    }}
                                    className={`${
                                      isDarkMode ? "bg-slate-800" : "bg-white"
                                    }`}
                                  />
                                </div>
                              ) : (
                                <div>{currentProject.content}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="grid sm:grid-cols-4 my-10 gap-5 dark:text-black"
      >
        {workData.slice(0, visibleCount).map((project, index) => (
          <div key={index}>
            <div>
              <motion.div
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.3 }}
                style={{ backgroundImage: `url(${project.bgImage})` }}
                className="aspect-square bg-no-repeat bg-contain bg-center rounded-lg relative cursor-pointer group"
                onClick={() => openModal(project)}
              >
                <div
                  className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500
            group-hover:bottom-7"
                >
                  <div className="">
                    <h2 className="font-semibold">{project.title}</h2>
                    <p className="text-sm text-gray-700">
                      {project.description}
                    </p>
                  </div>
                  <div
                    className="border rounded-full border-black w-9
              aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition"
                  >
                    <Image src={assets.send_icon} alt="" className="w-5" />
                  </div>
                </div>
                <div></div>
              </motion.div>
            </div>
            <div></div>
          </div>
        ))}
      </motion.div>
      {visibleCount < workData.length && (
        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          onClick={showMoreItems} // Handle click event to show more items
          className="w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500 dark:text-white dark:border-white dark:hover:bg-darkHover"
          style={{ cursor: "pointer" }} // Make it clickable
        >
          Show more
          <Image
            src={
              isDarkMode ? assets.right_arrow_white : assets.right_arrow_bold
            }
            alt="Right arrow"
            className="w-4"
          />
        </motion.a>
      )}
    </motion.div>
  );
};

export default Work;
