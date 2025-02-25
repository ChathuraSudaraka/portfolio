import React from "react";
import { FloatingDock } from "../ui/floating-dock";
import { RiHome5Line, RiCodeBoxLine, RiArticleLine } from "react-icons/ri";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      icon: (
        <RiHome5Line className="h-full w-full text-gray-900 dark:text-white" />
      ),
      href: "/", // Changed from 'to' to 'href'
    },
    {
      title: "Projects",
      icon: (
        <RiCodeBoxLine className="h-full w-full text-gray-900 dark:text-white" />
      ),
      href: "/work", // Changed from 'to' to 'href'
    },
    {
      title: "Blog",
      icon: (
        <RiArticleLine className="h-full w-full text-gray-900 dark:text-white" />
      ),
      href: "/blog", // Changed from 'to' to 'href'
    },
  ];
  return (
    <FloatingDock
      mobileClassName="translate-y-20" // only for demo, remove for production
      items={links}
    />
  );
};

export default Navbar;
