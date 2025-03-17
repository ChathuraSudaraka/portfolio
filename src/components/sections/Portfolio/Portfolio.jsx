import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import GradientButton from "../../ui/gradient-button";

const ProjectCard = ({ project, index }) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        duration: 1,
        delay: index * 0.2,
        bounce: 0.3,
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group h-full"
    >
      <motion.div
        className="relative h-full flex flex-col"
        whileHover={{ y: -5, transition: { duration: 0.3 } }}
      >
        <div className="relative bg-gradient-to-b from-white/80 to-white/30 dark:from-gray-900/80 dark:to-gray-900/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Image container */}
          <motion.div
            className="relative h-[180px] sm:h-[200px] lg:h-[220px] w-full overflow-hidden"
            whileHover="hover"
          >
            <motion.div variants={imageVariants} className="absolute inset-0">
              <img
                src={project.image || "/assets/project/project-placeholder.jpg"}
                alt={project.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log(`Image failed to load: ${project.image}`);
                  e.target.src = "/assets/project/project-placeholder.jpg";
                  e.target.onerror = null;
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"
                whileHover={{ opacity: 0.8 }}
              />
            </motion.div>

            {/* Tags */}
            <motion.div
              className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {[project.tag1, project.tag2, project.tag3]
                .filter((tag) => tag && !tag.includes("not"))
                .map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="px-3 py-1 text-xs font-medium bg-black/50 backdrop-blur-sm text-white border border-white/10 rounded-full"
                  >
                    {tag}
                  </motion.span>
                ))}
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 flex flex-col p-4 sm:p-5 lg:p-6 relative z-10">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-1">
              {project.name}
            </h3>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 line-clamp-3 flex-1">
              {project.description}
            </p>

            {/* Action buttons */}
            <div className="flex items-center gap-2 sm:gap-3 mt-auto relative z-20">
              <GradientButton
                asChild
                className="w-full py-2.5 font-medium relative"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.link, "_blank");
                }}
              >
                <span className="flex items-center justify-center gap-2 relative z-10">
                  View Project
                  <FaGithub className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                </span>
              </GradientButton>

              {project.demo && (
                <GradientButton
                  asChild
                  className="w-full py-2.5 font-medium relative"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.demo, "_blank");
                  }}
                >
                  <span className="flex items-center justify-center gap-2 relative">
                    Live Demo
                  </span>
                </GradientButton>
              )}
            </div>
          </div>

          {/* Enhanced hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-white/5 to-transparent dark:from-primary/20 dark:via-gray-800/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-0" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error loading projects:", error));
  }, []);

  return (
    <section className="relative py-12 sm:py-16 lg:py-20" id="portfolio">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-3 py-2 rounded-full mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <p className="text-sm font-medium text-primary">My Projects</p>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="text-primary">Work</span>
          </h2>

          <a
            href="https://github.com/ChathuraSudaraka"
            className="inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors duration:200"
          >
            <FaGithub className="w-5 h-5 mr-2" />
            <span>View GitHub Profile</span>
          </a>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.slice(0, 6).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
