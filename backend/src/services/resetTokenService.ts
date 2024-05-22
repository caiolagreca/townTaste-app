import { prismaClient } from "..";
import { JWT_SECRET } from "../secrets";
import { generateResetToken } from "../utils/generateResetToken";
import * as jwt from "jsonwebtoken";

export const createResetToken = async (userId: string): Promise<string> => {
  
  const user = await prismaClient.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error("User not found");
  }

  const token = generateResetToken(userId);

  await prismaClient.passwordResetToken.create({
    data: {
      userId,
      token,
      expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
    },
  });
  return token;
};

export const validateResetToken = async (
  token: string
): Promise<string | null> => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const savedToken = await prismaClient.passwordResetToken.findUnique({
      where: { token },
    });

    if (savedToken && savedToken.expiresAt > new Date()) {
      return decoded.userId;
    }
    return null;
  } catch (error) {
    return null;
  }
};
