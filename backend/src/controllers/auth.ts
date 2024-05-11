import { NextFunction, Request, RequestHandler, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { LoginSchema, SignUpSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";

export const signup: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SignUpSchema.parse(req.body);
  const {
    email,
    password,
    firstName,
    lastName,
    age,
    phoneNumber,
    address,
    profilePhoto,
  } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    return next(
      new BadRequestsException(
        "User already exists.",
        ErrorCode.USER_ALREADY_EXISTS
      )
    );
  }
  user = await prismaClient.user.create({
    data: {
      firstName,
      lastName,
      email,
      age,
      phoneNumber,
      address,
      password: hashSync(password, 10),
      profilePhoto,
    },
  });
  res.json({ success: true, user });
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  LoginSchema.parse(req.body);
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw new NotFoundException("User not found.", ErrorCode.USER_NOT_FOUND);
  }
  if (!compareSync(password, user.password)) {
    return next(
      new BadRequestsException(
        "Incorrect password.",
        ErrorCode.INCORRECT_PASSWORD
      )
    );
  }
  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );
  res.json({ user, token });
};

// me => return the logged user
export const me: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json(req.user);
};
