import { z } from "zod";


const ethiopianPhoneRegex = /^[79]\d{8}$/;

const ethiopianPhoneSchema = z
  .string()
  .trim()
  .regex(
    ethiopianPhoneRegex,
    "Please enter a valid Ethiopian mobile number"
  );

/* =========================================================
   Password Validation
========================================================= */

const passwordSchema = z
  .string()
  .min(
    8,
    "Password must contain at least 8 characters"
  )
  .max(100, "Password is too long")
  .regex(
    /[A-Z]/,
    "Password must contain an uppercase letter"
  )
  .regex(
    /[a-z]/,
    "Password must contain a lowercase letter"
  )
  .regex(
    /[0-9]/,
    "Password must contain a number"
  )
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain a symbol"
  );

/* =========================================================
   Sign In Schema
========================================================= */

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: ethiopianPhoneSchema,

  password: passwordSchema,
});

/* =========================================================
   Register Schema
========================================================= */

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(
        2,
        "Full name must be at least 2 characters"
      )
      .max(50, "Name is too long"),

    phone: ethiopianPhoneSchema,

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    password: passwordSchema,

    confirmPassword: z
      .string()
      .min(
        1,
        "Please confirm your password"
      ),

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
    (data) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

/* =========================================================
   Checkout Schema
========================================================= */

export const checkoutSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      2,
      "Full name is required"
    )
    .max(50, "Name is too long"),

  phone: ethiopianPhoneSchema,

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  city: z
    .string()
    .trim()
    .min(
      2,
      "Sub-city / neighborhood is required"
    ),

  address: z
    .string()
    .trim()
    .min(
      5,
      "Delivery address is required"
    ),

  landmark: z
    .string()
    .trim()
    .min(
      5,
      "Landmark or gate instructions are required"
    ),
});