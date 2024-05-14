import { NextFunction, Request, RequestHandler, Response } from "express";
const express = require("express");
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import { IJWTPayload } from "../types/types";

const authMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //1. Extract the token from header
  const token = req.headers.authorization?.split(" ")[1]; // Split "Bearer <token>"
  if (!token) {
    return next(
      new UnauthorizedException("No token provided", ErrorCode.UNAUTHORIZED)
    );
  }

  try {
    //2. If the token is present, verify that token and extract the payload
    const payload = jwt.verify(token, JWT_SECRET) as IJWTPayload;

    //3. to get the user from the payload
    const user = await prismaClient.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user) {
      return next(
        new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED)
      );
    }

    //4. to attach the user to the current request object
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedException("Token has expired", ErrorCode.UNAUTHORIZED));
    } else if (error instanceof jwt.JsonWebTokenError) {
      return next(new UnauthorizedException("Token is invalid", ErrorCode.UNAUTHORIZED));
    }
    return next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
};

export default authMiddleware;
