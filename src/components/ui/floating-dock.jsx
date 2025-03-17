import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FiNavigation2 } from "react-icons/fi";

export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => {
  return (
    <>
      <div className="hidden md:flex fixed top-10 left-0 right-0 justify-center z-40 pointer-events-none">
        <div className="pointer-events-auto">
          <FloatingDockDesktop items={items} className={desktopClassName} />
        </div>
      </div>
      <div className="fixed md:hidden bottom-6 left-4 md:left-8 md:bottom-10 z-40">
        <FloatingDockMobile items={items} className={mobileClassName} />
      </div>
    </>
  );
};

const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className={`relative ${className || ""}`}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-4 flex flex-col-reverse items-center gap-3"
            style={{ minWidth: "max-content" }}
          >
            {items.map((item, idx) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 20,
                    transition: { duration: 0.2, delay: idx * 0.05 },
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                  className="ml-1.5"
                >
                  <Link
                    to={item.href}
                    className={`h-12 w-12 rounded-full ${
                      isActive
                        ? "bg-blue-100 dark:bg-blue-900"
                        : "bg-white dark:bg-neutral-800"
                    } flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700`}
                    onClick={() => setOpen(false)}
                  >
                    <div
                      className={`w-5 h-5 ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`}
                    >
                      {item.icon}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-14 w-14 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiNavigation2
            className="h-6 w-6 text-neutral-500 dark:text-neutral-400"
            style={{ strokeWidth: 2.5 }}
          />
        </motion.div>
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);
  const location = useLocation();

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`flex h-16 gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 px-4 pb-2.5 ${className || ""}`}
    >
      {items.map((item) => (
        <div key={item.title}>
          <IconContainer
            mouseX={mouseX}
            {...item}
            isActive={location.pathname === item.href}
          />
        </div>
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href, isActive }) {
  let ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [45, 90, 45]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [45, 90, 45]);
  let iconSizeTransform = useTransform(distance, [-150, 0, 150], [24, 44, 24]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let iconSize = useSpring(iconSizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Link to={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`aspect-square rounded-2xl ${
          isActive
            ? "bg-blue-100/40 dark:bg-blue-900/50 border-blue-300 dark:border-blue-700"
            : "bg-white/20 dark:bg-neutral-800/50 border-gray-200 dark:border-gray-800"
        } hover:bg-white/30 dark:hover:bg-neutral-700/50 backdrop-blur-md flex items-center justify-center relative shadow-lg border transition-colors`}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className={`px-3 py-1.5 whitespace-pre rounded-lg ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900/80 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800"
                  : "bg-white/20 dark:bg-neutral-900/80 text-neutral-800 dark:text-white border-white/30 dark:border-neutral-800"
              } backdrop-blur-md border absolute left-1/2 -translate-x-1/2 -bottom-12 w-fit text-sm font-medium shadow-xl`}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: iconSize, height: iconSize }}
          className={`flex items-center justify-center ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`}
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default FloatingDock;
