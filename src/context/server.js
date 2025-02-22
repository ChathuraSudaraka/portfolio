import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "chathurasudaraka@eversoft.lk",
    pass: "2eFL1b377Jah ",
  },
});

app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: "chathurasudaraka@eversoft.lk",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.sendStatus(403).json({
        status: "Error",
        message: "Error while sending the message",
      });
    }
    res.json({
      status: "Success",
      message: "Message send successfully",
    });
  });
});

app.listen(8080, () => {
  console.log("web server running on localhost:8080");
});
