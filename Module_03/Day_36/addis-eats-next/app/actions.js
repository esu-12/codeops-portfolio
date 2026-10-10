// app/actions.js

"use server";

import { orderSchema } from "@/lib/schema";
import {
  createOrder,
  getOrder,
  getSession,
  markCancelled,
} from "@/lib/db";
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

export async function cancelOrder(orderId) {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      error: "You must be logged in to cancel an order.",
    };
  }

  const order = await getOrder(orderId);

  if (!order) {
    return {
      success: false,
      error: "Order not found.",
    };
  }

  if (order.userId !== session.id) {
    return {
      success: false,
      error: "You are not allowed to cancel this order.",
    };
  }

  const cancelledOrder = await markCancelled(orderId);

  revalidatePath("/order");

  return {
    success: true,
    order: cancelledOrder,
  };
}