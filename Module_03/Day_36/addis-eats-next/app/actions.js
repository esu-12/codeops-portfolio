// app/actions.js
"use server";

import { orderSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function placeOrder(previousState, formData) {
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    area: formData.get("area"),
  };

  const result = orderSchema.safeParse(data);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  // Save order here

  revalidatePath("/orders");

  return {
    success: true,
  };
}