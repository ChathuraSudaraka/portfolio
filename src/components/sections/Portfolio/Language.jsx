import React from "react";
import { motion } from "framer-motion";
import { DiJavascript, DiPython, DiJava, DiPhp, DiHtml5 } from "react-icons/di";
import { SiCsharp, SiTypescript } from "react-icons/si";

const Language = () => {
  const skills = [
    { name: "JavaScript", percent: 85, icon: DiJavascript, color: "#F0DB4F", darkColor: "#B3A43B" },
    { name: "TypeScript", percent: 80, icon: SiTypescript, color: "#3178C6", darkColor: "#235A9E" },
    { name: "Python", percent: 75, icon: DiPython, color: "#306998", darkColor: "#235179" },
    { name: "Java", percent: 70, icon: DiJava, color: "#B07219", darkColor: "#945D14" },
    { name: "C#", percent: 65, icon: SiCsharp, color: "#9B4F96", darkColor: "#7A3F77" },
    { name: "PHP", percent: 80, icon: DiPhp, color: "#777BB4", darkColor: "#5F6290" },
  ];

  return (
    <div className="mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="bg-white dark:bg-black backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl hover:scale-105 transition-all duration-300 h-[180px] group">
              <div className="relative h-full p-8 flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white dark:bg-gray-900 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <skill.icon className="w-12 h-12" style={{ color: skill.color }} />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-bold text-headingcolor dark:text-white">{skill.name}</h3>
                  <div className="relative h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute h-full rounded-full bg-gradient-to-r from-primary to-primary/80"
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Proficiency: {skill.percent}%
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

export default Language;