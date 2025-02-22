// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import ReviewCard from './ReviewCard';

const Testimonial = () => {
  return (
    <div className="lg:px-12 px-4 py-32" id='testimonials'>
      <div className="mb-20">
        <p className="text-xl dark:text-white text-headingcolor font-semibold mb-5">
          Clients Feedback
        </p>
        <h2 className="md:text-5xl text-4xl dark:text-white text-headingcolor font-bold">
          Customer testimonials
        </h2>
      </div>

      {/* reviews */}
      <div>
           <ReviewCard/>
      </div>
    </div>
  );
};

export default Testimonial;
