import { useEffect, useState } from "react";
import {
  Backend,
  BrandingLogo,
  StrategyDirection,
  UIUX,
} from "./hooks/CustomTag";

const skills = [
  {
    id: 1,
    name: "Strategy & Direction",
    description:
      "Strategy is the compass that charts the path, while Direction leads each step toward triumphant horizons.",
    image: <StrategyDirection />,
  },
  {
    id: 2,
    name: "Branding & Logo",
    description:
      "Branding shapes a distinctive identity, while a Logo is its visual emblem, both vital for brand recognition.",
    image: <BrandingLogo />,
  },
  {
    id: 3,
    name: "UI & UX Design",
    description:
      "UI (User Interface) focuses on aesthetics and usability; UX (User Experience) ensures seamless, satisfying interactions.",
    image: <UIUX />,
  },
  {
    id: 4,
    name: "Backend Development",
    description:
      "Backend Development powers the server, databases, and logic behind web applications, ensuring functionality and data management.",
    image: <Backend />,
  },
];

const Skills = () => {
  return (
    <div className="">
      <div className="lg:mx-12 mx-4 py-32" id="skills">
        <div className="mb-20">
          <p className="text-xl text-headingcolor dark:text-white font-semibold mb-5">
            My Skills
          </p>
          <h2 className="md:text-5xl text-4xl text-headingcolor dark:text-white font-bold">
            My Expertise
          </h2>
        </div>

        {/* skill cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-bgcom border border-bgShade dark:border-border-color shadow-lg dark:bg-custom-dark-blue dark:text-dark-white p-8 rounded-lg cursor-pointer hover:-translate-y-5 transition-all duration-300"
              data-aos="fade-zoom-in"
              data-aos-offset="300"
            >
              <div className="w-14 h-14 p-3 bg-white rounded-lg shadow-md mb-7 transition-transform transform hover:scale-110 flex items-center justify-center">
                {skill.image}
              </div>
              <h3 className="text-2xl font-bold mb-4">{skill.name}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
