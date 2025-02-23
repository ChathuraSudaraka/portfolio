import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiArrowRight } from "react-icons/fi";
import { CardContainer, CardBody, CardItem } from "../../ui/3d-card";
import { HoverBorderGradient } from "../../ui/hover-border-gradient";
import banner from "/assets/banner.webp";
import pdf from "/assets/file/dummy.pdf";

const Home = () => {
  const handleViewPdf = () => {
    window.open(pdf, "_blank");
  };

  return (
    <section className="relative py-20" id="home">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-x-20">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            {/* Header Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Status Badge */}
              <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <p className="text-sm font-medium text-primary">Open to work</p>
              </div>

              {/* Main Title */}
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                  Hi, I'm <span className="text-primary">Chathura Sudaraka</span>
                </h1>
                <h2 className="text-3xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
                  Full Stack Developer
                </h2>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
                Crafting innovative digital solutions with cutting-edge technologies.
                Specializing in full-stack development and cloud architecture.
              </p>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4"
            >
              <HoverBorderGradient
                onClick={handleViewPdf}
                className="px-6 py-3 bg-transparent hover:bg-primary/5 text-gray-900 dark:text-white"
              >
                <span className="flex items-center gap-2">
                  Download CV <FiArrowRight className="text-lg" />
                </span>
              </HoverBorderGradient>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {[
                  { icon: FiGithub, href: "#", label: "GitHub" },
                  { icon: FiLinkedin, href: "#", label: "LinkedIn" },
                  { icon: FiTwitter, href: "#", label: "Twitter" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5 text-black dark:text-white" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { value: "5+", label: "Years of Experience" },
                { value: "50+", label: "Projects Completed" },
                { value: "20+", label: "Technologies" }
              ].map((stat, index) => (
                <div key={index} className="text-center space-y-1">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:flex-[1.2] mt-10 lg:mt-0"
          >
            <CardContainer className="w-full">
              <CardBody className="relative group/card bg-dot-primary/[0.2] border border-gray-200/50 dark:border-gray-800/50 rounded-3xl w-full lg:min-h-[600px]">
                <CardItem translateZ="100" className="w-full h-full">
                  <div className="relative w-full h-full aspect-[3/4] overflow-hidden rounded-2xl">
                    <img 
                      src={banner} 
                      alt="Chathura Sudaraka"
                      className="w-full h-full object-cover object-center transform group-hover/card:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </CardItem>
                <CardItem
                  translateZ="50"
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="bg-white/65 dark:bg-black/85 border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-2xl font-semibold text-primary">Full Stack Engineer</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                      MERN Stack • Cloud Native • DevOps
                    </p>
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

export default Home;
