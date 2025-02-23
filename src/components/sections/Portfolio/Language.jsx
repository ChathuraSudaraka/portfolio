import React from "react";
import { motion } from "framer-motion";
import { DiJavascript, DiPython, DiJava, DiPhp } from "react-icons/di";
import { SiCsharp, SiTypescript } from "react-icons/si";

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
        />
      ))}
    </div>
  );
};

const Language = () => {
  const skills = [
    { name: "JavaScript", percent: 85, icon: DiJavascript, color: "#F0DB4F", darkColor: "#B3A43B" },
    { name: "TypeScript", percent: 80, icon: SiTypescript, color: "#3178C6", darkColor: "#235A9E" },
    { name: "Python", percent: 75, icon: DiPython, color: "#306998", darkColor: "#235179" },
    { name: "Java", percent: 70, icon: DiJava, color: "#B07219", darkColor: "#945D14" },
    { name: "C#", percent: 65, icon: SiCsharp, color: "#9B4F96", darkColor: "#7A3F77" },
    { name: "PHP", percent: 80, icon: DiPhp, color: "#777BB4", darkColor: "#5F6290" },
  ];

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

  const progressVariants = {
    hidden: { width: 0 },
    visible: (percent) => ({
      width: `${percent}%`,
      transition: {
        duration: 1,
        ease: "easeInOut",
        delay: 0.5
      }
    })
  };

  return (
    <div className="mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
            whileHover={{ y: -5 }}
          >
            <div className="relative group bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 p-6 overflow-hidden">
              {/* Always visible Sparkles */}
              <div className="absolute inset-0">
                <Sparkles />
              </div>
              
              {/* Add hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Existing content */}
              <div className="relative z-10 flex items-center gap-6">
                <motion.div
                  className="relative"
                  variants={iconVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-xl blur-xl" />
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white dark:bg-gray-900 shadow-lg relative">
                    <skill.icon className="w-8 h-8" style={{ color: skill.color }} />
                  </div>
                </motion.div>
                
                <div className="flex-1 space-y-3">
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 dark:text-white"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {skill.name}
                  </motion.h3>
                  <div className="relative h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      variants={progressVariants}
                      initial="hidden"
                      whileInView="visible"
                      custom={skill.percent}
                      className="absolute h-full rounded-full bg-gradient-to-r from-primary via-primary/80 to-primary"
                    />
                  </div>
                  <motion.p 
                    className="text-sm text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    Proficiency: {skill.percent}%
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Language;