import { IUserUpdate } from "./../types/types";
import { UpdateUserSchema } from "./../schema/users";
import { ZodError } from "zod";

export function validateUpdate(data: IUserUpdate): IUserUpdate {
  try {
    return UpdateUserSchema.parse(data);
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
