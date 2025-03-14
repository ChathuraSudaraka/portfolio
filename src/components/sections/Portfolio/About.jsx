import React from "react";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "../../ui/hover-border-gradient";
import proPic from "/assets/profile.webp";

const About = () => {
  const skillCategories = [
    {
      title: "Other Skills",
      skills: [
        "UI/UX Design",
        "Project Management",
        "Team Collaboration",
        "Problem Solving",
      ],
      icon: "🎯",
      gradient: "from-green-500/20 to-emerald-500/20",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden" id="about">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
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
                About Me
              </p>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-headingcolor dark:text-white mb-4">
              Know Who <span className="text-primary">I Am</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto">
              Learn about my journey, passions, and what drives me in the world
              of technology
            </p>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Image & Stats */}
          <div className="relative order-2 lg:order-1">
            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-primary/5 to-secondary/5 p-1"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                <img
                  src={proPic}
                  alt="Chathura Sudaraka"
                  className="object-cover w-full h-full scale-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />

                {/* Floating Tags */}
                <div className="absolute top-4 left-4 right-4 flex justify-between gap-4">
                  <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                    <span className="text-sm text-white font-medium">
                      Software Engineer
                    </span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                    <span className="text-sm text-white font-medium">2024</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Title */}
              <div>
                <h3 className="text-2xl lg:text-3xl text-gray-900 dark:text-white font-bold mb-2">
                  Passionate Expert
                </h3>
                <p className="text-primary font-medium">Software Development</p>
              </div>

              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p className="relative">
                  <span className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-primary/50 to-secondary/50 rounded-full" />
                  Hello! I'm Chathura, a passionate software developer with a
                  keen interest in building innovative digital solutions that
                  make a difference.
                </p>
                <p className="relative">
                  <span className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-primary/50 to-secondary/50 rounded-full" />
                  I specialize in full-stack development, with expertise in
                  modern web technologies and cloud platforms. My approach
                  combines technical excellence with creative problem-solving to
                  deliver robust and scalable solutions.
                </p>
                <p className="relative">
                  <span className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-primary/50 to-secondary/50 rounded-full" />
                  When I'm not coding, I enjoy exploring new technologies,
                  contributing to open-source projects, and sharing knowledge
                  with the developer community. I believe in continuous learning
                  and staying updated with industry trends.
                </p>
                <p className="relative">
                  <span className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-primary/50 to-secondary/50 rounded-full" />
                  Gaming is another passion of mine - I find it both
                  entertaining and inspiring for creative problem-solving
                  approaches in software development.
                </p>
              </div>

              {/* New Skills Section replacing Stats */}
              <div className="space-y-6">
                {skillCategories.map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-all duration-300`}
                    />
                    <div className="relative bg-white/50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 hover:border-primary/50 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{category.icon}</span>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {category.title}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: skillIndex * 0.05 }}
                            className="px-3 py-1 text-sm bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white rounded-full border border-gray-200/50 dark:border-gray-700/50"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6">
                <HoverBorderGradient className="px-6 py-3 bg-transparent hover:bg-primary/5 text-gray-900 dark:text-white">
                  <a
                    href="https://wa.me/+94705321516"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2"
                  >
                    Contact Me
                  </a>
                </HoverBorderGradient>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
