import React from "react";
import { motion } from "framer-motion";
import { Timeline } from "../../ui/timeline";
import { FiGithub, FiExternalLink, FiCode } from "react-icons/fi";

const Work = () => {
  const timelineData = [
    {
      year: "2024",
      projects: [
        {
          title: "Portfolio Website",
          duration: "Jan 2024 - Present",
          role: "Full Stack Developer",
          description: "Modern personal portfolio featuring 3D animations, interactive elements, and responsive design.",
          tech: ["React", "TailwindCSS", "Framer Motion", "Vite"],
          links: {
            github: "https://github.com/yourusername/portfolio",
            live: "https://yourportfolio.com"
          },
          image: "/assets/projects/portfolio.webp"
        },
        {
          title: "E-Commerce Dashboard",
          duration: "Feb 2024 - Mar 2024",
          role: "Frontend Developer",
          description: "Feature-rich admin dashboard with real-time analytics and inventory management system.",
          tech: ["React", "Redux", "Material UI", "Chart.js"],
          links: {
            github: "https://github.com/yourusername/admin-dashboard",
            live: "https://dashboard.demo.com"
          },
          image: "/assets/projects/dashboard.webp"
        }
      ]
    },
    {
      year: "2023",
      projects: [
        {
          title: "Social Media App",
          duration: "Oct 2023 - Dec 2023",
          role: "Full Stack Developer",
          description: "Modern social platform with real-time messaging, post sharing, and user interactions.",
          tech: ["React", "Firebase", "Tailwind", "TypeScript"],
          links: {
            github: "https://github.com/yourusername/social-app",
            live: "https://social.demo.com"
          },
          image: "/assets/projects/social.webp"
        },
        {
          title: "Weather Application",
          duration: "Aug 2023 - Sep 2023",
          role: "Frontend Developer",
          description: "Weather forecast application with location-based updates and interactive maps.",
          tech: ["React", "Weather API", "Leaflet", "TailwindCSS"],
          links: {
            github: "https://github.com/yourusername/weather-app",
            live: "https://weather.demo.com"
          },
          image: "/assets/projects/weather.webp"
        }
      ]
    },
    {
      year: "2022",
      projects: [
        {
          title: "Task Manager",
          duration: "Nov 2022 - Dec 2022",
          role: "Frontend Developer",
          description: "Intuitive task management application with drag-and-drop functionality and team collaboration features.",
          tech: ["React", "DnD Kit", "Redux", "Styled Components"],
          links: {
            github: "https://github.com/yourusername/task-manager",
            live: "https://tasks.demo.com"
          },
          image: "/assets/projects/tasks.webp"
        },
        {
          title: "Personal Blog",
          duration: "Sep 2022 - Oct 2022",
          role: "Full Stack Developer",
          description: "Feature-rich blogging platform with markdown support and dynamic theming.",
          tech: ["React", "MDX", "TailwindCSS", "Next.js"],
          links: {
            github: "https://github.com/yourusername/blog",
            live: "https://blog.demo.com"
          },
          image: "/assets/projects/blog.webp"
        }
      ]
    }
  ];

  return (
    <section className="relative py-20 lg:py-32" id="work">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] top-1/4 -right-1/4 bg-primary/10 rounded-full mix-blend-multiply blur-3xl animate-blob" />
        <div className="absolute w-[500px] h-[500px] -bottom-1/4 -left-1/4 bg-secondary/10 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm font-medium text-primary">Experience</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              My Professional <span className="text-primary">Journey</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A timeline of my professional growth and key achievements in software development
            </p>
          </motion.div>
        </div>

        {/* Timeline wrapper with improved spacing */}
        <div className="mt-16 lg:mt-24">
          <Timeline
            data={timelineData.map((year) => ({
              title: year.year,
              content: (
                <div className="space-y-8">
                  {year.projects.map((project, index) => (
                    <motion.div
                      key={project.title}
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
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                            
                            {/* Duration Badge */}
                            <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                              <span className="text-xs text-white">{project.duration}</span>
                            </div>
                          </div>

                          {/* Project Info */}
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                  {project.title}
                                </h3>
                                <p className="text-primary">{project.role}</p>
                              </div>
                              <div className="flex gap-2">
                                {project.links.github && (
                                  <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 transition-colors"
                                  >
                                    <FiGithub className="w-5 h-5" />
                                  </a>
                                )}
                                {project.links.live && (
                                  <a
                                    href={project.links.live}
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

                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <FiCode className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">Technologies</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
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
