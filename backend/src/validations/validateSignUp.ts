import { IUserSignUp } from "./../types/types";
import { SignUpSchema } from "./../schema/users";
import { ZodError } from "zod";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";

export function validateSignUp(data: IUserSignUp): IUserSignUp {
  try {
    return SignUpSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new BadRequestsException(
        `Validation failed: ${error.errors.map((e) => e.message).join(", ")}`,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
    throw new BadRequestsException(
      "Validation failed",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
}
