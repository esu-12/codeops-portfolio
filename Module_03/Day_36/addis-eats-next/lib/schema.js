
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
    /^(09|\+2519)\d{8}$/,
    "Phone number must start with 09… or +2519… followed by 8 digits"
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