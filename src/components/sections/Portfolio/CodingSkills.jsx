import React from "react";
import { motion } from "framer-motion";
import Framework from "./Framework";
import Language from "./Language";

const CodingSkills = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-x-hidden" id="skills">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Make badge more responsive */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4">
              <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-primary"></span>
              </span>
              <p className="text-xs sm:text-sm font-medium text-primary whitespace-nowrap">
                Technical Stack
              </p>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-headingcolor dark:text-white mb-4">
              My Coding <span className="text-primary">Skills</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto">
              A showcase of my programming languages and frameworks proficiency
            </p>
          </motion.div>
        </div>

        {/* Skills sections with simple animations */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Language />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Framework />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodingSkills;
