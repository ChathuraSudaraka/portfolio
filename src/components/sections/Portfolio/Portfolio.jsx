import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaGithubSquare } from "react-icons/fa";
import { PinContainer } from "../../ui/3d-pin";
import { GradientButton } from "../../ui/gradient-button";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error loading projects:", error));
  }, []);

  return (
    <section className="relative py-20" id="portfolio">
      <div className="container px-4">
        {/* Header */}
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
            <p className="text-sm font-medium text-primary">My Projects</p>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="text-primary">Work</span>
          </h2>

          <a
            href="https://github.com/ChathuraSudaraka"
            className="inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors duration-200"
          >
            <FaGithub className="w-5 h-5 mr-2" />
            <span>View GitHub Profile</span>
          </a>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PinContainer title={project.name}>
                <div className="relative group">
                  <div className="relative bg-white/10 dark:bg-gray-900/30 backdrop-blur-md rounded-xl overflow-hidden">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {project.name}
                      </h3>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {[project.tag1, project.tag2, project.tag3, project.tag4, project.tag5]
                          .filter(tag => tag && !tag.includes("not"))
                          .map((tag, i) => (
                            <span 
                              key={i}
                              className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      <GradientButton
                        onClick={() => window.open(project.link, "_blank")}
                        className="inline-flex items-center gap-2"
                      >
                        View Project
                        <FaGithub className="w-4 h-4" />
                      </GradientButton>
                    </div>
                  </div>
                </div>
              </PinContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
