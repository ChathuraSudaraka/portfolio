/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import logo from "/assets/logo.svg";
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
        className={`py-4 md:px-12 px-4 lg:rounded-lg bg-blue-500 bg-opacity-60 ${isSticky ? "sticky top-0 right-0 left-0 " : ""}`}
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
              offset={-100}
              to="skills"
              className="block hover:text-gray-400 py-2 px-4 cursor-pointer"
            >
              Skills
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={-100}
              to="about"
              className="block  hover:text-gray-400 py-2 px-4 cursor-pointer"
            >
              About me
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={-100}
              to="experience"
              className="block  hover:text-gray-400 py-2 px-4 cursor-pointer"
            >
              Experience
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={-100}
              to="education"
              className="block  hover:text-gray-400 py-2 px-4 cursor-pointer"
            >
              Education
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={-100}
              to="portfolio"
              className="block  hover:text-gray-400 py-2 px-4 cursor-pointer"
            >
              Portfolio
            </Link>
            <Link
              activeClass="active"
              smooth={true}
              spy={true}
              offset={-100}
              to="testimonials"
              className="block  hover:text-gray-400 py-2 px-4 cursor-pointer"
            >
              Testimonials
            </Link>
          </div>

          {/* contact me btn */}
          <div className="lg:block hidden">
            <button className="px-4 py-2 bg-transparent border border-primary text-primary rounded hover:bg-primary hover:text-white transition-all duration-300">
              Contact Me
            </button>
          </div>

          {/* btn htmlFor small devices */}
          <button onClick={toggleMenu} className="lg:hidden text-body text-3xl">
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
              to="testimonials"
              className="block hover:text-gray-400 py-2"
            >
              Testimonials
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
