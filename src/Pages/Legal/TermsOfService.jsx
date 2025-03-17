import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LegalLayout from "../../components/Layouts/LegalLayout";
import HoverBorderGradient from "../../components/ui/hover-border-gradient";

const TermsOfService = () => {
  useEffect(() => {
    document.title = "Terms of Service - Chathura Sudaraka";
  }, []);
  const sections = [
    {
      title: "1. Portfolio Access",
      content: "By accessing my portfolio, you agree to these terms and conditions:",
      subsections: [
        "The portfolio content is for informational purposes only",
        "You may not scrape or automatically collect any content",
        "Access may be temporarily restricted for maintenance"
      ]
    },
    {
      title: "2. Intellectual Property",
      content: "All portfolio content is protected by intellectual property rights:",
      subsections: [
        "Code samples are provided under MIT License",
        "Project screenshots and designs require explicit permission for use",
        "Portfolio design and layout are copyrighted material"
      ]
    },
    {
      title: "3. Project Showcases",
      content: "Regarding the projects displayed in my portfolio:",
      subsections: [
        "Some projects may be subject to NDAs or client confidentiality",
        "External project links may be subject to different terms",
        "Project technologies and specifications may change over time"
      ]
    },
    {
      title: "4. User Conduct",
      content: "When interacting with my portfolio, you agree to:",
      subsections: [
        "Provide accurate information in communications",
        "Not attempt to breach portfolio security",
        "Use project demos and examples responsibly"
      ]
    },
    {
      title: "5. Liability",
      content: "Limitations of liability for portfolio use:",
      subsections: [
        "Code samples and tutorials are provided 'as is'",
        "No guarantee for external link availability",
        "Not responsible for implementation outcomes"
      ]
    }
  ];

  return (
    <LegalLayout>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-20 relative">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 px-4 py-2 rounded-full mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-primary to-secondary" />
                </span>
                <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Portfolio Terms
                </p>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Terms of <span className="text-primary">Service</span>
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Guidelines for using and interacting with my portfolio
              </p>
            </motion.div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/50 dark:bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 dark:border-gray-800/50 shadow-lg"
            >
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="mb-10 last:mb-0"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {section.content}
                  </p>
                  <ul className="space-y-2 pl-6">
                    {section.subsections.map((subsection, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + (index * 0.1) + (idx * 0.05) }}
                        className="text-gray-600 dark:text-gray-400 list-disc"
                      >
                        {subsection}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              {/* Navigation with alternative links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center"
              >
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Thank you for reviewing these terms. Learn more about us:
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <HoverBorderGradient
                    as={Link}
                    to="/legal/privacy-policy"
                    className="px-6 py-3 bg-transparent hover:bg-primary/5 text-gray-900 dark:text-white"
                  >
                    Privacy Policy
                  </HoverBorderGradient>
                  <HoverBorderGradient
                    as={Link}
                    to="/legal/cookie-settings"
                    className="px-6 py-3 bg-transparent hover:bg-secondary/5 text-gray-900 dark:text-white"
                  >
                    Cookie Settings
                  </HoverBorderGradient>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
};

export default TermsOfService;
