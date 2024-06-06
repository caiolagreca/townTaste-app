import nodemailer from "nodemailer";

export const sendResetPasswordEmail = async (
  email: string,
  code: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, //ignore self-signed certificates
    },
  });

  const mailOptions = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: "Password Reset Code",
    text: `Your password reset code is: ${code}`,
    html: `<p>Your password reset code is: <strong>${code}</strong></p>`,
  };

  await transporter.sendMail(mailOptions);
};
