import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Timeline } from "../../ui/timeline";
import { FiGithub, FiExternalLink, FiCode } from "react-icons/fi";

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
    <section className="relative py-20 lg:py-32" id="work">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4">
              <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-primary"></span>
              </span>
              <p className="text-xs sm:text-sm font-medium text-primary whitespace-nowrap">
                Experience
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              My Professional <span className="text-primary">Journey</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A timeline of my professional growth and key achievements in
              software development
            </p>
          </motion.div>
        </div>

        {/* Timeline wrapper with improved spacing */}
        <div className="mt-16 lg:mt-24">
          <Timeline
            data={projectsData.map((year) => ({
              title: year.year,
              content: (
                <div className="space-y-8">
                  {year.projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="relative group"
                    >
                      <div className="bg-white/50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Project Image */}
                          <div className="relative aspect-video rounded-xl overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                            {/* Tags */}
                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                              {[project.tag1, project.tag2, project.tag3]
                                .filter(Boolean)
                                .map((tag, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 text-xs font-medium bg-black/50 backdrop-blur-sm text-white border border-white/10 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                            </div>
                          </div>

                          {/* Project Info */}
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                  {project.name}
                                </h3>
                                {/* Display some stats */}
                                {project.stats && (
                                  <p className="text-primary text-sm">
                                    {Object.values(project.stats)[0]}
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 transition-colors"
                                >
                                  <FiGithub className="w-5 h-5" />
                                </a>
                                {project.demo && (
                                  <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 transition-colors"
                                  >
                                    <FiExternalLink className="w-5 h-5" />
                                  </a>
                                )}
                              </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400">
                              {project.description}
                            </p>

                            {/* Technologies */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <FiCode className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">
                                  Technologies
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies?.frontend?.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-3 py-1 text-xs bg-primary/5 text-primary rounded-full border border-primary/10"
                                  >
                                    {tech}
                                  </span>
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
