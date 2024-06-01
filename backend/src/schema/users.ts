import { z } from "zod";

export const SignUpSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string().optional(),
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
    confirmPassword: z.string(),
    age: z.number().int().positive().optional(),
    phoneNumber: z
      .string()
      .regex(/^\+\d{1,4}\s?\d{7,14}$/, {
        message: "Invalid phone number format",
      })
      .optional(),
    address: z.string().optional(),
    profilePhoto: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const UpdateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z
    .string()
    .min(7, { message: "Password must be 7 or more characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    )
    .optional(),
  age: z.number().int().positive().optional(),
  address: z.string().optional(),
  profilePhoto: z.string().optional(),
});

export const UpdatePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(7, { message: "Password must be 7 or more characters long" }),
  newPassword: z
    .string()
    .min(7, { message: "Password must be 7 or more characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});

export const ResetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z
    .string()
    .min(7, { message: "Password must be 7 or more characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});
