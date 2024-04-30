import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignUpSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";

export const signup = async (
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

export const me = async (req: Request, res: Response) => {
  res.json(req.user);
};
