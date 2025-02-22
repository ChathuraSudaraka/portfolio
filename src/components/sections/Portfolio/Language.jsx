import React from "react";
import { Csharp, HTML, Java, Javascript, PHP, Python } from "../../../hooks/CustomTag";
import { Meteors } from "../../ui/meteors";

const Language = () => {
  // Define your coding language skills and their respective percentages here
  const skills = [
    { name: "JavaScript", percent: 85, image: <Javascript /> },
    { name: "Python", percent: 70, image: <Python /> },
    { name: "Java", percent: 60, image: <Java /> },
    { name: "C#", percent: 56, image: <Csharp /> },
    { name: "PHP", percent: 80, image: <PHP /> },
    { name: "HTML/CSS", percent: 99, image: <HTML /> },
    // Add more skills as needed
  ];

  return (
    <div>
      <h1 className="mb-20 text-3xl md:text-3xl text-center font-bold text-headingcolor dark:text-white">
        Languages
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="relative overflow-hidden bg-bgcom border border-bgShade dark:border-border-color dark:bg-custom-dark-blue shadow-lg rounded-lg p-6 text-center"
            data-aos="zoom-in-down"
            data-aos-offset="150"
          >
            {/* Meteor effect */}
            <Meteors number={10} />
            <div className="mb-4 flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                {skill.name}
              </h2>
              <div className="w-14 h-14 mt-2 bg-white rounded-lg shadow-md transition-transform transform hover:scale-110 flex items-center justify-center">
                {skill.image}
              </div>
            </div>
            <div className="relative h-28 w-28 mx-auto">
              <svg
                className="w-28 h-28 transform translate-x-1 translate-y-1"
                x-cloak="true" // Pass a string value "true"
                aria-hidden="true"
              >
                <circle
                  className="text-gray-300"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="52"
                  cx="56"
                  cy="56"
                />
                <circle
                  className="text-blue-500"
                  strokeWidth="8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="52"
                  cx="56"
                  cy="56"
                  style={{
                    strokeDasharray: `${(skill.percent / 100) * 326} 326`,
                    transition: "stroke-dasharray 1s ease-in-out",
                  }}
                />
              </svg>
              <span
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-blue-700 dark:text-blue-500"
                data-cy={`skill-percent-${index}`}
              >
                {skill.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Language;
