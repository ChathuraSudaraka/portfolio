import React from "react";
import { motion } from "framer-motion";
import BeamScroll from "../../ui/beam-scroll";

const Education = () => {
  const educations = [
    {
      degree: "Bachelor Of Science (BSc) In Software Engineering",
      school: "Java Institute For Advanced Technology",
      duration: "2022-2026",
      description:
        "The Java Institute for Advanced Technology is a prominent research-oriented higher education institution based in Sri Lanka, fostering innovation and excellence. Focusing on software architecture, cloud computing, and enterprise development.",
    },
    {
      degree: "Diploma In Information Technology (DIT)",
      school: "ESOFT Metro Campus",
      duration: "2022-2023",
      description:
        "Comprehensive study of modern software development practices, database management, and web technologies. Achieved distinction with special focus on full-stack development.",
    },
    {
      degree: "Advanced Level in Technology Stream",
      school: "Richmond College",
      duration: "2019-2021",
      description:
        "Studied Engineering Technology, Science for Technology, and ICT. Participated in various tech competitions and coding challenges. Led the school's programming club.",
    },
    {
      degree: "Professional Certification in Web Development",
      school: "FreeCodeCamp",
      duration: "2021-2022",
      description:
        "Completed intensive online coursework in modern web development, including responsive web design, JavaScript algorithms, and frontend libraries.",
    },
  ];

  return (
    <section className="relative py-20" id="education">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-secondary/10 dark:bg-secondary/20 px-3 py-2 rounded-full mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
            </span>
            <p className="text-sm font-medium text-secondary">
              Academic Journey
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            My <span className="text-secondary">Education</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          <BeamScroll color="rgb(168, 85, 247)">
            {educations.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 ${
                  index % 2 === 0 ? "md:text-right" : "md:text-left"
                }`}
              >
                {/* Timeline Node - updated for perfect center */}
                <div className="absolute left-0 md:left-1/2 top-0 z-10">
                  <div className="relative left-[8px] md:left-0 md:-translate-x-1/2 w-5 h-5">
                    <div className="absolute inset-0 rounded-full bg-primary/20 dark:bg-primary/40 animate-ping" />
                    <div className="absolute inset-0 rounded-full bg-primary" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`md:col-span-1 ${
                    index % 2 === 0 ? "md:col-start-1" : "md:col-start-2"
                  }`}
                >
                  <div className="group relative bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 p-6 hover:shadow-lg transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    <div className="relative z-10">
                      <div className="text-xl font-bold text-secondary mb-2">
                        {edu.degree}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {edu.school} • {edu.duration}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </BeamScroll>
        </div>
      </div>
    </section>
  );
};

export default Education;
