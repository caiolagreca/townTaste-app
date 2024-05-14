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
      JWT_SECRET,
      { expiresIn: "24h" }
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
    const user = req.user;
    if (!user) {
      throw new Error("User not authenticated");
    }
    const userDto = UserDto(user); // Transform the user object through the DTO
    res.json({ success: true, user: userDto });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
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

export const fetchUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id }: { id?: string } = req.params;
  const user = await prismaClient.user.findUnique({
    where: { id: String(id) },
  });
  res.json(user);
};
