import React, { useRef, useState } from "react";
import { validateForm } from "../../../utils/validateForm";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { GradientButton } from "../../ui/gradient-button";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.target);
    const validationErrors = validateForm({
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      user_email: formData.get("user_email"),
      message: formData.get("message"),
    });

    if (validationErrors.length > 0) {
      const errorMap = {};
      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      setIsLoading(false);
      return;
    }

    // Use a clean loading toast
    const loadingToast = toast.loading("Sending message...");

    try {
      const response = await fetch("http://localhost:8080/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.get("first_name"),
          last_name: formData.get("last_name"),
          user_email: formData.get("user_email"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully!", {
        id: loadingToast,
      });

      e.target.reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
        id: loadingToast,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-16 lg:py-24" id="contact">
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'text-sm sm:text-base',
          duration: 5000,
          style: {
            background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
            color: document.documentElement.classList.contains("dark") ? "#f9fafb" : "#000000",
            border: document.documentElement.classList.contains("dark") ? "1px solid #374151" : "1px solid #e5e7eb",
            borderRadius: "8px",
          },
        }}
      />

      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="max-w-3xl mx-auto mb-12 md:mb-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-3 py-2 rounded-full mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <p className="text-sm font-medium text-primary">Get in Touch</p>
          </div>

          <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-headingcolor dark:text-white leading-tight tracking-tight mb-4 md:mb-6">
            Let's Build Something <span className="text-primary">Amazing</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? I'm always open to discussing new
            opportunities and creative ideas. Drop me a message!
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <motion.form
            ref={form}
            onSubmit={handleSubmit}
            className="space-y-6 md:space-y-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200/50 dark:border-gray-800/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <Label htmlFor="first_name" className="text-sm font-medium">First Name</Label>
                <Input
                  type="text"
                  name="first_name"
                  placeholder="Your First Name"
                  className={`w-full px-4 py-2.5 text-base rounded-xl ${
                    errors.first_name ? "border-red-500" : ""
                  }`}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.first_name}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <Label htmlFor="last_name" className="text-sm font-medium">Last Name</Label>
                <Input
                  type="text"
                  name="last_name"
                  placeholder="Your Last Name"
                  className={`w-full px-4 py-2.5 text-base rounded-xl ${
                    errors.last_name ? "border-red-500" : ""
                  }`}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.last_name}
                  </p>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <Label htmlFor="user_email" className="text-sm font-medium">Email</Label>
              <Input
                type="email"
                name="user_email"
                placeholder="Your Email"
                className={`w-full px-4 py-2.5 text-base rounded-xl ${
                  errors.user_email ? "border-red-500" : ""
                }`}
              />
              {errors.user_email && (
                <p className="text-red-500 text-xs mt-1">{errors.user_email}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <Label htmlFor="message" className="text-sm font-medium">Message</Label>
              <Textarea
                name="message"
                rows={6}
                placeholder="Your Message"
                className={`w-full px-4 py-2.5 text-base rounded-xl min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <GradientButton
                type="submit"
                isLoading={isLoading}
                className="w-full sm:w-auto px-8 py-3 text-base font-medium"
              >
                Send Message
              </GradientButton>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
