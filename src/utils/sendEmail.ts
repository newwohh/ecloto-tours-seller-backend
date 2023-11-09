import { Response } from "express";
import nodemailer from "nodemailer";

export const sendEmail = async (
  email: string,
  subject: string,
  text: string,
  res: Response
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const options = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(options);
    console.log("email sent successfully");

    return res.status(200).json({ message: "email sent successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
