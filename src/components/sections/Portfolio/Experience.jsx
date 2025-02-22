import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcon";

const Details = ({
  position,
  company,
  companyLink,
  time,
  address,
  work,
  scrollYProgress,
}) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      className="my-8 first-mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between"
    >
      <LiIcon reference={ref} scrollYProgress={scrollYProgress} />
      <div data-aos="fade-up" data-aos-offset="150">
        <h3 className="capitalize font-bold text-2xl dark:text-white">
          {position}&nbsp;
          <a
            href={companyLink}
            target="_blank"
            className="text-primary capitalize"
          >
            @{company}
          </a>
        </h3>
        <span className="capitalize font-medium dark:text-dark-white text-black/75">
          {time} | {address}
        </span>
        <p className="font-medium w-full dark:text-gray-300 text-justify">
          {work}
        </p>
      </div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (
    <div className="">
      <div className="lg:mx-12 mx-4 py-32" id="experience">
        <div className="mb-20">
          <p className="text-xl text-headingcolor dark:text-white font-semibold mb-5">
            My Skills
          </p>
          <h2 className="md:text-5xl text-4xl text-headingcolor dark:text-white font-bold">
            My Experience
          </h2>
        </div>

        <div
          ref={ref}
          className="rounded-md shadow-lg pb-8 border border-bgShade dark:border-border-color dark:bg-custom-dark-blue bg-bgcom mx-auto relative"
          data-aos="fade-up"
          data-aos-offset="150"
        >
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-9 top-0 w-[4px] h-full dark:bg-white bg-black origin-top"
          />

          <ul className="w-full flex flex-col items-start justify-between ml-4">
            <Details
              position={"Software Engineer"}
              company={"Eversoft IT Solutions"}
              companyLink={"https://eversoft.lk"}
              time={"2022-Present"}
              address={"Colombo, Sri Lanka"}
              work={
                "Eversoft IT Solutions: Creative, efficient, reliable. Your innovation partner for a transformed digital future through trusted collaboration."
              }
              scrollYProgress={scrollYProgress} // Pass scrollYProgress as a prop
            />
            <Details
              position={"Software Engineer"}
              company={"Eversoft IT Solutions"}
              companyLink={"https://eversoft.lk"}
              time={"2022-Present"}
              address={"Colombo, Sri Lanka"}
              work={
                "As a software engineer, I orchestrate system creation while embracing perpetual learning and innovation in this ever-evolving industry."
              }
              scrollYProgress={scrollYProgress} // Pass scrollYProgress as a prop
            />
            <Details
              position={"Software Engineer"}
              company={"Eversoft IT Solutions"}
              companyLink={"https://eversoft.lk"}
              time={"2022-Present"}
              address={"Colombo, Sri Lanka"}
              work={
                "I design versatile software solutions for libraries, schools, restaurants, and efficient Point of Sale systems, adapting to diverse industry needs."
              }
              scrollYProgress={scrollYProgress} // Pass scrollYProgress as a prop
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;
