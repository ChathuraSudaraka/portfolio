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

          {/* Contact me button for larger devices */}
          <div className="lg:block hidden">
            <a
              href="tel:+94705321516"
              className="relative inline-flex items-center justify-center p-4 px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-lg shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                Contact Me
              </span>
              <span className="relative invisible">Contact Me</span>
            </a>
          </div>

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
