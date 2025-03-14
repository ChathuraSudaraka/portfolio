import { cn } from "../../utils/cn";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useRef, useState, ReactNode, RefObject } from "react";
import React from "react";
import { FiNavigation2 } from "react-icons/fi";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <div className="hidden md:flex fixed top-10 left-0 right-0 justify-center z-40 pointer-events-none">
        <div className="pointer-events-auto">
          <FloatingDockDesktop items={items} className={desktopClassName} />
        </div>
      </div>
      <div className="fixed left-4 bottom-6 md:hidden z-40">
        <FloatingDockMobile items={items} className={mobileClassName} />
      </div>
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  return (
    <div className={cn("relative", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 flex flex-col items-center gap-2"
          >
            {items.map((item, idx) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: {
                      delay: idx * 0.05,
                    },
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                >
                  <Link
                    to={item.href}
                    key={item.title}
                    className={`h-11 w-11 ml-0.5 rounded-full ${isActive ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-50 dark:bg-neutral-900'} flex items-center justify-center shadow-md`}
                    onClick={() => setOpen(false)}
                  >
                    <div className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`}>{item.icon}</div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-12 w-12 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiNavigation2
            className="h-5 w-5 text-neutral-500 dark:text-neutral-400"
            style={{
              strokeWidth: 2.5,
            }}
          />
        </motion.div>
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  const location = useLocation();
  
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex h-16 gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 px-4 pb-2.5",
        className
      )}
    >
      {items.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <div key={item.title}>
            <IconContainer 
              mouseX={mouseX}
              {...item} 
              isActive={isActive}
            />
          </div>
        );
      })}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  isActive,
}: {
  mouseX: MotionValue;
  title: string;
  icon: ReactNode;
  href: string;
  isActive: boolean;
}) {
  let ref = useRef(null) as unknown as RefObject<HTMLDivElement>;

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [45, 90, 45]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [45, 90, 45]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [24, 44, 24]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [24, 44, 24]
  );

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

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link to={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`aspect-square rounded-2xl ${
          isActive 
            ? 'bg-blue-100/40 dark:bg-blue-900/50 border-blue-300 dark:border-blue-700' 
            : 'bg-white/20 dark:bg-neutral-800/50 border-gray-200 dark:border-gray-800'
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
                  ? 'bg-blue-100 dark:bg-blue-900/80 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800' 
                  : 'bg-white/20 dark:bg-neutral-900/80 text-neutral-800 dark:text-white border-white/30 dark:border-neutral-800'
              } backdrop-blur-md border absolute left-1/2 -translate-x-1/2 -bottom-12 w-fit text-sm font-medium shadow-xl`}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className={`flex items-center justify-center ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`}
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
