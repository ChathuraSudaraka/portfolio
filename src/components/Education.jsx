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
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl">{type}</h3>
        <span className="capitalize font-medium text-black/75">
          {time} | {place}
        </span>
        <p className="font-medium w-full">{info}</p>
      </motion.div>
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
    <div className="lg:mx-12 mx-4 my-32" id="education">
      <div className="mb-20 flex flex-col sm:flex-row md:items-center justify-between gap-5">
        <div>
          <p className="text-xl text-headingcolor font-semibold mb-5">
            My Skills
          </p>
          <h2 className="md:text-5xl text-4xl text-headingcolor font-bold">
            Education
          </h2>
        </div>
      </div>

      <div ref={ref} className="rounded-md shadow-lg pb-8 bg-bgShade w-[95%] mx-auto relative">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-black origin-top"
        />

        <ul className="w-full flex flex-col items-start justify-between ml-4">
          <Details
            type={"Bachelor Of Science (BSc) In Software Engineering"}
            time={"2022-2026"}
            place={"Java institute htmlFor Advance Technology"}
            info={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."}
          />
          <Details
            type={"Bachelor Of Science (BSc) In Software Engineering"}
            time={"2022-2026"}
            place={"Java institute htmlFor Advance Technology"}
            info={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."}
          />
          <Details
            type={"Bachelor Of Science (BSc) In Software Engineering"}
            time={"2022-2026"}
            place={"Java institute htmlFor Advance Technology"}
            info={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."}
          />
        </ul>
      </div>
    </div>
  );
};

export default Education;
