import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebookF } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  const contactInfo = [
    {
      icon: FiMail,
      label: "Email",
      value: "chathurasudaraka@eversoft.lk",
      href: "mailto:chathurasudaraka@eversoft.lk",
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: "+94 70 532 1516",
      href: "tel:+94705321516",
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: "Colombo, Sri Lanka",
      href: "https://maps.google.com",
    },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/ChathuraSudaraka",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/chathura-sudaraka",
    },
    {
      icon: FaTwitter,
      href: "https://x.com/CSudaraka78686",
    },
    {
      icon: FaFacebookF,
      href: "https://facebook.com/YourFacebookUsername",
    },
  ];

  return (
    <footer className="relative pt-40">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/50 to-gray-100/80 dark:via-gray-900/50 dark:to-gray-900/80 pointer-events-none" />

      {/* Newsletter Section */}
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 lg:p-10 -mt-20"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Let's Connect and <span className="text-primary">Create</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Join me in building innovative solutions and exploring new
                opportunities.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-start md:justify-end">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 text-dark dark:text-white transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 mt-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <img src="/assets/logo.webp" alt="Logo" className="h-8" />
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Crafting innovative digital solutions with cutting-edge
              technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              {["Home", "About", "Portfolio", "Contact"].map((item, index) => (
                <ScrollLink
                  key={index}
                  to={item.toLowerCase()}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm cursor-pointer"
                >
                  {item}
                </ScrollLink>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Contact
            </h4>
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.value}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Legal
            </h4>
            <nav className="flex flex-col space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
                (item, index) => (
                  <RouterLink
                    key={index}
                    to={`/legal/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </RouterLink>
                )
              )}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>© {new Date().getFullYear()} All rights reserved.</p>
            <p>
              Made with <span className="text-red-500">❤️</span> by{" "}
              <span className="text-primary">Chathura Sudaraka</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
