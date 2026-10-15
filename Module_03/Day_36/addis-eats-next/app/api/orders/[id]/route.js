// app/api/orders/[id]/route.js
import { NextResponse } from "next/server";
import { getOrder } from "@/lib/db";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const order = await getOrder(id);

  // Return 404 for both missing orders and orders owned by another user.
  if (!order || order.userId !== session.id) {
    return NextResponse.json(
      { error: "Order not found." },
      { status: 404 }
    );
  }

  return NextResponse.json(order);
}