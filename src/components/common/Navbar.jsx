import React from "react";
import { FloatingDock } from "../ui/floating-dock";
import { FaHome, FaRegNewspaper, FaProjectDiagram } from "react-icons/fa";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      icon: (
        <FaHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Projects",
      icon: (
        <FaProjectDiagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/work",
    },
    {
      title: "Blog",
      icon: (
        <FaRegNewspaper className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/blog",
    },
  ];
  return (
    <div className="fixed z-50 md:top-10 left-0 right-0 flex items-center justify-center w-full">
      <FloatingDock items={links} />
    </div>
  );
};

export default Navbar;
