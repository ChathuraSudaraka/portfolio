import React from "react";

const ProgressBar = () => {
  // Define your coding language skills and their respective percentages here
  const skills = [
    { name: "JavaScript", percent: 85 },
    { name: "Python", percent: 70 },
    { name: "Java", percent: 60 },
    { name: "HTML/CSS", percent: 100 },
    // Add more skills as needed
  ];

  return (
    <div className="bg-white dark:bg-custom-blue">
      <div className="lg:mx-12 mx-4 py-32">
        <div className="mb-20">
          <p className="text-xl text-headingcolor dark:text-white font-semibold mb-5">
            My Skills
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-headingcolor dark:text-white">
            My Coding Skills
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white dark:bg-custom-dark-blue shadow-lg rounded-lg p-6 text-center"
              data-aos="fade-up"
              data-aos-offset="400"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  {skill.name}
                </h2>
              </div>
              <div className="relative h-28 w-28 mx-auto">
                <svg
                  className="w-28 h-28 transform translate-x-1 translate-y-1"
                  x-cloak
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
    </div>
  );
};

export default ProgressBar;


// "scripts": {
//     "dev": "vite",
//     "predeploy": "npm run build",
//     "deploy": "gh-pages -d build",
//     "build": "vite build",
//     "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
//     "preview": "vite preview"
//   },