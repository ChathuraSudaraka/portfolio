import ReviewSlider from "./ReviewCard";

const Testimonial = () => {
  return (
    <section className="relative min-h-screen py-20" id="testimonial">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-3 py-2 rounded-full mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <p className="text-sm font-medium text-primary">Client Reviews</p>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Customer <span className="text-primary">Testimonials</span>
          </h2>
        </div>

        <ReviewSlider />
      </div>
    </section>
  );
};

export default Testimonial;
