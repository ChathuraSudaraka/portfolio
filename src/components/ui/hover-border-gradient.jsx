import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function HoverBorderGradient({
  children,
  containerClassName = "",
  className = "",
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("TOP");

  const rotateDirection = (currentDirection) => {
    const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap = {
    TOP: "radial-gradient(30% 70% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(25% 65% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    BOTTOM: "radial-gradient(30% 70% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    RIGHT: "radial-gradient(25% 65% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)"
  };

  const highlight = "radial-gradient(100% 200% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex rounded-full border content-center 
        bg-black/20 hover:bg-black/10 dark:bg-white/20 dark:hover:bg-white/10 
        transition-all duration-500 
        items-center flex-col flex-nowrap gap-10 h-min justify-center 
        overflow-visible p-[3px] decoration-clone w-fit ${containerClassName}`}
      {...props}
    >
      <div className={`w-auto z-10 
        bg-white dark:bg-black 
        text-gray-900 dark:text-white
        px-6 py-2.5 rounded-[inherit] 
        transition-colors duration-300
        ${className}`}
      >
        {children}
      </div>
      <motion.div
        className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        style={{
          filter: "blur(3px)",
          position: "absolute",
          width: "calc(100% + 4px)",
          height: "calc(100% + 4px)",
          top: "-2px",
          left: "-2px",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration }}
      />
      <div className="bg-white dark:bg-black absolute z-1 flex-none inset-[3px] rounded-[100px]" />
    </Tag>
  );
}

export default HoverBorderGradient;
