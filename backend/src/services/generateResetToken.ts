import crypto from "crypto";

const generateResetToken = async (email: string) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expiration = new Date(Date.now() + 3600000); // 1 hour from now

};
