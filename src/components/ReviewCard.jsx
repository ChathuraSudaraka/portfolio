import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Anna Doe",
    title: "Graphic Designer",
    description:
      "Nunc tincidunt vulputate elit. Mauris varius purus malesuada neque iaculis malesuada. Aenean gravida magna orci, non efficitur est porta id. Donec magna diam.",
    imageSrc: "https://mdbcdn.b-cdn.net/img/new/ecommerce/vertical/080.jpg",
  },
  {
    id: 2,
    name: "Anna Doe",
    title: "Graphic Designer",
    description:
      "Nunc tincidunt vulputate elit. Mauris varius purus malesuada neque iaculis malesuada. Aenean gravida magna orci, non efficitur est porta id. Donec magna diam.",
    imageSrc:
      "https://images.unsplash.com/photo-1689803753214-86d52624b838?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  },
  {
    id: 3,
    name: "Jhone Doe",
    title: "Graphic Designer",
    description:
      "Nunc tincidunt vulputate elit. Mauris varius purus malesuada neque iaculis malesuada. Aenean gravida magna orci, non efficitur est porta id. Donec magna diam.",
    imageSrc:
      "https://images.unsplash.com/photo-1660936764409-4da65828b4f8?ixlib=rb-4.0.3&ixid=M3xwMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&w=1000&q=80",
  },
  {
    id: 4,
    name: "Jhone Doe",
    title: "Graphic Designer",
    description:
      "Nunc tincidunt vulputate elit. Mauris varius purus malesuada neque iaculis malesuada. Aenean gravida magna orci, non efficitur est porta id. Donec magna diam.",
    imageSrc:
      "https://images.unsplash.com/photo-1660936764409-4da65828b4f8?ixlib=rb-4.0.3&ixid=M3xwMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&w=1000&q=80",
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
            <div className="py-12 md:px-6 md:px-12">
              <div className="container mx-auto xl:px-32">
                <div className="flex grid items-center lg:grid-cols-2">
                  <div className="mb-8 md:mt-8 lg:mt-0 lg:mb-0">
                    <motion.div
                      variants={textVariants}
                      className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-4 py-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[20px] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:px-8 lg:-mr-12"
                    >
                      <h2 className="mb-2 text-2xl font-bold text-primary dark:text-primary-400">
                        {review.name}
                      </h2>
                      <p className="mb-2 font-semibold">{review.title}</p>
                      <p className="mb-4 text-neutral-500 dark:text-neutral-300">
                        {review.description}
                      </p>
                      <ul className="flex justify-center lg:justify-start">
                        <li>
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
                        {/* Add other list items */}
                      </ul>
                    </motion.div>
                  </div>
                  <motion.div
                    variants={imageVariants}
                    className={`md:mb-8 lg:mb-0 ${
                      window.innerWidth <= 768
                        ? "mobile-image flex justify-center items-center"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-16 h-16 lg:w-auto lg:h-auto rounded-full shadow-lg dark:shadow-black/20 ${
                        window.innerWidth <= 768
                          ? "mobile-circular-image"
                          : "lg:rotate-[6deg] lg:max-w-md"
                      }`}
                    >
                      <img
                        src={review.imageSrc}
                        className="w-full h-full rounded-lg object-cover"
                        alt="image"
                      />
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
