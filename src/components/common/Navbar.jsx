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
      href: "/",
    },
    {
      title: "Projects",
      icon: (
        <RiCodeBoxLine className="h-full w-full text-gray-900 dark:text-white" />
      ),
      href: "/work",
    },
    {
      title: "Blog",
      icon: (
        <RiArticleLine className="h-full w-full text-gray-900 dark:text-white" />
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
