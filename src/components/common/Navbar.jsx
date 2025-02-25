import React from "react";
import { FloatingDock } from "../ui/floating-dock";
import { AiFillHome } from "react-icons/ai";
import { FaProjectDiagram } from "react-icons/fa";
import { FaBlog } from "react-icons/fa";

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
  return <FloatingDock items={links} />;
};

export default Navbar;
