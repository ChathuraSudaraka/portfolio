import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";

export const TracingBeam = ({ children, className = "" }) => {
  const ref = useRef(null);
  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        const height = contentRef.current.scrollHeight;
        setSvgHeight(height);
      }
    };

    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current);
      }
    };
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    { stiffness: 500, damping: 90 }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    { stiffness: 500, damping: 90 }
  );

  return (
    <motion.div ref={ref} className={`relative w-full max-w-full ${className}`}>
      <div className="absolute -left-4 md:left-8 top-3 hidden md:block">
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{
            boxShadow: scrollYProgress.get() > 0
              ? "none"
              : "rgba(0, 0, 0, 0.24) 0px 3px 8px"
          }}
          className="ml-[19px] h-4 w-4 rounded-full border border-neutral-200 shadow-sm flex items-center justify-center"
        >
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            animate={{
              backgroundColor: scrollYProgress.get() > 0 ? "#ffffff" : "#14b8a6",
              borderColor: scrollYProgress.get() > 0 ? "#ffffff" : "#0f766e",
            }}
            className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
          />
        </motion.div>
        <svg
          width="20"
          height={svgHeight}
          className="ml-2 block"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9CA3AF"
            strokeOpacity="0.24"
            transition={{ duration: 10 }}
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            className="motion-reduce:hidden"
            transition={{ duration: 10 }}
          />
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#60A5FA" stopOpacity="0" />
              <stop stopColor="#3B82F6" />
              <stop offset="0.325" stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#EC4899" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </motion.div>
  );
};

export default TracingBeam;
