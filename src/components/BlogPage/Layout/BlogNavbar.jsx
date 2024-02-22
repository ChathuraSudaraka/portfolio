import React, { useState, useRef, Fragment } from "react";
import logo from "/assets/logo.webp";
import { Link as ScrollLink } from "react-scroll";

import { Dialog, Transition } from "@headlessui/react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { cn } from "../../utils/cn";
import { IconSearch } from "@tabler/icons-react";

const BlogNavbar = () => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - (scrollYProgress.getPrevious() || 0);

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  // Function to open the modal when the search icon is clicked
  const openModal = () => {
    setOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setOpen(false);
  };

  const navItems = [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-5 pl-5 py-2 items-center justify-center text-center w-full" // Added w-full to take up the full width
        )}
      >
        <div className="text-white font-bold text-lg cursor-pointer">
          <img src={logo} alt="logo" className="h-8 mr-32" />
        </div>
        {navItems.map((navItem, id) => (
          <ScrollLink
            key={`link-${id}`}
            activeClass="active"
            to={navItem.to}
            spy={true}
            smooth={true}
            offset={navItem.offset}
            className={cn(
              "relative dark:text-neutral-50 items-center p-3 flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 cursor-pointer"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.text}</span>
          </ScrollLink>
        ))}
        <button type="button" onClick={openModal}>
          <IconSearch className="h-4 w-4 text-neutral-500 dark:text-white" />
        </button>

        {/* Modal Start */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10"
            initialFocus={cancelButtonRef}
            onClose={closeModal}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 flex items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative border border-gray-200 dark:border-border-color dark:bg-blog-component-bg bg-white rounded-lg w-full max-w-md p-4">
                  <div className="text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium dark:text-white text-gray-900"
                    >
                      Search
                    </Dialog.Title>
                  </div>
                  <div className="mt-4">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <svg
                          className="fill-current text-gray-500 w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            className="heroicon-ui"
                            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                          />
                        </svg>
                      </span>
                      <input
                        type="text"
                        className="block w-full pl-10 py-2 pr-3  dark:bg-slate-600 text-gray-900 placeholder-gray-900 focus:outline-none focus:ring focus:ring-blue-400 border dark:border-none rounded-md"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    {/* Search results */}
                    <div className="bg-white dark:bg-slate-600 rounded-md border dark:border-none border-gray-300 shadow">
                      <div className="p-2">
                        <div className="flex items-center cursor-pointer dark:hover:bg-gray-700 hover:bg-blue-100 p-2 rounded-md my-2">
                          <div className="bg-gray-400 w-2 h-2 rounded-full m-2"></div>
                          <div className="flex-grow font-medium">
                            React Native
                          </div>
                          <div className="text-sm font-normal dark:text-gray-900 text-gray-500">
                            Blog
                          </div>
                        </div>
                        <div className="flex items-center cursor-pointer dark:hover:bg-gray-700 hover:bg-blue-100 p-2 rounded-md my-2">
                          <div className="bg-green-400 w-2 h-2 rounded-full m-2"></div>
                          <div className="flex-grow font-medium">
                            Bootstrap 5
                          </div>
                          <div className="text-sm font-normal dark:text-gray-900 text-gray-500">
                            Article
                          </div>
                        </div>
                        <div className="flex items-center cursor-pointer dark:hover:bg-gray-700 hover:bg-blue-100 p-2 rounded-md my-2">
                          <div className="bg-gray-400 w-2 h-2 rounded-full m-2"></div>
                          <div className="flex-grow font-medium">
                            Tailwind CSS
                          </div>
                          <div className="text-sm font-normal dark:text-gray-900 text-gray-500">
                            Article
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="px-3 py-2 text-sm font-medium dark:text-white text-gray-900 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-md"
                      onClick={closeModal}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        {/* Modal End */}
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogNavbar;

// export const Modal = ({ closeModal, open }) => {
//   const cancelButtonRef = useRef(null);

//   return (
//     /* Modal */

//   );
// };
