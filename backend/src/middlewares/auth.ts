import { NextFunction, Request, RequestHandler, Response } from "express";
const express = require("express");
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";

const authMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //1. Extract the token from header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(
      new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED)
    );
  }

  //2. Extract the token
  const token = authHeader;
  if (!token) {
    return next(
      new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED)
    );
  }

  try {
    //3. If the token is present, verify that token and extract the payload
    const payload = jwt.verify(token, JWT_SECRET) as any;

    //4. to get the user from the payload
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });
    if (!user) {
      return next(
        new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED)
      );
    }

    //5. to attach the user to the current request object
    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
};

export default authMiddleware;
