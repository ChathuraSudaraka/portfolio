"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
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
      className={cn(
        "relative group/pin cursor-pointer w-full h-full",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{ perspective: "1000px", transform: "rotateX(70deg) translateZ(0deg)" }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2 w-full"
      >
        <div
          style={{ transform: transform }}
          className="absolute left-1/2 p-2 top-1/2 flex justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-gray-50/80 dark:bg-black border border-gray-200/50 dark:border-white/[0.1] group-hover/pin:border-gray-300/50 dark:group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden w-[calc(100%-1rem)]"
        >
          <div className={cn("relative w-full", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} href={href} />
    </div>
  );
};

export const PinPerspective = ({
  title,
  href,
}: {
  title?: string;
  href?: string;
}) => {
  return (
    <motion.div className="pointer-events-none w-96 h-56 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 transition duration-500">
      <div className="w-full h-full -mt-7 flex-none inset-0">
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <a
            href={href}
            target={"_blank"}
            className="relative flex space-x-2 items-center z-10 rounded-full bg-gray-900/90 dark:bg-zinc-800/90 py-0.5 px-4 ring-1 ring-white/20 shadow-lg"
          >
            <span className="relative z-20 text-white text-xs font-medium inline-block py-0.5">
              {title}
            </span>

            <span className="absolute -bottom-0 left-0.5 h-0.5 w-[calc(100%-1.25rem)] bg-gradient-to-r from-primary/0 via-primary/90 to-primary/0 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          {[0, 2, 4].map((delay) => (
            <motion.div
              key={delay}
              initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: delay,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-primary/[0.12] dark:bg-primary/[0.15] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            />
          ))}
        </div>

        <>
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-primary/60 dark:to-primary translate-y-[14px] w-px h-20 group-hover/pin:h-32 blur-[2px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-primary/60 dark:to-primary translate-y-[14px] w-px h-20 group-hover/pin:h-32" />
          <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-primary/60 dark:bg-primary translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
          <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-primary/60 dark:bg-primary translate-y-[14px] w-[2px] h-[2px] rounded-full z-40" />
        </>
      </div>
    </motion.div>
  );
};
