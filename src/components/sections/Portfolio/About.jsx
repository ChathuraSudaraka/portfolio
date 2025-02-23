import React from "react";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "../../ui/hover-border-gradient";
import { CardContainer, CardBody, CardItem } from "../../ui/3d-card";
import proPic from "/assets/profile.webp";

const About = () => {
  return (
    <section className="relative min-h-screen" id="about">
      <div className="container px-4 py-20 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4">
              <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-full w-full bg-primary" />
              </span>
              <p className="text-xs sm:text-sm font-medium text-primary">
                About Me
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Know Who <span className="text-primary">I Am</span>
            </h2>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Section - Updated size */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:flex-[1.2] w-full max-w-2xl"
          >
            <CardContainer className="w-full">
              <CardBody className="relative group/card bg-dot-primary/[0.2] border border-gray-200/50 dark:border-gray-800/50 rounded-3xl w-full lg:min-h-[600px]">
                <CardItem translateZ="100" className="w-full h-full">
                  <div className="relative w-full h-full aspect-[4/5] overflow-hidden rounded-2xl">
                    <img
                      src={proPic}
                      alt="Chathura Sudaraka"
                      className="w-full h-full object-cover object-center transform group-hover/card:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>

          {/* Text Content - Adjusted flex */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:flex-1 space-y-6 w-full"
          >
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300">
                I'm Chathura Sudaraka, a dedicated software engineering student
                at JIAT. My journey in the world of technology is a constant
                pursuit of growth and learning.
              </p>

              <p className="text-gray-600 dark:text-gray-300">
                With every line of code I write, my aim is to create a
                meaningful impact. I am currently exploring various domains,
                including web development, data science, and software
                architecture, where I find joy in solving intricate problems and
                turning ideas into reality.
              </p>

              <p className="text-gray-600 dark:text-gray-300">
                Beyond coding, you'll often find me immersed in the beauty of
                nature, savoring a delightful cup of tea, or getting lost in the
                pages of captivating books. My passion for exploring new places
                and embracing diverse cultures fuels my curiosity.
              </p>
            </div>

            <div className="pt-4">
              <HoverBorderGradient className="px-6 py-3 bg-transparent hover:bg-primary/5 text-gray-900 dark:text-white">
                <a
                  href="https://wa.me/+94705321516"
                  className="flex items-center gap-2"
                >
                  Contact Me
                </a>
              </HoverBorderGradient>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
