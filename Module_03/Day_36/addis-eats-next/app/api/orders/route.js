// app/api/orders/route.js
import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/schema";
import { createOrder } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function POST(request) {
  // 1. Require an authenticated user.
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required. Please sign in." },
      { status: 401 }
    );
  }

  // 2. Handle malformed JSON safely.
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request body." },
      { status: 400 }
    );
  }

  // 3. Validate the submitted order.
  const result = orderSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        fieldErrors: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  // 4. Assign ownership from the verified session, never from the body.
  const order = await createOrder(result.data, session.id);

  return NextResponse.json(
    {
      message: "Order placed successfully",
      order,
    },
    { status: 201 }
  );
}
