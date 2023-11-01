/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import logo from "/assets/logo.webp";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-scroll";

const buttons = [
  {
    text: "Home",
    to: "home",
    offset: -100,
  },
  {
    text: "Skills",
    to: "skills",
    offset: 10,
  },
  {
    text: "About me",
    to: "about",
    offset: -50,
  },
  {
    text: "Experience",
    to: "experience",
    offset: 10,
  },
  {
    text: "Education",
    to: "education",
    offset: 10,
  },
  {
    text: "Portfolio",
    to: "portfolio",
    offset: 10,
  },
  {
    text: "Blogs",
    to: "blog",
    offset: 10,
  },
];

const BlogNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 lg:top-2 lg:left-10 lg:right-10 w-full lg:w-auto">
      <nav
        className={`py-4 md:px-12 px-4 lg:rounded-lg bg-blue-700 backdrop-filter backdrop-sepia-0 bg-opacity-10 backdrop-blur-2xl backdrop-brightness-100 backdrop-contrast-100 backdrop-grayscale-0 backdrop-hue-rotate-0 backdrop-invert-0 backdrop-opacity-100 backdrop-saturate-100 
         lg:backdrop-filter lg:backdrop-blur-lg lg:backdrop-contrast-125 lg:backdrop-grayscale-0 lg:backdrop-hue-rotate-0 lg:backdrop-invert-0 lg:backdrop-opacity-100 lg:backdrop-saturate-100 lg:backdrop-sepia-0 lg:bg-opacity-10 lg:backdrop-brightness-100  lg:backdrop-sepia-`}
      >
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-lg cursor-pointer">
            <img src={logo} alt="" className="h-10" />
          </div>

          {/* Navigation buttons for larger devices */}
          <div className="lg:flex items-center gap-3 hidden text-body">
            {buttons.map((button, index) => (
              <Link
                key={index}
                activeClass="active"
                smooth={true}
                spy={true}
                offset={button.offset}
                to={button.to}
                className="block dark:text-white dark:hover:text-primary hover:text-gray-400 py-2 px-4 cursor-pointer"
              >
                {button.text}
              </Link>
            ))}
          </div>

          <form class="flex items-center">
            <label for="simple-search" class="sr-only">
              Search
            </label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
            </div>
            <button
              type="submit"
              class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </form>

          {/* Menu button for small devices */}
          <button
            onClick={toggleMenu}
            className="lg:hidden dark:text-white text-body text-3xl"
          >
            <HiMenu />
          </button>
        </div>

        {/* Mobile menu for small devices */}
        {isMenuOpen && (
          <div className="mt-4 bg-body p-4 rounded-lg text-white">
            {buttons.map((button, index) => (
              <Link
                key={index}
                activeClass="active"
                smooth={true}
                spy={true}
                offset={button.offset}
                to={button.to}
                className="block hover:text-gray-400 py-2"
              >
                {button.text}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default BlogNavbar;
