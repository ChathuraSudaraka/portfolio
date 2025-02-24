import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Timeline } from "../../ui/timeline";
import { FiGithub, FiExternalLink, FiCode } from "react-icons/fi";

const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-primary dark:bg-primary"
        ></motion.span>
      ))}
    </div>
  );
};

const Work = () => {
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => {
        // Group projects by year
        const timelineData = [
          {
            year: "2024",
            projects: data.slice(0, 2),
          },
          {
            year: "2023",
            projects: data.slice(2),
          },
        ];
        setProjectsData(timelineData);
      })
      .catch((error) => console.error("Error loading projects:", error));
  }, []);

  return (
    <section className="relative min-h-screen py-20" id="work">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Header with enhanced design */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-2xl mb-6 [backdrop-filter:blur(12px)]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <p className="text-sm font-medium bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Experience
              </p>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-purple-500 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
              My Professional Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              A timeline of my professional growth and key achievements
            </p>
          </motion.div>
        </div>

        {/* Timeline wrapper */}
        <div className="mt-16 lg:mt-24">
          <Timeline
            data={projectsData.map((year) => ({
              title: year.year,
              content: (
                <div className="space-y-16">
                  {year.projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.2 }}
                      className="group relative"
                    >
                      <div className="relative bg-white dark:bg-black rounded-[2rem] p-8 md:p-10 transition-all duration-500 backdrop-blur-xl border border-gray-200 dark:border-gray-800 hover:border-primary/50">
                        <Sparkles />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative grid lg:grid-cols-5 gap-10">
                          {/* Project Image with enhanced container */}
                          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden group/image">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 z-10" />
                            <motion.img
                              src={project.image}
                              alt={project.name}
                              className="w-full h-full object-cover aspect-video rounded-2xl transform group-hover/image:scale-105 transition-transform duration-700"
                            />

                            {/* Tags with floating effect */}
                            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 z-20">
                              {[project.tag1, project.tag2, project.tag3]
                                .filter(Boolean)
                                .map((tag, i) => (
                                  <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="px-4 py-1.5 text-xs font-medium bg-black/40 text-white border border-white/10 rounded-full backdrop-blur-md hover:bg-black/60 transition-colors duration-300"
                                  >
                                    {tag}
                                  </motion.span>
                                ))}
                            </div>
                          </div>

                          {/* Project Info with improved typography */}
                          <div className="lg:col-span-3 flex flex-col justify-between space-y-8">
                            <div className="space-y-6">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                                    {project.name}
                                  </h3>
                                  {project.stats && (
                                    <p className="text-primary/90 text-sm font-medium">
                                      {Object.values(project.stats)[0]}
                                    </p>
                                  )}
                                </div>

                                {/* Links with hover effects */}
                                <div className="flex gap-3">
                                  <motion.a
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                    whileTap={{ scale: 0.9 }}
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 text-white hover:text-primary transition-all duration-300`}
                                  >
                                    <FiGithub className="w-5 h-5" />
                                  </motion.a>
                                  {project.demo && (
                                    <motion.a
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                      href={project.demo}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 text-white hover:text-primary transition-all duration-300`}
                                    >
                                      <FiExternalLink className="w-5 h-5" />
                                    </motion.a>
                                  )}
                                </div>
                              </div>

                              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                {project.description}
                              </p>
                            </div>

                            {/* Technologies with floating cards */}
                            <div className="space-y-4 pt-6 border-t border-gray-200/20 dark:border-gray-700/20">
                              <div className="flex items-center gap-2 text-primary">
                                <FiCode className="w-5 h-5" />
                                <span className="font-medium">Tech Stack</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies?.frontend?.map((tech) => (
                                  <motion.span
                                    key={tech}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="px-4 py-1.5 text-sm font-medium bg-primary/5 text-primary rounded-lg border border-primary/10 hover:bg-primary/10 transition-colors duration-300"
                                  >
                                    {tech}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ),
            }))}
          />
        </div>
      </div>
    </section>
  );
};

export default Work;
