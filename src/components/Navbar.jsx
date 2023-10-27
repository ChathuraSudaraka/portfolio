/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import logo from "/assets/logo.webp";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-scroll";

const Navbar = () => {
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

          {/* htmlFor larger device */}
          <div className="lg:flex items-center gap-3 hidden text-body">
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={-100}
              to="home"
              className="block text-primary hover:text-gray-400 py-2 px-4 cursor-pointer"
            >
              Home
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={10}
              to="skills"
              className="block dark:text-white dark:hover:text-primary hover:text-gray-400 py-2 px-4 cursor-pointer"
            >
              Skills
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={-50}
              to="about"
              className="block dark:text-white dark:hover:text-primary hover:text-gray-400 py-2 px-4 cursor-pointer"
            >
              About me
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={10}
              to="experience"
              className="block dark:text-white dark:hover:text-primary hover:text-gray-400 py-2 px-4 cursor-pointer"
            >
              Experience
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={10}
              to="education"
              className="block dark:text-white dark:hover:text-primary hover:text-gray-400 py-2 px-4 cursor-pointer"
            >
              Education
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={10}
              to="portfolio"
              className="block dark:text-white dark:hover:text-primary hover:text-gray-400 py-2 px-4 cursor-pointer"
            >
              Portfolio
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={10}
              to="blog"
              className="block dark:text-white dark:hover:text-primary hover:text-gray-400 py-2 px-4 cursor-pointer"
            >
              Blogs
            </Link>
          </div>

          {/* contact me btn */}
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

          {/* btn htmlFor small devices */}
          <button
            onClick={toggleMenu}
            className="lg:hidden dark:text-white text-body text-3xl"
          >
            <HiMenu />
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="mt-4 bg-body p-4 rounded-lg text-white">
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={-100}
              to="home"
              className="block hover:text-gray-400 py-2"
            >
              Home
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={-100}
              to="skills"
              className="block hover:text-gray-400 py-2"
            >
              Skills
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={-100}
              to="about"
              className="block hover:text-gray-400 py-2"
            >
              About me
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={-100}
              to="experience"
              className="block hover:text-gray-400 py-2"
            >
              Experience
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={-100}
              to="education"
              className="block hover:text-gray-400 py-2"
            >
              Education
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={-100}
              to="portfolio"
              className="block hover:text-gray-400 py-2"
            >
              Portfolio
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={-100}
              to="blog"
              className="block hover:text-gray-400 py-2"
            >
              Blogs
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
