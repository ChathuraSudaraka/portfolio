import React from "react";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { FloatingDock } from "../ui/floating-dock";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/work",
    },
    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/BlogApp/*",
    },
  ];
  return (
    <div className="fixed z-20 top-10 left-0 right-0 flex items-center justify-center w-full">
      <FloatingDock
        // only for demo, remove for production
        // mobileClassName="translate-y-20"
        items={links}
      />
    </div>
  );
};

export default Navbar;
