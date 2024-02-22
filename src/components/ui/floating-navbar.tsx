// FloatingNav.jsx
import "../../../src/App.css";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../utils/cn";
import { Link as ScrollLink } from "react-scroll";
import logo from "/assets/logo.webp";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: any[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

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
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-5 pl-5 py-2 items-center justify-center text-center w-full", // Added w-full to take up the full width
          className
        )}
      >
        <div className="text-white font-bold text-lg cursor-pointer">
          <img src={logo} alt="logo" className="h-8 mr-10" />
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
        <div className="ml-10 lg:block hidden">
          <a
            href="tel:+94705321516"
            className="relative inline-flex items-center justify-center p-4 px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
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
      </motion.div>
    </AnimatePresence>
  );
};
