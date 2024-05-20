import { IPasswordUpdate } from "../types/types";
import { UpdatePasswordSchema } from "../schema/users";
import { ZodError } from "zod";

export function validateUpdatePassword(data: IPasswordUpdate): IPasswordUpdate {
  try {
    return UpdatePasswordSchema.parse(data);
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
