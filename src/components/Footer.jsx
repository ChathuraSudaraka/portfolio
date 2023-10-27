import DarkLight from "./DarkLight";
import logo from "/assets/logo.webp";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-bgShade dark:bg-custom-blue py-20 md:px-12 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20">
        <a href="/">
          <img className="h-10" src={logo} alt="" />
        </a>
        <div className="flex flex-col dark:text-white md:flex-row md:items-center gap-4 flex-wrap">
          <a
            href="#"
            className="block text-primary hover:text-gray-400 py-2 px-4"
          >
            Home
          </a>
          <a href="#" className="block hover:text-gray-400 py-2 px-4">
            Portfolio
          </a>
          <a href="#" className="block  hover:text-gray-400 py-2 px-4">
            About me
          </a>
          <a href="#" className="block  hover:text-gray-400 py-2 px-4">
            Testimonials
          </a>
        </div>
        <div className="flex items-center gap-4 ml-4">
          <a href="https://www.facebook.com/profile.php?id=100071799326093&mibextid=ZbWKwL">
            <FaFacebookF className="cursor-pointer hover:-translate-y-3 transition-all duration-300 text-xl dark:text-white hover:text-primary" />
          </a>
          <FaInstagram className="cursor-pointer hover:-translate-y-3 transition-all duration-300 text-xl dark:text-white hover:text-primary" />
          <FaTwitter className="cursor-pointer hover:-translate-y-3 transition-all duration-300 text-xl dark:text-white hover:text-primary" />
          <FaLinkedin className="cursor-pointer hover:-translate-y-3 transition-all duration-300 text-xl dark:text-white hover:text-primary" />
        </div>
      </div>
      <hr />
      <div className="mt-10 flex flex-col dark:text-white md:flex-row justify-between gap-8">
        <p>Made with 💖 by Chathura</p>
        <div className="space-x-6">
          <a href="/" className="hover:text-slate-400">
            Privacy Policy
          </a>
          <a href="/" className="hover:text-slate-400">
            Terms of Service
          </a>
          <a href="/" className="hover:text-slate-400">
            Cookies Settings
          </a>
        </div>
      </div>
      <div className="mt-5 flex flex-col dark:text-white md:flex-row justify-between gap-5">
        <a
          href="mailto:chathuraoriginal2005@gmail.com"
          className="hover:text-slate-400"
        >
          chathuraoriginal2005@gmail.com
        </a>
        <a href="tel:+94705321516" className="hover:text-slate-400">
          070 532 1516
        </a>
      </div>
    </div>
  );
};

export default Footer;
