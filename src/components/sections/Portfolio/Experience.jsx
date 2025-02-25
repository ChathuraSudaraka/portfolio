import React from "react";
import { motion } from "framer-motion";
// Update the import statement
import BeamScroll from "../../ui/beam-scroll";

const Experience = () => {
  const experiences = [
    {
      role: "Senior Software Engineer",
      company: "Eversoft IT Solutions",
      duration: "2022 - Present",
      location: "Colombo, Sri Lanka",
      description:
        "Leading full-stack development projects, implementing cloud solutions, and mentoring junior developers. Specialized in MERN stack applications and microservices architecture.",
    },
    {
      role: "Software Developer",
      company: "Tech Innovators",
      duration: "2021 - 2022",
      location: "Colombo, Sri Lanka",
      description:
        "Developed and maintained enterprise web applications. Worked with React, Node.js, and PostgreSQL. Improved application performance by 40%.",
    },
    {
      role: "Junior Developer",
      company: "Digital Solutions Ltd",
      duration: "2020 - 2021",
      location: "Galle, Sri Lanka",
      description:
        "Built responsive web applications, collaborated with UI/UX team, and participated in agile development processes. Focused on frontend development with React.",
    },
    {
      role: "Intern Developer",
      company: "CodeCraft Institute",
      duration: "2019 - 2020",
      location: "Colombo, Sri Lanka",
      description:
        "Assisted in developing web applications, learned modern development practices, and participated in team projects using various technologies.",
    },
  ];

  return (
    <section className="relative py-20" id="experience">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-3 py-2 rounded-full mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <p className="text-sm font-medium text-primary">Work Journey</p>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            My <span className="text-primary">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          <BeamScroll color="rgb(50, 117, 248)">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 ${
                  index % 2 === 0 ? "md:text-right" : "md:text-left"
                }`}
              >
                {/* Timeline Node - refined centering */}
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
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    <div className="relative z-10">
                      <div className="text-xl font-bold text-primary mb-2">
                        {exp.role}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {exp.company} • {exp.duration} • {exp.location}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {exp.description}
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

export default Experience;
