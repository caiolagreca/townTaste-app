import { prismaClient } from "..";

export const createResetToken = async (userId: string): Promise<string> => {
  const code = Math.floor(1000 + Math.random() * 9000).toString(); // Generate 4-digit code

  await prismaClient.passwordResetToken.create({
    data: {
      userId,
      token: code,
      expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
    },
  });

  return code;
};

export const validateResetCode = async (
  userId: string,
  code: string
): Promise<boolean> => {
  const savedToken = await prismaClient.passwordResetToken.findUnique({
    where: { userId_token: { userId, token: code } },
  }); 

  if (savedToken && savedToken.expiresAt > new Date()) {
    return true;
  }
  return false;
};
