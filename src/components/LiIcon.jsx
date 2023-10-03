import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";

const LiIcon = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "center center"],
  });

  return (
    <figure
      className="absolute left-0 dark:stroke-white stroke-black"
      ref={ref}
    >
      <svg className="-rotate-90" width="75" height="75" viewBox="5 0 100 100">
        <circle
          cx="75"
          cy="50"
          r="20"
          className="stroke-primary stroke-1 fill-none"
        />
        <motion.circle
          cx="75"
          cy="50"
          r="20"
          className="stroke-[5px] dark:fill-slate-400 fill-white"
          style={{ pathLength: scrollYProgress }}
        />
        <circle
          cx="75"
          cy="50"
          r="10"
          className=" animate-pulse stroke-1 fill-primary"
        />
      </svg>
    </figure>
  );
};

export default LiIcon;
