// app/(pages)/order/(history)/page.jsx

import Link from "next/link";
import { db } from "@/lib/db";
import CancelOrderButton from "@/app/(components)/CancelOrderButton/CancelOrderButton";

export const dynamic = "force-dynamic";

export default async function OrderPage() {
  const orders = await db.order.findMany();
  console.log("ORDER HISTORY:", orders);

  return (
    <main>
      <h1>Order History</h1>

      {orders.length === 0 ? (
        <p>No orders have been placed yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h2>Order {order.id}</h2>
              <p>Name: {order.name}</p>
              <p>Dish: {order.dishId}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Status: {order.status}</p>

              {order.status === "PENDING" && (
                <CancelOrderButton orderId={order.id} />
              )}
            </li>
          ))}
        </ul>
      )}

      <nav>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/menu">Menu</Link>
        {" | "}
        <Link href="/cart">Cart</Link>
      </nav>
    </main>
  );
}