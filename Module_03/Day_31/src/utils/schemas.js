import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .regex(
      /^(09|9)\d{8}$/,
      "Please enter a valid Ethiopian mobile number"
    ),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Name is too long"),

    phone: z
      .string()
      .regex(
        /^(09|9)\d{8}$/,
        "Please enter a valid Ethiopian mobile number"
      ),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .max(100, "Password is too long"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),

    terms: z
      .boolean()
      .refine(
        (value) => value === true,
        {
          message:
            "You must agree to the terms and privacy guidelines",
        }
      ),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const checkoutSchema = z.object({
  name: z
    .string()
    .min(2, "Full name is required")
    .max(50, "Name is too long"),

  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(15, "Phone number is too long"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  city: z
    .string()
    .min(2, "Sub-city / neighborhood is required"),

  address: z
    .string()
    .min(5, "Delivery address is required"),

  landmark: z
    .string()
    .min(
      5,
      "Landmark or gate instructions are required"
    ),
});