import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

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

// Add this helper function instead of importing wrap from popmotion
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ReviewSlider = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const reviewIndex = wrap(0, reviews.length, page);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    let autoPlayInterval;

    if (isAutoPlaying) {
      autoPlayInterval = setInterval(() => {
        paginate(1);
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    };
  }, [isAutoPlaying, page]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.8
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div 
      className="relative overflow-hidden pb-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Updated Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 z-20">
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="text-black dark:text-white"
        >
          <BsArrowLeftCircleFill className="w-8 h-8 transition-all duration-300 group-hover:text-white" />
        </motion.button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20">
        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="text-black dark:text-white"
        >
          <BsArrowRightCircleFill className="w-8 h-8 transition-all duration-300 group-hover:text-white" />
        </motion.button>
      </div>

      {/* Slider Content with perspective transform */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 200, damping: 30 },
            opacity: { duration: 0.5 },
            rotateY: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="w-full"
        >
          <div className="container mx-auto px-4 py-12">
            <section className="text-center lg:text-left">
              <div className="py-12 md:px-6">
                <div className="container mx-auto xl:px-32">
                  <div className="grid items-center lg:grid-cols-2">
                    {/* Content Side */}
                    <div className="mb-12 lg:mb-0">
                      <motion.div className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] dark:bg-[hsla(0,0%,5%,0.7)] px-6 py-12 shadow-lg backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 md:px-12 lg:-mr-14">
                        {/* Rating Stars */}
                        <div className="flex justify-center lg:justify-start gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <motion.svg
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="w-6 h-6 text-primary"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </motion.svg>
                          ))}
                        </div>

                        <h2 className="mb-4 text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {reviews[reviewIndex].name}
                        </h2>
                        <p className="mb-4 text-lg font-medium text-gray-600 dark:text-gray-300">
                          {reviews[reviewIndex].title}
                        </p>
                        <p className="mb-0 text-gray-500 dark:text-gray-400 leading-relaxed">
                          "{reviews[reviewIndex].description}"
                        </p>
                      </motion.div>
                    </div>

                    {/* Image Side with Fixed Border - Updated */}
                    <div className="lg:mb-0">
                      <motion.div 
                        className="relative"
                        animate={{ rotate: 4 }}
                        whileHover={{ rotate: 0, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Updated Image Container without rotating border */}
                        <div className="relative h-[400px] md:h-[600px]">
                          {/* Static decorative border */}
                          <div className="absolute -inset-4 border-2 border-dashed border-primary/20 rounded-xl -z-10 transform -rotate-2" />
                          
                          {/* Main content container */}
                          <div className="relative h-full rounded-xl overflow-hidden">
                            {/* Glow effect */}
                            <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-xl blur-2xl" />
                            
                            {/* Image wrapper */}
                            <div className="relative h-full rounded-xl overflow-hidden border-8 border-white dark:border-gray-800">
                              <motion.img
                                src={reviews[reviewIndex].imageSrc}
                                alt={`${reviews[reviewIndex].name}'s testimonial`}
                                className="w-full h-full object-cover"
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                              />

                              {/* Gradient overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots with animation */}
      <div className="flex justify-center gap-3 mt-8">
        {reviews.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setPage([index, index - reviewIndex])}
            className="group relative h-3"
          >
            <motion.div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === reviewIndex
                  ? "bg-gradient-to-r from-primary to-secondary scale-125"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.div
              className="absolute inset-0 -z-10 blur-sm bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300"
            />
          </motion.button>
        ))}
      </div>

      {/* Add CSS for perspective */}
      <style>
        {`
          .swiper-pagination-bullet {
            background: var(--swiper-pagination-bullet-inactive-color, #999);
            opacity: var(--swiper-pagination-bullet-inactive-opacity, 0.2);
          }
          .swiper-pagination-bullet-active {
            background: var(--swiper-pagination-color, var(--primary));
            opacity: var(--swiper-pagination-bullet-opacity, 1);
          }
          .hover\\:shine:hover::after {
            animation: shine 1s ease-in-out;
          }
          @keyframes shine {
            from { transform: translateX(-100%); }
            to { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
};

export default ReviewSlider;
