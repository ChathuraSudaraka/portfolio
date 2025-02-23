import React from "react";
import { FaBootstrap, FaLaravel, FaReact } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiExpress } from "react-icons/si";
import { motion } from "framer-motion";

const Framework = () => {
  const frameworks = [
    { name: "Laravel", icon: <FaLaravel className="text-4xl" /> },
    { name: "React", icon: <FaReact className="text-4xl" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-4xl" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-4xl" /> },
    { name: "Express", icon: <SiExpress className="text-4xl" /> },
    { name: "Bootstrap", icon: <FaBootstrap className="text-4xl" /> },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-12 text-headingcolor dark:text-white">
        Frameworks & Libraries
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {frameworks.map((framework, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-bgcom dark:bg-custom-dark-blue border border-bgShade dark:border-border-color rounded-xl p-6 flex flex-col items-center justify-center"
          >
            <div className="mb-4 w-14 h-14 bg-white rounded-lg shadow-md transition-transform transform hover:scale-110 flex items-center justify-center">
              {framework.icon}
            </div>
            <h3 className="text-lg font-medium text-headingcolor dark:text-white">{framework.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Framework;
