import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

const SparkleEffect = () => {
  return (
    <div className="absolute w-full">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ left: `${i * 5 - 10}px`, background: "currentColor" }}
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], y: [0, i % 2 ? -8 : 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const BeamScroll = ({ children, color = "#3275F8" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 50%", "end 100%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div ref={ref} className="relative">
      {/* Background track */}
      <div className="absolute left-0 md:left-1/2 top-0 h-full">
        <div 
          className="absolute left-[8px] md:left-0 md:-translate-x-1/2 w-[2px] h-full"
          style={{
            background: `linear-gradient(180deg, transparent, ${color}20, ${color}20, transparent)`,
            boxShadow: `0 0 10px ${color}40`
          }}
        />
      </div>

      {/* Animated beam */}
      <div className="absolute left-0 md:left-1/2 top-0 h-full">
        <motion.div
          style={{ scaleY }}
          className="absolute left-[8px] md:left-0 md:-translate-x-1/2 w-[3px] h-full origin-top"
        >
          <div 
            className="h-full w-full"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${color} 50%, transparent 100%)`,
              boxShadow: `0 0 20px ${color}, 0 0 40px ${color}80`
            }}
          />
          
          <motion.div
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
              opacity: glowOpacity,
            }}
            className="absolute top-0 left-0"
          >
            <div 
              className="h-40 w-[5px] blur-[4px]"
              style={{
                background: `linear-gradient(180deg, transparent, ${color}80, ${color}, ${color}80, transparent)`,
                boxShadow: `0 0 30px ${color}`
              }}
            />
            <motion.div
              style={{ opacity: glowOpacity }}
              className="absolute top-16 left-1/2 -translate-x-1/2"
            >
              <SparkleEffect />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      {children}
    </div>
  );
};

export default BeamScroll;
