import React from "react";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "../../ui/hover-border-gradient";
import { CardContainer, CardBody, CardItem } from "../../ui/3d-card";
import proPic from "/assets/profile.webp";

const About = () => {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
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

            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
              Know Who <span className="text-primary">I Am</span>
            </h2>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12 lg:gap-16 xl:gap-20">
          {/* Text Content - Moved above image for mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-6 md:space-y-8"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm Chathura Sudaraka, a dedicated software engineering student
                at JIAT. My journey in the world of technology is a constant
                pursuit of growth and learning.
              </p>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                With every line of code I write, my aim is to create a
                meaningful impact. I am currently exploring various domains,
                including web development, data science, and software
                architecture, where I find joy in solving intricate problems and
                turning ideas into reality.
              </p>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Beyond coding, you'll often find me immersed in the beauty of
                nature, savoring a delightful cup of tea, or getting lost in the
                pages of captivating books. My passion for exploring new places
                and embracing diverse cultures fuels my curiosity.
              </p>
            </div>

            <div className="pt-6 md:pt-8">
              <HoverBorderGradient className="inline-flex px-6 py-3 text-base sm:text-lg">
                <a
                  href="https://wa.me/+94705321516"
                  className="flex items-center gap-2"
                >
                  Contact Me
                </a>
              </HoverBorderGradient>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 max-w-md mx-auto lg:max-w-none"
          >
            <CardContainer className="w-full">
              <CardBody className="relative group/card bg-dot-primary/[0.2] border border-gray-200/50 dark:border-gray-800/50 rounded-3xl">
                <CardItem
                  translateZ="100"
                  className="w-full aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] xl:aspect-[4/5]"
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
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
        </div>
      </div>
    </section>
  );
};

export default About;
