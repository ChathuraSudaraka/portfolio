import React from "react";
import Framework from "./Framework";
import Language from "./Language";

const CodingSkills = () => {
  return (
    <section className="relative py-20" id="skills">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="text-xl text-primary font-semibold mb-5">
            Technical Expertise
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-headingcolor dark:text-white mb-4">
            My Coding Skills
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my programming languages and frameworks proficiency
          </p>
        </div>
        
        <Language />
        <Framework />
      </div>
    </section>
  );
};

export default CodingSkills;
