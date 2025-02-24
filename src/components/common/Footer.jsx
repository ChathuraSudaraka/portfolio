import { useEffect, useState } from "react";
import { FaFacebookF, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false); // Define isSticky state

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/ChathuraSudaraka",
      label: "GitHub",
      className: "hover:text-[#2b3137] dark:hover:text-white",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/chathura-sudaraka-45413928b",
      label: "LinkedIn",
      className: "hover:text-[#0077b5]",
    },
    {
      icon: FaTwitter,
      href: "#",
      label: "Twitter",
      className: "hover:text-[#1DA1F2]",
    },
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/profile.php?id=100071799326093",
      label: "Facebook",
      className: "hover:text-[#4267B2]",
    },
  ];

  const navigationLinks = [
    { to: "home", label: "Home", offset: -100 },
    { to: "portfolio", label: "Portfolio", offset: 10 },
    { to: "about", label: "About me", offset: -50 },
    { to: "testimonial", label: "Testimonials", offset: 10 },
  ];

  const legalLinks = [
    { to: "/privacy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms of Service" },
    { to: "/cookies", label: "Cookie Settings" }
  ];

  // Only show navigation links on main pages
  const isLegalPage = location.pathname.includes('/legal/');

  return (
    <footer className="relative">
      {/* Background with blur */}
      <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-xl -z-10" />

      {/* Main Footer Content */}
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.img
              src="/assets/logo.webp"
              alt="Logo"
              className="h-10"
              whileHover={{ scale: 1.05 }}
            />
            <p className="text-gray-600 dark:text-gray-400 max-w-xs">
              Crafting innovative digital solutions with cutting-edge
              technologies.
            </p>

            {/* Social Links - Updated Style */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-lg
                    hover:bg-gray-200 dark:hover:bg-gray-700 
                    transition-all duration-300 ${social.className}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 text-black dark:text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links - Using ScrollLink */}
          {!isLegalPage && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navigationLinks.map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <ScrollLink
                      to={link.to}
                      spy={true}
                      smooth={true}
                      offset={link.offset}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary cursor-pointer"
                    >
                      {link.label}
                    </ScrollLink>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Contact
            </h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }}>
                <a
                  href="mailto:chathurasudaraka@eversoft.lk"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  chathurasudaraka@eversoft.lk
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a
                  href="tel:+94705321516"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  +94 70 532 1516
                </a>
              </motion.li>
            </ul>
          </div>

          {/* Legal Links - Using RouterLink */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Legal
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <RouterLink
                    to={item.to}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                  >
                    {item.label}
                  </RouterLink>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400">
              Made with <span className="text-primary">❤️</span> by Chathura
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
