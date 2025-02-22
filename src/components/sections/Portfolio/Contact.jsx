import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

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

  const sendEmail = async (e) => {
    e.preventDefault();

    // Validate the form before sending the email
    const isValid = validate();
    if (!isValid) {
      return; // Do not proceed if validation fails
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
            First Name: ${form.current.elements.first_name.value}
            Last Name: ${form.current.elements.last_name.value}
            Email: ${form.current.elements.user_email.value}
            Comment: ${form.current.elements.message.value}
          `,
        }),
      });

      if (response.ok) {
        const result = await response.text();
        console.log("Email sent successfully:", result);
        setIsSuccess(true);
      } else {
        console.error("Failed to send email:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      e.target.reset();
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="first-name"
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  autoComplete="given-name" // Add this line
                />
              </div>
              <div className="mb-5">
                <Label
                  className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
                  htmlFor="last-name"
                >
                  Last Name
                </Label>
                <Input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="last-name"
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  autoComplete="family-name" // Add this line
                />
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                name="user_email"
                placeholder="Email"
                autoComplete="email" // Add this line
              />
            </div>
            <div className="mb-6">
              <Label
                className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
                htmlFor="comment"
              >
                Comment
              </Label>
              <Input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="comment"
                name="message"
                placeholder="Write your comment here..."
                rows={8}
                autoComplete="off" // Add this line to disable autocomplete
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 px-3 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Sign up &rarr;
                <BottomGradient />
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

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default Contact;
