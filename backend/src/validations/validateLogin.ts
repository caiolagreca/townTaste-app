import { IUserLogin } from "./../types/types";
import { LoginSchema } from "./../schema/users";
import { ZodError } from "zod";

export function validateLogin(data: IUserLogin): IUserLogin {
  try {
    return LoginSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(
        `Validation failed: ${error.errors.map((e) => e.message).join(", ")}`
      );
    }
    throw error;
  }
}
