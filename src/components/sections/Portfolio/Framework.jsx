import React from "react";
import { motion } from "framer-motion";
import { FaBootstrap, FaLaravel, FaReact, FaVuejs } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiExpress, SiSpringboot, SiDjango, SiDotnet } from "react-icons/si";
import { PinContainer } from "../../ui/3d-pin";

const Framework = () => {
  const frameworks = [
    { name: "React", icon: FaReact, color: "#61DAFB", category: "Frontend" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000", category: "Frontend" },
    { name: "Vue.js", icon: FaVuejs, color: "#4FC08D", category: "Frontend" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC", category: "CSS" },
    { name: "Laravel", icon: FaLaravel, color: "#FF2D20", category: "Backend" },
    { name: "Express", icon: SiExpress, color: "#000000", category: "Backend" },
    { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F", category: "Backend" },
    { name: "Django", icon: SiDjango, color: "#092E20", category: "Backend" },
    { name: ".NET", icon: SiDotnet, color: "#512BD4", category: "Backend" },
    { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3", category: "CSS" },
  ];

  return (
    <div className="py-12">
      {/* Added Framework Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center space-x-2 bg-secondary/10 dark:bg-secondary/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4">
            <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-secondary"></span>
            </span>
            <p className="text-xs sm:text-sm font-medium text-secondary whitespace-nowrap">
              Frameworks & Tools
            </p>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Modern <span className="text-secondary">Technologies</span>
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {frameworks.map((framework, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="w-[220px]"
          >
            <PinContainer 
              title={framework.category}
              containerClassName="w-full"
            >
              <div className="relative group">
                <div className="relative bg-white/10 dark:bg-gray-900/30 backdrop-blur-md rounded-xl p-6 min-h-[180px] flex items-center justify-center border border-gray-200/20 dark:border-gray-700/20">
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-xl" />
                      <div className="relative w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg">
                        <framework.icon 
                          className="w-8 h-8" 
                          style={{ color: framework.color }} 
                        />
                      </div>
                    </motion.div>

                    <h3 className="text-base font-medium text-white">
                      {framework.name}
                    </h3>
                  </div>
                </div>
              </div>
            </PinContainer>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Framework;
