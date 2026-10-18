
import { z } from "zod";

const orderItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().min(1),
  description: z.string().optional(),
  image: z.string().optional(),
});

export const orderSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }).trim().min(2, "Name must be at least 2 characters"),

  phone: z.string({
    required_error: "Phone number is required",
  }).regex(
  /^\+251[79]\d{8}$/,
  "Enter a valid Ethiopian mobile number."
),

  // Keep these for existing single-dish order workflows.
  dishId: z.string().optional(),
  quantity: z.number().int().min(1).optional().default(1),
  notes: z.string().max(200).optional(),

  // Multi-item cart checkout.
  items: z.array(orderItemSchema).min(1, "Your cart is empty").optional(),

  email: z.string().optional(),
  address: z.string().optional(),
  landmark: z.string().optional(),
  city: z.string().optional(),

  deliveryMode: z.enum(["immediate", "scheduled"]).optional(),
  paymentMethod: z.enum(["telebirr", "cbe", "cash", "awash"]).optional(),

  totalItems: z.number().int().nonnegative().optional(),
  totalPrice: z.number().nonnegative().optional(),
  deliveryFee: z.number().nonnegative().optional(),
  grandTotal: z.number().nonnegative().optional(),
});