import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import axios from "axios";
import { validateForm } from "../../../utils/validateForm";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { GradientButton } from "../../ui/gradient-button";

const ContactInfo = ({ icon: Icon, title, value, link }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 group w-full"
  >
    <div className="p-2.5 sm:p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
    <div className="min-w-0">
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <p className="text-sm sm:text-base text-gray-900 dark:text-white font-medium truncate">
        {value}
      </p>
    </div>
  </motion.a>
);

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.target);
    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      user_email: formData.get("user_email"),
      message: formData.get("message"),
    };

    // Client-side validation
    const validationErrors = validateForm(data);
    if (validationErrors.length > 0) {
      const errorMap = {};
      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      setIsLoading(false);
      return;
    }

    // Use react-toastify's API correctly
    // Show loading toast with id
    const toastId = toast.loading("Sending message...", {
      position: "bottom-center",
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/send-email",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // Success - dismiss loading toast and show success toast
      toast.dismiss(toastId);
      toast.success("Message sent successfully!", {
        position: "bottom-center",
        autoClose: 5000,
      });

      e.target.reset();
    } catch (error) {
      console.error("Form submission error:", error);

      // Error - dismiss loading toast and show error toast
      toast.dismiss(toastId);

      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.details ||
        error.message ||
        "Failed to send message";

      toast.error(errorMessage, {
        position: "bottom-center",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-20" id="contact">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Header - Simplified animations for mobile */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <p className="text-sm font-medium text-primary">Get in Touch</p>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Let's Build Something{" "}
              <span className="text-primary">Amazing</span>
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can work together to
              create something great.
            </p>
          </motion.div>
        </div>

        {/* Contact Grid - Improved mobile layout */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert">
              <h3 className="text-xl text-gray-900 dark:text-white sm:text-2xl font-bold">
                Contact Information
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Feel free to reach out through any of these channels. I'm always
                excited to connect and discuss new opportunities.
              </p>
            </div>

            {/* Contact Info Grid - Better mobile spacing */}
            <div className="grid gap-3 sm:gap-4">
              <ContactInfo
                icon={FiMail}
                title="Email"
                value="chathurasudaraka@eversoft.lk"
                link="mailto:chathurasudaraka@eversoft.lk"
              />
              <ContactInfo
                icon={FiPhone}
                title="Phone"
                value="+94 70 532 1516"
                link="tel:+94705321516"
              />
              <ContactInfo
                icon={FiMapPin}
                title="Location"
                value="Colombo, Sri Lanka"
                link="https://maps.google.com"
              />
            </div>

            {/* Social Proof - Simplified mobile version */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border border-gray-200 dark:border-gray-800">
              <blockquote className="text-sm sm:text-base text-gray-600 dark:text-gray-300 italic">
                "Looking forward to creating something amazing together!"
              </blockquote>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="p-4 sm:p-6 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
                {/* Form Grid - Improved mobile layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Name Fields - Simplified animations */}
                  <div className="space-y-2">
                    <Label htmlFor="first_name" className="text-sm font-medium">
                      First Name
                    </Label>
                    <Input
                      type="text"
                      name="first_name"
                      placeholder="Your First Name"
                      className={`w-full px-3 py-2 text-sm sm:text-base rounded-lg ${
                        errors.first_name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.first_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.first_name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last_name" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      name="last_name"
                      placeholder="Your Last Name"
                      className={`w-full px-3 py-2 text-sm sm:text-base rounded-lg ${
                        errors.last_name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.last_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.last_name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email and Message Fields */}
                <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="user_email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="user_email"
                      placeholder="Your Email"
                      className={`w-full px-3 py-2 text-sm sm:text-base rounded-lg ${
                        errors.user_email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.user_email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.user_email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message
                    </Label>
                    <Textarea
                      name="message"
                      rows={6}
                      placeholder="Your Message"
                      className={`w-full px-3 py-2 text-sm sm:text-base rounded-lg min-h-[120px] sm:min-h-[150px] ${
                        errors.message ? "border-red-500" : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button - Mobile optimized */}
                <div className="mt-4 sm:mt-6">
                  <GradientButton
                    type="submit"
                    isLoading={isLoading}
                    className="w-full px-4 py-2.5 text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <FiSend className="w-4 h-4" />
                  </GradientButton>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
