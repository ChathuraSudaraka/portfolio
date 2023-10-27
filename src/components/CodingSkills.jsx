import React from "react";
import Framework from "./Framework";
import Language from "./Language";

const ProgressBar = () => {
  return (
    <div className="bg-white dark:bg-custom-blue" id="skills">
      <div className="lg:mx-12 mx-4 py-32">
        <div className="mb-20">
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
    </div>
  );
};

export default ProgressBar;
