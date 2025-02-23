import React from "react";
import { FaBootstrap, FaLaravel, FaReact, FaVuejs } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiExpress, SiSpringboot, SiDjango, SiDotnet } from "react-icons/si";
import { motion } from "framer-motion";

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
    <div className="py-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {frameworks.map((framework, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="bg-white dark:bg-black backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl hover:scale-105 transition-all duration-300 h-[180px] group">
              <div className="relative h-full p-8 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white dark:bg-gray-900 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <framework.icon className="w-12 h-12" style={{ color: framework.color }} />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-headingcolor dark:text-white">
                    {framework.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {framework.category}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Framework;
