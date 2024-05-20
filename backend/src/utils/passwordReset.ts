import nodemailer from "nodemailer";
import crypto from "crypto";
import { prismaClient } from "src";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const generateResetToken = async (email: string) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expiration = new Date(Date.now() + 3600000); // 1 hour from now

  await prismaClient.user.update({
    where: { email },
    data: {
      resetPasswordToken: token,
      resetPasswordExpires: expiration,
    },
  });

  return token;
};

export const sendResetEmail = async (email: string, token: string) => {
  const resetUrl = `http://localhost:3000/reset-password/${token}`;

  await transporter.sendMail({
    to: email,
    from: process.env.EMAIL_USER,
    subject: "Password Reset",
    text: `You requested a password reset. Click here to reset your password: ${resetUrl}`,
    html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  });
};
