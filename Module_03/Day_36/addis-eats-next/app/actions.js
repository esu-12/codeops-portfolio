// app/actions.js

"use server";

import { orderSchema } from "@/lib/schema";
import { createOrder } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function placeOrder(previousState, formData) {
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    dishId: formData.get("dishId"),
    quantity: Number(formData.get("quantity")),
    notes: formData.get("notes"),
  };

  const result = orderSchema.safeParse(data);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
      success: false,
    };
  }

  // Save the order
  const order = await createOrder(result.data);

  console.log("Order placed:", order);

  // Refresh checkout data after successful order
  revalidatePath("/checkout");

  return {
    fieldErrors: {},
    success: true,
    order,
  };
}