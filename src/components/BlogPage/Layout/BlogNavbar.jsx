import React, { useState, useRef, Fragment } from "react";
import logo from "/assets/logo.webp";
import { Link } from "react-scroll";
import { Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "../../Portfolio/hooks/CustomTag";

const buttons = [];

const BlogNavbar = () => {
  const [open, setOpen] = useState(false); // Initialize the modal as closed

  const cancelButtonRef = useRef(null);

  // Function to open the modal when the search icon is clicked
  const openModal = () => {
    setOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 lg:top-2 lg:left-10 lg:right-10 w-full lg:w-auto">
      <nav className="py-4 md:px-12 px-4 lg:rounded-lg bg-blue-700 backdrop-filter backdrop-sepia-0 bg-opacity-10 backdrop-blur-2xl backdrop-brightness-100 backdrop-contrast-100 backdrop-grayscale-0 backdrop-hue-rotate-0 backdrop-invert-0 backdrop-opacity-100 backdrop-saturate-100 lg:backdrop-filter lg:backdrop-blur-lg lg:backdrop-contrast-125 lg:backdrop-grayscale-0 lg:backdrop-hue-rotate-0 lg:backdrop-invert-0 lg:backdrop-opacity-100 lg:backdrop-saturate-100 lg:backdrop-sepia-0 lg:bg-opacity-10 lg:backdrop-brightness-100 lg:backdrop-sepia-">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-lg cursor-pointer">
            <img src={logo} alt="" className="h-10" />
          </div>

          <div className="lg:flex items-center gap-3 hidden text-body">
            {buttons.map((button, index) => (
              <Link
                key={index}
                activeClass="active"
                smooth={true}
                spy={true}
                offset={button.offset}
                to={button.to}
                className="block dark:text-white dark:hover:text-primary hover-text-gray-400 py-2 px-4 cursor-pointer"
              >
                {button.text}
              </Link>
            ))}
          </div>

          <div className="dark:bg-blog-component-bg bg-primary border-border-color dark:border rounded-xl h-10 w-10 flex items-center justify-center">
            <button type="button" onClick={openModal}>
              <SearchIcon />
            </button>
          </div>

          {/* Modal */}
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
          {/* End of Modal */}
        </div>
      </nav>
    </header>
  );
};

export default BlogNavbar;
