import React from "react";
import { motion } from "framer-motion";
import { FaBootstrap, FaLaravel, FaReact, FaVuejs } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiExpress, SiSpringboot, SiDjango, SiDotnet } from "react-icons/si";
import { PinContainer } from "../../ui/3d-pin";

const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  
  return (
    <div className="absolute inset-0">
      {[...Array(6)].map((_, i) => (
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
        />
      ))}
    </div>
  );
};

const MobileFrameworkCard = ({ framework, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: { 
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      whileHover={{ y: -5 }}
      className="w-full"
    >
      <div className="relative group bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 p-5 sm:p-4">
        {/* Sparkles effect */}
        <div className="absolute inset-0">
          <Sparkles />
        </div>
        
        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 flex items-center gap-3">
          <motion.div
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            className="relative flex-shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-xl blur-xl" />
            <div className="relative w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow-lg">
              <framework.icon className="w-6 h-6" style={{ color: framework.color }} />
            </div>
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-sm font-semibold text-gray-900 dark:text-white truncate"
            >
              {framework.name}
            </motion.h3>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="inline-block px-2 py-0.5 text-xs font-medium text-secondary bg-secondary/10 dark:bg-secondary/20 rounded-full mt-1"
            >
              {framework.category}
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Framework = () => {
  const frameworks = [
    { name: "React", icon: FaReact, color: "#61DAFB", category: "Frontend" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000", category: "Frontend" },
    { name: "Vue.js", icon: FaVuejs, color: "#4FC08D", category: "Frontend" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC", category: "CSS" },
    { name: "Laravel", icon: FaLaravel, color: "#FF2D20", category: "Backend" },
    { name: "Express", icon: SiExpress, color: "#000000", category: "Backend" },
    { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F", category: "Backend" },
    { name: "Django", icon: SiDjango, color: "#092E20", category: "Backend" },
    { name: ".NET", icon: SiDotnet, color: "#512BD4", category: "Backend" },
    { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3", category: "CSS" },
  ];

  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="text-center mb-8 sm:mb-12 lg:mb-16 max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center space-x-2 bg-secondary/10 dark:bg-secondary/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4">
            <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-secondary"></span>
            </span>
            <p className="text-xs sm:text-sm font-medium text-secondary whitespace-nowrap">
              Frameworks & Tools
            </p>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Modern <span className="text-secondary">Technologies</span>
          </h2>
        </motion.div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
        {frameworks.map((framework, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="aspect-[1/1] w-full"
          >
            <PinContainer 
              title={framework.category}
              containerClassName="w-full h-full"
            >
              <div className="relative group h-full w-full">
                <div className="relative bg-white/10 dark:bg-gray-900/30 backdrop-blur-md rounded-xl p-4 h-full w-full flex items-center justify-center border border-gray-200/20 dark:border-gray-700/20">
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="relative w-14 h-14"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-xl" />
                      <div className="relative w-full h-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg">
                        <framework.icon className="w-7 h-7" style={{ color: framework.color }} />
                      </div>
                    </motion.div>

                    <h3 className="text-base font-medium text-center text-gray-900 dark:text-white">
                      {framework.name}
                    </h3>
                  </div>
                </div>
              </div>
            </PinContainer>
          </motion.div>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden space-y-3">
        <div className="grid grid-cols-1 gap-3">
          {frameworks.map((framework, index) => (
            <MobileFrameworkCard 
              key={framework.name} 
              framework={framework} 
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Framework;
