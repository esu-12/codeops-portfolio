import { notFound } from "next/navigation";
import { getOrder } from "@/lib/db";
import OrderStatusClient from "./OrderStatusClient";

export const dynamic = "force-dynamic";

export default async function OrderStatusPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return <OrderStatusClient initialOrder={order} />;
}
