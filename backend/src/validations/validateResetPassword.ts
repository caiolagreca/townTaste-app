import { IResetPassword } from "../types/types";
import { ResetPasswordSchema } from "../schema/users";
import { ZodError } from "zod";

export function validateResetPassword(data: IResetPassword): IResetPassword {
  try {
    return ResetPasswordSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(
        `Validation failed: ${error.errors
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", ")}`
      );
    }
    throw new Error("Unexpected error during validation");
  }
}
