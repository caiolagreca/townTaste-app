import nodemailer from "nodemailer";

export const sendResetPasswordEmail = async (
  email: string,
  token: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `http://localhost:3000/reset-password/${token}`;

  const mailOptions = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: "Password Reset",
    text: `You requested a password reset. Click here to reset your password: ${resetUrl}`,
    html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
