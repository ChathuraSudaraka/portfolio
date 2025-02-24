import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Progress line - Left aligned */}
      <div
        ref={ref}
        className="absolute left-8 top-0 bottom-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-gray-200 dark:via-gray-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
      >
        <motion.div
          style={{
            height: heightTransform,
            opacity: opacityTransform,
          }}
          className="absolute inset-x-0 top-0 w-full bg-gradient-to-t from-primary via-secondary to-transparent from-[0%] via-[10%] rounded-full"
        />
      </div>

      {/* Timeline entries */}
      <div className="space-y-16 pl-24">
        {data.map((entry, idx) => (
          <div key={idx} className="relative">
            {/* Animated node - Left aligned */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
              className="absolute -left-[79px] top-8"
            >
              {/* Node outer ring */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary via-secondary to-primary p-[2px] rotate-0 hover:rotate-180 transition-transform duration-500">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="relative"
            >
              {/* Connector line */}
              <div className="absolute -left-12 top-[48px] w-14 h-[2px] bg-gradient-to-r from-primary to-transparent" />

              <span className="text-xl font-semibold mb-2 block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                {entry.title}
              </span>
              {/* Content wrapper */}
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/50 transition-all duration-300">
                {entry.content}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};
