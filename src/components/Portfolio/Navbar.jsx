import React, { useState, useEffect } from "react";
import logo from "/assets/logo.webp";
import { FloatingNav } from "../ui/floating-navbar";
import {
  IconBackpack,
  IconBallpen,
  IconFolders,
  IconHome,
  IconUser,
  IconUserStar,
  IconUxCircle,
} from "@tabler/icons-react";

const navItems = [
  {
    text: "Home",
    to: "home",
    offset: -100,
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    text: "Skills",
    to: "skills",
    offset: 10,
    icon: <IconUserStar className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    text: "About me",
    to: "about",
    offset: -50,
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    text: "Experience",
    to: "experience",
    offset: 10,
    icon: <IconUxCircle className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    text: "Education",
    to: "education",
    offset: 10,
    icon: <IconBackpack className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    text: "Portfolio",
    to: "portfolio",
    offset: 10,
    icon: <IconFolders className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    text: "Blogs",
    to: "blog",
    offset: 10,
    icon: <IconBallpen className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

const Navbar = () => {
  return <FloatingNav navItems={navItems} />;
};

export default Navbar;
