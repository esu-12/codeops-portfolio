// app/(pages)/order/(history)/page.jsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrdersForUser } from "@/lib/db";
import CancelOrderButton from "@/app/(components)/CancelOrderButton/CancelOrderButton";

export const dynamic = "force-dynamic";

export default async function OrderPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=%2Forders");
  }

  const orders = await getOrdersForUser(session.id);

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
              
              {order.items?.length ? (
                <div>
                  <h3>Dishes</h3>

                  <ul>
                    {order.items.map((item, index) => (
                      <li key={`${item.id}-${index}`}>
                        {item.name} — {item.quantity} × ETB{" "}
                        {Number(item.price).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  <p>Dish: {order.dishId || "Not specified"}</p>
                  <p>Quantity: {order.quantity ?? 1}</p>
                </>
              )}

              {order.grandTotal !== undefined && (
                <p>
                  Total: <strong>ETB {Number(order.grandTotal).toLocaleString()}</strong>
                </p>
              )}

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
