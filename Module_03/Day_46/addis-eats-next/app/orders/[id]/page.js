// app/orders/[id]/page.js
import { notFound, redirect } from "next/navigation";
import { getOrder } from "@/lib/db";
import { getSession } from "@/lib/session";
import OrderStatusClient from "./OrderStatusClient";

export const dynamic = "force-dynamic";

export default async function OrderStatusPage({ params }) {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=%2Forders");
  }

  const { id } = await params;
  const order = await getOrder(id);

  // Customers can view only their own orders.
  // Staff can view all customer orders.
  if (
    !order ||
    (order.userId !== session.id && session.role !== "staff")
  ) {
    notFound();
  }

  return <OrderStatusClient initialOrder={order} />;
}
