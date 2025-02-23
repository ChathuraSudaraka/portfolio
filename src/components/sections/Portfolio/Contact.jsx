import React, { useRef, useState } from "react";
import { validateForm } from "../../../utils/validateForm";
import emailjs from "@emailjs/browser";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { GradientButton } from "../../ui/gradient-button";

const Contact = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const form = useRef();

  const handleValidation = (formData) => {
    const validationErrors = validateForm({
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      user_email: formData.get("user_email"),
      message: formData.get("message"),
    });

    const errorMap = {};
    validationErrors.forEach((error) => {
      errorMap[error.field] = error.message;
    });
    setErrors(errorMap);

    return validationErrors.length === 0;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    setErrors({});

    const formData = new FormData(e.target);

    if (!handleValidation(formData)) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "chathuraoriginal2005@gmail.com",
          subject: "Contact Form Submission",
          text: `
            First Name: ${formData.get("first_name")}
            Last Name: ${formData.get("last_name")}
            Email: ${formData.get("user_email")}
            Comment: ${formData.get("message")}
          `,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsSuccess(true);
      e.target.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      setErrors({ submit: "Failed to send email. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="lg:px-12 px-4">
        <div className="mb-20 text-center">
          <p className="text-xl dark:text-white text-headingcolor font-semibold mb-5">
            Let's keep in touch
          </p>
          <h2 className="md:text-5xl dark:text-white text-4xl text-headingcolor font-bold">
            Contact me
          </h2>
          <p className="mt-5 dark:text-white">
            Contact us anytime for assistance or inquiries. We're here to help.
          </p>
        </div>
        <div className="mx-auto py-20">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-bgcom border border-bgShade dark:border-border-color dark:bg-custom-dark-blue rounded-md shadow-lg px-8 pt-6 pb-8 mb-4"
            data-aos="fade-up"
            data-aos-offset="300"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="mb-1">
                <Label
                  className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
                  htmlFor="first-name"
                >
                  First Name
                </Label>
                <Input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.first_name ? "border-red-500" : ""
                  }`}
                  id="first-name"
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  autoComplete="given-name"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {errors.first_name}
                  </p>
                )}
              </div>
              <div className="mb-5">
                <Label
                  className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
                  htmlFor="last-name"
                >
                  Last Name
                </Label>
                <Input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.last_name ? "border-red-500" : ""
                  }`}
                  id="last-name"
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  autoComplete="family-name"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {errors.last_name}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-5">
              <Label
                className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </Label>
              <Input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.user_email ? "border-red-500" : ""
                }`}
                id="email"
                type="text"
                name="user_email"
                placeholder="Email"
                autoComplete="email"
              />
              {errors.user_email && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.user_email}
                </p>
              )}
            </div>
            <div className="mb-6">
              <Label
                className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
                htmlFor="comment"
              >
                Comment
              </Label>
              <Textarea
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.message ? "border-red-500" : ""
                }`}
                id="comment"
                name="message"
                placeholder="Write your comment here..."
                autoComplete="off"
              />
              {errors.message && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <GradientButton type="submit" isLoading={isLoading}>
                Send Message &rarr;
              </GradientButton>
            </div>
            {errors.submit && (
              <div className="error text-red-500 mt-2">{errors.submit}</div>
            )}
            {isSuccess && (
              <div className="success text-green-500 mt-2">
                Email sent successfully!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
