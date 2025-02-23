import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface BeamScrollProps {
  children: React.ReactNode;
  color?: string;
}

const SparkleEffect = () => {
  return (
    <div className="absolute w-full">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${(i * 5) - 10}px`,
            background: 'currentColor',
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [0, i % 2 ? -8 : 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export const BeamScroll = ({ children, color = "#3275F8" }: BeamScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100%", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const glowOpacity = useTransform(scrollYProgress, 
    [0, 0.5, 1], 
    [0, 1, 0]
  );

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-0 md:left-1/2 top-0 h-full">
        <motion.div
          style={{ scaleY }}
          className="absolute left-[8px] md:left-0 md:-translate-x-1/2 w-[3px] h-full origin-top"
        >
          {/* Static beam */}
          <div 
            className="h-full w-full"
            style={{ 
              background: `linear-gradient(180deg, transparent 0%, ${color} 50%, transparent 100%)`,
              opacity: 0.5
            }} 
          />
          
          {/* Moving glow effect */}
          <motion.div
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
              opacity: glowOpacity,
            }}
            className="absolute top-0 left-0"
          >
            {/* Glow */}
            <div 
              className="h-24 w-full blur-sm"
              style={{ 
                background: `linear-gradient(180deg, transparent, ${color}, transparent)`,
              }} 
            />
            
            {/* Sparkles */}
            <motion.div
              style={{ opacity: glowOpacity }}
              className="absolute top-12 left-1/2 -translate-x-1/2 text-[${color}]"
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
