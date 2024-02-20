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
        <a
          href="tel:+94705321516"
          className="border text-sm sm:block hidden font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 ml-2 rounded-full"
        >
          <span>Contact me</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </a>
      </motion.div>
    </AnimatePresence>
  );
};
