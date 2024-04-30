import { z } from "zod";

export const SignUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(7, { message: "Password must be 7 or more characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
  age: z.number().int().positive(),
  phoneNumber: z.string().regex(/^\+\d{1,4}\s?\d{7,14}$/, {
    message: "Invalid phone number format",
  }),
  address: z.string().optional(),
  profilePhoto: z.string().optional(),
});
