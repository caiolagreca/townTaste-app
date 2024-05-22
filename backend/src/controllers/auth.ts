import {
  createResetToken,
  validateResetToken,
} from "./../services/resetTokenService";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { prismaClient } from "..";
import bcrypt, { compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";

import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";
import { validateSignUp } from "../validations/validateSignUp";
import { validateLogin } from "../validations/validateLogin";
import { UserDto } from "../dtos/UserDto";
import { validateUpdate } from "../validations/validateUpdate";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { validateUpdatePassword } from "../validations/validateUpdatePassword";
import { sendResetPasswordEmail } from "../services/emailService";
import { validateResetPassword } from "../validations/validateResetPassword";

export const signup: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validateData = validateSignUp(req.body);
    const { email, password } = validateData;

    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestsException(
        "User already exists.",
        ErrorCode.USER_ALREADY_EXISTS
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prismaClient.user.create({
      data: { ...validateData, password: hashedPassword },
    });
    res.json({ success: true, user: newUser });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validateData = validateLogin(req.body);
    const { email, password } = validateData;

    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException("User not found.", ErrorCode.USER_NOT_FOUND);
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestsException(
        "Incorrect password.",
        ErrorCode.INCORRECT_PASSWORD
      );
    }
    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ success: true, user, token });
  } catch (error) {
    next(error);
  }
};

export const fetchUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      return next(
        new UnauthorizedException(
          "User not authenticated",
          ErrorCode.UNAUTHORIZED
        )
      );
    }
    const userDto = UserDto(user); // Transform the user object through the DTO
    res.json({ success: true, user: userDto });
  } catch (error) {
    console.error("Error fetching user:", error);
    if (error instanceof UnauthorizedException) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An unexpected error occurred",
      });
    }
  }
};

export const updateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(403).json({
      message: "User ID is missing in the request.",
    });
  }

  try {
    const validateData = validateUpdate(req.body);
    const user = await prismaClient.user.update({
      where: { id: userId },
      data: validateData,
    });
    res.json({ success: true, message: "User updated successfully", user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(403).json({
      message: "User ID is missing in the request.",
    });
  }
  const user = await prismaClient.user.delete({
    where: { id: userId },
  });
  res.json({ success: true, message: "User deleted successfully" });
};

export const updatePassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) {
    return res.status(403).json({
      message: "User not authenticated",
    });
  }

  try {
    const validateData = validateUpdatePassword(req.body);
    const { currentPassword, newPassword } = validateData;

    const isMatch = compareSync(currentPassword, user.password);
    if (!isMatch) {
      throw new BadRequestsException(
        "Current password is incorrect",
        ErrorCode.INCORRECT_PASSWORD
      );
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    await prismaClient.user.update({
      where: { id: user.id },
      data: { password: hashPassword },
    });
    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const requestPasswordReset: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    console.log("Received email for password reset:", email);

    const user = await prismaClient.user.findUnique({ where: { email } });
    console.log("Received email in database:", user);

    if (!user) {
      console.error("User not found for email:", email);
      throw new NotFoundException("User not found.", ErrorCode.USER_NOT_FOUND);
    }

    const token = await createResetToken(email);
    await sendResetPasswordEmail(email, token);
    res
      .status(200)
      .json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    console.error("Error in requestPasswordReset:", error);
    next(error);
  }
};

export const resetPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validateData = validateResetPassword(req.body);
    const { token, newPassword } = validateData;

    const userId = await validateResetToken(token);
    if (!userId) {
      throw new BadRequestsException(
        "Invalid or expired token",
        ErrorCode.UNAUTHORIZED
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prismaClient.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    await prismaClient.passwordResetToken.delete({ where: { token } });

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};
