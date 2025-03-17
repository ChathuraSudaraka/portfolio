import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FaProjectDiagram } from "react-icons/fa";
import { FaBlog } from "react-icons/fa";
import FloatingDock from "../ui/floating-dock";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      icon: <AiFillHome className="h-full w-full dark:text-white" />,
      href: "/",
    },
    {
      title: "Projects",
      icon: <FaProjectDiagram className="h-full w-full dark:text-white" />,
      href: "/work",
    },
    {
      title: "Blog",
      icon: <FaBlog className="h-full w-full dark:text-white" />,
      href: "/blog",
    },
  ];
  return (
    <>
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <FloatingDock items={links} />
      </nav>
      <div className="block md:hidden">
        <FloatingDock items={links} />
      </div>
    </>
  );
};

export default Navbar;
