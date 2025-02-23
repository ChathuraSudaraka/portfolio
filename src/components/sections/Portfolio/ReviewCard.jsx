import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Ashley Emmanuel",
    title: "Manager",
    description:
      "I hired the software engineer for a critical project, and I'm extremely satisfied with the results. The engineer demonstrated exceptional problem-solving skills and delivered high-quality code within the deadline. I highly recommend their services.",
    imageSrc: "/assets/testimonials/testimonials-1.webp",
  },
  {
    id: 3,
    name: "Robert Hines",
    title: "Entrepreneur",
    description:
      "I can't express how impressed I am with the software engineer's work. They provided an innovative solution that not only met our requirements but also exceeded our expectations. Their commitment to the project and attention to detail is commendable.",
    imageSrc: "/assets/testimonials/testimonials-2.webp",
  },
  {
    id: 2,
    name: "Emily Smith",
    title: "Graphic Designer",
    description:
      "This software engineer is simply outstanding. They are not only technically skilled but also great at understanding the business context of our project. Their communication was top-notch, and they delivered a flawless solution. Highly recommended!",
    imageSrc: "/assets/testimonials/testimonials-3.webp",
  },
  {
    id: 4,
    name: "Daniel Russell",
    title: "Marketing Manager",
    description:
      "Working with this software engineer was a delight. They were responsive, professional, and highly skilled. Our project was completed on time, and the final product was of exceptional quality. I wouldn't hesitate to hire them again.",
    imageSrc: "/assets/testimonials/testimonials-4.webp",
  },
  {
    id: 5,
    name: "Lisa Kenady",
    title: "Quality Assurance Engineer",
    description:
      "Our experience with this software engineer was fantastic. They not only developed excellent code but also provided clear explanations for the non-technical team members. Their patience and willingness to teach were greatly appreciated.",
    imageSrc: "/assets/testimonials/testimonials-5.webp",
  },
  // Add more review objects as needed
];

const CustomerReviewsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true, // Show the left/right navigation buttons by default
    responsive: [
      {
        breakpoint: 768, // Set a breakpoint suitable for mobile screens
        settings: {
          arrows: false, // Hide the left/right navigation buttons on mobile screens
          dots: true,
          autoplay: true,
          autoplaySpeed: 4000,
          pauseOnHover: true,
        },
      },
    ],
  };

  const slideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } },
  };

  return (
    <Slider {...settings}>
      {reviews.map((review) => (
        <motion.div
          key={review.id}
          initial="hidden"
          animate="visible"
          variants={slideVariants}
          className="container mx-auto md:px-6"
        >
          <section className="text-center lg:text-left">
            <div className="py-8 md:py-12 md:px-6">
              <div className="container mx-auto xl:px-32">
                <div className="grid items-center lg:grid-cols-2">
                  <div className="mb-8 md:mt-8 lg:mt-0 lg:mb-0">
                    <motion.div
                      variants={textVariants}
                      className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-4 py-6 md:py-8 shadow-lg backdrop-blur-[20px] border border-bgShade dark:border-border-color dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:px-8 lg:-mr-12"
                    >
                      <h2 className="mb-2 text-xl md:text-2xl font-bold text-primary dark:text-primary-400">
                        {review.name}
                      </h2>
                      <p className="mb-2 text-sm md:text-base font-semibold dark:text-gray-200">
                        {review.title}
                      </p>
                      <p className="mb-4 text-sm md:text-base text-neutral-500 dark:text-neutral-300 leading-relaxed">
                        {review.description}
                      </p>
                      <ul className="flex justify-center lg:justify-start gap-1">
                        {[...Array(5)].map((_, index) => (
                          <li key={index}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 96 960 960"
                              className="w-4 text-primary dark:text-primary-400"
                            >
                              <path
                                fill="currentColor"
                                d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                              />
                            </svg>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                  <motion.div
                    variants={imageVariants}
                    className="md:mb-8 lg:mb-0"
                  >
                    <div className="relative">
                      <div className="w-24 h-24 mx-auto md:w-auto md:h-auto lg:rotate-[6deg] lg:max-w-md">
                        <img
                          src={review.imageSrc}
                          className="w-full h-full rounded-full md:rounded-lg object-cover shadow-lg border-2 border-primary/20 md:border-0"
                          alt={`${review.name}'s testimonial`}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      ))}
    </Slider>
  );
};

export default CustomerReviewsSlider;
