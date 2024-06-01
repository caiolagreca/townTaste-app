import { NextFunction, Request, RequestHandler, Response } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import { ZodError } from "zod";
import { BadRequestsException } from "./exceptions/bad-requests";

export const errorHandler = (method: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      console.log("erro1: ", error);
      let exception: HttpException;
      if (error instanceof HttpException) {
        console.log("erro2: ", error);
        exception = error;
      } else {
        if (error instanceof ZodError) {
          exception = new BadRequestsException(
            "Unprocessable entity.",
            ErrorCode.UNPROCESSABLE_ENTITY
          );
          console.log("erro3: ", error);
        } else {
          console.log("erro4: ", error);
          exception = new InternalException(
            "Something went wrong.",
            error.message,
            ErrorCode.INTERNAL_EXCEPTION
          );
        }
      }
      next(exception);
    }
  };
};
