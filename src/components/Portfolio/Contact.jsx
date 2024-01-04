import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const firstName = document.querySelector("#first-name");
    const lastName = document.querySelector("#last-name");
    const email = document.querySelector("#email");
    const comment = document.querySelector("#comment");
    const error = document.querySelector(".error");

    let messages = [];
    if (!firstName.value) {
      messages.push("First Name is required");
    }
    if (!lastName.value) {
      messages.push("Last Name is required");
    }
    if (!email.value) {
      messages.push("Email is required");
    }
    if (!comment.value) {
      messages.push("Comment is required");
    }
    if (messages.length > 0) {
      error.innerText = messages.join(", ");
      return false; // Prevent form submission if there are errors
    }
    return true; // Allow form submission if there are no errors
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Validate the form before sending the email
    const isValid = validate();
    if (!isValid) {
      return; // Do not proceed if validation fails
    }

    // The rest of your email sending code
    emailjs
      .sendForm(
        "service_978fyjb",
        "template_eh2ys5b",
        form.current,
        "oYjbDhVtBo6EdZ-2E"
      )
      .then(
        (result) => {
          console.log(result.text);
          setIsSuccess(true); // Set success state to true
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
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
                <label
                  className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
                  htmlFor="first-name"
                >
                  First Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 dark:bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="first-name"
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  autoComplete="given-name" // Add this line
                />
              </div>
              <div className="mb-1">
                <label
                  className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
                  htmlFor="last-name"
                >
                  Last Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 dark:bg-gray-200 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="last-name"
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  autoComplete="family-name" // Add this line
                />
              </div>
            </div>
            <div className="mb-1">
              <label
                className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 dark:bg-gray-200 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                name="user_email"
                placeholder="Email"
                autoComplete="email" // Add this line
              />
            </div>
            <div className="mb-6">
              <label
                className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
                htmlFor="comment"
              >
                Comment
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 dark:bg-gray-200 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="comment"
                name="message"
                placeholder="Write your comment here..."
                rows={8}
                autoComplete="off" // Add this line to disable autocomplete
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="btn-primary bg-blue-900" type="submit">
                Submit
              </button>
            </div>
            <div className="error text-red-500"></div>
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
