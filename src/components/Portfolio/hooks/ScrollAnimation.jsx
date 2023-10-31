import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const ScrollAnimation = () => {
  useEffect(() => {
    AOS.init();
  }, []);
};

export default ScrollAnimation;
