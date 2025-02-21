import React from "react";
import { FaBootstrap, FaLaravel, FaReact } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

const Framework = () => {
  // Define your coding language skills and their respective percentages here
  const skills = [
    {
      name: "Laravel",
      image: <FaLaravel />,
    },
    {
      name: "ReactNative",
      image: <FaReact />,
    },
    {
      name: "Tailwind css",
      image: <SiTailwindcss />,
    },
    {
      name: "Bootstrap",
      image: <FaBootstrap />,
    },
    {
      name: "Bootstrap",
      image: <FaBootstrap />,
    },
    // Add more skills as needed
  ];

  return (
    <div> 
      <h1 className="py-20 text-3xl md:text-3xl text-center font-bold text-headingcolor dark:text-white">
        Framework
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-8">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="relative overflow-hidden bg-bgcom border border-bgShade dark:border-border-color dark:bg-custom-dark-blue shadow-lg rounded-lg p-6 text-center"
            data-aos="zoom-in-down"
            data-aos-offset="150"
          >
            <div className="mb-4 flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                {skill.name}
              </h2>
              <div className="w-14 h-14 mt-2 bg-white rounded-lg shadow-md transition-transform transform hover:scale-110 flex items-center justify-center">
                {skill.image}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Framework;
