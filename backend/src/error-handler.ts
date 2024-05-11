import { NextFunction, Request, RequestHandler, Response } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";

export const errorHandler = (method: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        exception = new InternalException(
          "Something went wrong.",
          error.message,
          ErrorCode.INTERNAL_EXCEPTION
        );
      }
      next(exception);
    }
  };
};
