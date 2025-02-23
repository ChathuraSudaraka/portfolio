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
    <section className="relative min-h-screen py-20" id="contact">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
            color: document.documentElement.classList.contains("dark") ? "#f9fafb" : "#000000",
            border: document.documentElement.classList.contains("dark") ? "1px solid #374151" : "1px solid #e5e7eb",
            borderRadius: "8px",
          },
        }}
      />

      {/* Updated Header Section */}
      <div className="lg:px-12 px-4">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-3 py-2 rounded-full mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <p className="text-sm font-medium text-primary">Get in Touch</p>
          </div>

          <h2 className="md:text-5xl dark:text-white text-4xl text-headingcolor font-bold">
            Let's Build Something <span className="text-primary">Amazing</span>
          </h2>
          <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? I'm always open to discussing new
            opportunities and creative ideas. Drop me a message!
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <motion.form
            ref={form}
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  type="text"
                  name="first_name"
                  placeholder="Your First Name"
                  className={`w-full ${
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
              >
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  type="text"
                  name="last_name"
                  placeholder="Your Last Name"
                  className={`w-full ${
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
            >
              <Label htmlFor="user_email">Email</Label>
              <Input
                type="email"
                name="user_email"
                placeholder="Your Email"
                className={`w-full ${
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
            >
              <Label htmlFor="message">Message</Label>
              <Textarea
                name="message"
                rows={6}
                placeholder="Your Message"
                className={`w-full ${errors.message ? "border-red-500" : ""}`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <GradientButton
                type="submit"
                isLoading={isLoading}
                className="px-8 py-3"
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
