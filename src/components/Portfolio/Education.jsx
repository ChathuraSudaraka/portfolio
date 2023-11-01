import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcon";

const Details = ({ type, place, time, info }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first-mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between"
    >
      <LiIcon reference={ref} />
      <div data-aos="fade-up" data-aos-offset="150">
        <h3 className="capitalize font-bold text-2xl dark:text-white">
          {type}
        </h3>
        <span className="capitalize font-medium text-black/75 dark:text-dark-white">
          {time} | {place}
        </span>
        <p className="font-medium w-full dark:text-gray-300">{info}</p>
      </div>
    </li>
  );
};

const Education = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (
    <div className="dark:bg-custom-blue">
      <div className="lg:mx-12 mx-4 py-32" id="education">
        <div className="mb-20">
          <p className="text-xl text-headingcolor dark:text-white font-semibold mb-5">
            My Skills
          </p>
          <h2 className="md:text-5xl text-4xl text-headingcolor dark:text-white font-bold">
            My Education
          </h2>
        </div>

        <div
          ref={ref}
          className="rounded-md shadow-lg pb-8 border border-bgShade dark:border-border-color dark:bg-custom-dark-blue bg-bgShade mx-auto relative"
          data-aos="fade-up"
          data-aos-offset="150"
        >
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-9 top-0 w-[4px] h-full dark:bg-white bg-black origin-top"
          />

          <ul className="w-full flex flex-col items-start justify-between ml-4">
            <Details
              type={"Bachelor Of Science (BSc) In Software Engineering"}
              time={"2022-2026"}
              place={"Java institute For Advance Technology"}
              info={
                "The Java Institute for Advanced Technology is a prominent research-oriented higher education institution based in Sri Lanka, fostering innovation and excellence."
              }
            />
            <Details
              type={"Diploma In Information Technology (DIT)"}
              time={"2022-2023"}
              place={"ESOFT Metro Campus"}
              info={
                "With roots going back to the year 2000, ESOFT has grown to be the largest private sector higher education network in Sri Lanka"
              }
            />
            <Details
              type={"Diploma In English (DIE)"}
              time={"2022-2023"}
              place={"ESOFT Metro Campus"}
              info={
                "With roots going back to the year 2000, ESOFT has grown to be the largest private sector higher education network in Sri Lanka"
              }
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Education;
