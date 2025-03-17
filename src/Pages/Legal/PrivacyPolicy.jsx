import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LegalLayout from "../../components/Layouts/LegalLayout";
import HoverBorderGradient from "../../components/ui/hover-border-gradient";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy - Chathura Sudaraka";
  }, []);
  const sections = [
    {
      title: "Data Collection",
      content:
        "I value your privacy and am transparent about the data collected through my portfolio.",
      subsections: [
        "Contact form data (name, email) for communication purposes only",
        "Theme preferences for better user experience",
        "Google Analytics for anonymous usage statistics",
      ],
    },
    {
      title: "Data Usage & Storage",
      content:
        "Your information is handled with care and used only for specific purposes.",
      subsections: [
        "Contact information is used solely for responding to your inquiries",
        "Preferences are stored locally in your browser",
        "Analytics data is anonymized and stored for 26 months",
      ],
    },
    {
      title: "Third-Party Services",
      content: "My portfolio integrates with select third-party services:",
      subsections: [
        "GitHub (project repositories and contributions)",
        "Google Analytics (anonymous usage tracking)",
        "Email service providers for contact form",
      ],
    },
    {
      title: "Your Rights",
      content: "You have control over your data on my portfolio:",
      subsections: [
        "Request deletion of your contact information",
        "Opt-out of analytics tracking",
        "Modify cookie preferences at any time",
      ],
    },
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
              <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                </span>
                <p className="text-sm font-medium text-primary">
                  Legal Documents
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Privacy <span className="text-primary">Policy</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Last updated: {new Date().toLocaleDateString()}
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
                  className="mb-8 last:mb-0"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {section.content}
                  </p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                    {section.subsections.map((subsection, subIndex) => (
                      <li key={subIndex}>{subsection}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4 justify-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
              >
                <HoverBorderGradient
                  as={Link}
                  to="/legal/terms-of-service"
                  className="px-6 py-3 bg-transparent hover:bg-primary/5 text-gray-900 dark:text-white"
                >
                  Terms of Service
                </HoverBorderGradient>
                <HoverBorderGradient
                  as={Link}
                  to="/legal/cookie-settings"
                  className="px-6 py-3 bg-transparent hover:bg-primary/5 text-gray-900 dark:text-white"
                >
                  Cookie Settings
                </HoverBorderGradient>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
