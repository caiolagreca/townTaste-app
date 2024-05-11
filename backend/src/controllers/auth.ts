import { NextFunction, Request, RequestHandler, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";
import { validateSignUp } from "../validations/validateSignUp";
import { validateLogin } from "../validations/validateLogin";
import { UserDto } from "../dtos/UserDto";

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

    const hashedPassword = hashSync(password, 10);
    const newUser = await prismaClient.user.create({
      data: { ...validateData, password: hashedPassword },
    });
    res.json({ success: true, newUser });
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
      JWT_SECRET
    );
    res.json({ success: true, user, token });
  } catch (error) {
    next(error);
  }
};

// me => return the logged user
export const me: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user; // No need to cast here if the type is extended globally
    if (!user) {
      throw new Error("User not authenticated"); // Consider using a more specific error or custom error type
    }
    const userDto = UserDto(user); // Transform the user object through the DTO
    res.json({ success: true, user: userDto });
  } catch (error) {
    console.error(error); // Detailed error logging
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
