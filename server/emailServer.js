const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Function to get email template from filesystem with error handling
const getTemplate = async (template) => {
  try {
    const path = `./public/email-templates/${template}.html`;
    return fs.readFileSync(path, "utf8");
  } catch (error) {
    console.error(`Error reading template ${template}:`, error);
    throw new Error("Template not found");
  }
};

// Set up the POST method for email submission
app.post("/send-email", async (req, res, next) => {
  try {
    const { first_name, last_name, user_email, message } = req.body;
    if (!first_name || !last_name || !user_email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let html = await getTemplate("contact");
    html = html
      .replace(/{{firstName}}/g, first_name)
      .replace(/{{lastName}}/g, last_name)
      .replace(/{{email}}/g, user_email)
      .replace(/{{message}}/g, message);

    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.CONTACT_FORM_TO_EMAIL,
      subject: "New Contact Form Submission",
      html,
    });

    res.json({ success: true, message: "Email sent successfully", info });
  } catch (error) {
    console.error("Email sending error:", error);
    // Pass error to the error-handling middleware
    next(error);
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Failed to send email", details: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
