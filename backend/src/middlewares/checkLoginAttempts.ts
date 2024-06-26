import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";

export const checkLoginAttempts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const user = await prismaClient.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const now = new Date();
  const maxAttempts = 5;
  let attemptsLeft = maxAttempts - user.loginAttempts;

  if (user.loginAttempts >= maxAttempts && user.lastAttempt) {
    const lastAttemptTime = new Date(user.lastAttempt);
    const timeDifference = (now.getTime() - lastAttemptTime.getTime()) / 1000; // in seconds

    if (timeDifference < 60) {
      return res.status(429).json({
        message: "Too many login attempts. Please try again after 1 minute.",
        attemptsLeft: 0,
      });
    } else {
      // Reset attempts after cooldown period
      await prismaClient.user.update({
        where: { email },
        data: {
          loginAttempts: 0,
          lastAttempt: null,
        },
      });
      attemptsLeft = maxAttempts;
    }
  }
  req.body.attemptsLeft = attemptsLeft;
  next();
};
