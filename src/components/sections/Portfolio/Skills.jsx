"use client";
import { motion } from "framer-motion";
import React from "react";
import { cn } from "../../../utils/cn";
import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiAwslambda,
} from "react-icons/si";

const TechStack = [
  {
    id: 1,
    title: "Frontend Development",
    description:
      "Building modern web applications with React, Next.js, and TypeScript",
    icon: SiReact,
    iconColor: "text-blue-500",
  },
  {
    id: 2,
    title: "Backend Engineering",
    description:
      "Creating robust APIs and services with Node.js and Spring Boot",
    icon: SiNodedotjs,
    iconColor: "text-green-500",
  },
  {
    id: 3,
    title: "Cloud & DevOps",
    description: "Deploying and managing applications on AWS with Docker",
    icon: SiAwslambda,
    iconColor: "text-yellow-500",
  },
  {
    id: 4,
    title: "Database Design",
    description:
      "Designing efficient database structures with PostgreSQL and MongoDB",
    icon: SiPostgresql,
    iconColor: "text-blue-400",
  },
];

const Card = ({ className, children, skill }) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800",
        "bg-white dark:bg-black group hover:shadow-xl h-[250px]", // Increased height
        "transition-all duration-300 hover:-translate-y-2",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0">
        <Sparkles />
      </div>
      <div className="relative p-8 flex flex-col">
        {" "}
        {/* Increased padding */}
        <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-gray-900 group-hover:scale-110 transition-transform duration-300">
          {/* Increased icon size */}
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-semibold text-headingcolor dark:text-white mt-6" // Increased text size and spacing
        >
          {skill.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-base text-gray-600 dark:text-gray-300 mt-4 line-clamp-3" // Increased text size and line clamp
        >
          {skill.description}
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
};

export function Skills() {
  return (
    <div className="relative min-h-screen py-20" id="skills">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <p className="text-sm font-medium text-primary">My Skills</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-headingcolor dark:text-white">
              Technical <span className="text-primary">Expertise</span>
            </h2>
          </motion.div>
        </div>
        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* Changed to 2 columns */}
          {TechStack.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
            >
              <Card skill={skill}>
                <skill.icon className={cn("h-10 w-10", skill.iconColor)} />{" "}
                {/* Increased icon size */}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
        ></motion.span>
      ))}
    </div>
  );
};

export default Skills;
