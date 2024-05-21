import { JWT_SECRET } from "../secrets";
import * as jwt from "jsonwebtoken";

export const generateResetToken = (userId: string): string => {
  const payload = { userId };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  return token;
};
