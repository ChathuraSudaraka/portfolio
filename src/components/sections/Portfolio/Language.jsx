import React from "react";
import { motion } from "framer-motion";
import { DiJavascript, DiPython, DiJava, DiPhp, DiHtml5 } from "react-icons/di";
import { SiCsharp } from "react-icons/si";

const Language = () => {
  const skills = [
    { name: "JavaScript", percent: 85, image: <DiJavascript className="text-4xl" color="#F0DB4F" /> },
    { name: "Python", percent: 70, image: <DiPython className="text-4xl" color="#306998" /> },
    { name: "Java", percent: 60, image: <DiJava className="text-4xl" color="#B07219" /> },
    { name: "C#", percent: 56, image: <SiCsharp className="text-4xl" color="#9B4F96" /> },
    { name: "PHP", percent: 80, image: <DiPhp className="text-4xl" color="#777BB4" /> },
    { name: "HTML/CSS", percent: 99, image: <DiHtml5 className="text-4xl" color="#E34F26" /> },
  ];

  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-headingcolor dark:text-white">
        Programming Languages
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="bg-bgcom dark:bg-custom-dark-blue border border-bgShade dark:border-border-color rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-white rounded-lg shadow-md transition-transform transform hover:scale-110 flex items-center justify-center">
                  {skill.image}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-headingcolor dark:text-white">{skill.name}</h3>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="h-2.5 rounded-full transition-all duration-500 bg-blue-500"
                      style={{
                        width: `${skill.percent}%`
                      }}
                    />
                  </div>
                  <span className="text-sm text-headingcolor dark:text-white mt-1">
                    {skill.percent}% Proficiency
                  </span>
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