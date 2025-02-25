import { cn } from "../../utils/cn";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import React from "react";
import { FiNavigation2 } from "react-icons/fi";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <div className="hidden md:flex fixed top-10 left-0 right-0 justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <FloatingDockDesktop items={items} className={desktopClassName} />
        </div>
      </div>
      <div className="fixed left-4 bottom-4 md:hidden z-50">
        <FloatingDockMobile items={items} className={mobileClassName} />
      </div>
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 flex flex-col items-center gap-2"
          >
            {items.map((item, idx) => (
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
                  className="h-11 w-11 ml-0.5 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center shadow-md"
                  onClick={() => setOpen(false)}
                >
                  <div className="w-4 h-4">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
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
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex h-16 gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 px-4 pb-3",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

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
        className="aspect-square rounded-2xl bg-white/20 dark:bg-neutral-800/50 hover:bg-white/30 dark:hover:bg-neutral-700/50 backdrop-blur-md flex items-center justify-center relative shadow-lg border border-gray-200 dark:border-gray-800 transition-colors"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-3 py-1.5 whitespace-pre rounded-lg bg-white/20 dark:bg-neutral-900/80 backdrop-blur-md border border-white/30 dark:border-neutral-800 text-neutral-800 dark:text-white absolute left-1/2 -translate-x-1/2 -bottom-12 w-fit text-sm font-medium shadow-xl"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
