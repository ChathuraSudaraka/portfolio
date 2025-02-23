import React from "react";
import Framework from "./Framework";
import Language from "./Language";

const CodingSkills = () => {
  return (
    <section className="py-20" id="skills">
      <div className="lg:mx-12 mx-4">
        <div className="text-center mb-16">
          <p className="text-xl text-headingcolor dark:text-white font-semibold mb-5">
            My Skills
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-headingcolor dark:text-white">
            My Coding Skills
          </h1>
        </div>
        <Language />
        <Framework />
      </div>
    </section>
  );
};

export default CodingSkills;
