// app/api/orders/route.js

import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/schema";
import { createOrder } from "@/lib/db";

export async function POST(request) {
  const body = await request.json();

  const result = orderSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        fieldErrors: result.error.flatten().fieldErrors,
      },
      {
        status: 422,
      }
    );
  }

  const order = await createOrder(result.data);

  return NextResponse.json(
    {
      message: "Order placed successfully",
      order,
    },
    {
      status: 201,
    }
  );
}