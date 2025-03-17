import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const PinContainer = ({
  children,
  title,
  href,
  className = "",
  containerClassName = "",
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <div
      className={`relative group/pin z-20 cursor-pointer ${containerClassName}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2 w-full"
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
      >
        <div
          style={{ transform }}
          className="absolute left-1/2 p-6 top-1/2 w-full flex justify-center items-center rounded-2xl 
            shadow-[0_8px_16px_rgb(0_0_0/0.4)] dark:shadow-[0_8px_16px_rgb(0_0_0/0.6)]
            bg-white/5 dark:bg-black/5
            backdrop-blur-xl
            border border-white/[0.1] dark:border-white/[0.05]
            group-hover/pin:border-white/[0.2] dark:group-hover/pin:border-white/[0.1]
            transition-all duration-700 overflow-hidden
            before:absolute before:inset-0 
            before:bg-gradient-to-b before:from-transparent 
            before:to-white/5 dark:before:to-black/5
            before:pointer-events-none"
        >
          <div className={`relative z-40 w-full ${className}`}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} href={href} />
    </div>
  );
};

const PinPerspective = ({ title, href }) => {
  return (
    <motion.div className="pointer-events-none w-96 h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-30 transition duration-500">
      <div className="w-full h-full -mt-7 flex-none inset-0">
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex space-x-2 items-center z-10 rounded-full 
              bg-black/5 dark:bg-white/5 
              backdrop-blur-sm
              border border-white/[0.05] dark:border-white/[0.05]
              py-0.5 px-4 
              hover:border-white/[0.1] dark:hover:border-white/[0.1]
              transition-colors"
          >
            <span className="relative z-20 text-black/70 dark:text-white/70 text-xs font-medium">
              {title}
            </span>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] 
              bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0
              transition-opacity duration-500 group-hover/btn:opacity-40">
            </span>
          </a>
        </div>

        <div
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
        >
          {[0, 2, 4].map((delay) => (
            <motion.div
              key={delay}
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            />
          ))}
        </div>

        <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-primary/50 dark:to-primary/30 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
        <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-primary/50 dark:to-primary/30 translate-y-[14px] w-px h-20 group-hover/pin:h-40" />
        <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-primary/50 dark:bg-primary/30 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
        <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-primary/50 dark:bg-primary/30 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40" />
      </div>
    </motion.div>
  );
};

export default PinContainer;
