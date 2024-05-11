import { IUserSignUp } from './../types/types';
import { SignUpSchema } from './../schema/users';
import { ZodError } from "zod";

export function validateSignUp(data: IUserSignUp): IUserSignUp {
  try {
    return SignUpSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(
        `Validation failed: ${error.errors.map((e) => e.message).join(", ")}`
      );
    }
    throw error;
  }
}
