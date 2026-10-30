// app/(pages)/orders/(history)/page.jsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrdersForUser } from "@/lib/db";
import CancelOrderButton from "@/app/(components)/CancelOrderButton/CancelOrderButton";
import ExportOrdersButton from "@/app/(components)/ExportOrdersButton/ExportOrdersButton";
import { etb, when } from "@/lib/format";

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
      <ExportOrdersButton orders={orders} />
      {orders.length === 0 ? (
        <p>No orders have been placed yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h2>Order {order.id}</h2>

              <p>
                <strong>Name:</strong> {order.name}
              </p>

              <p>
                <strong>Placed:</strong> {when(order.createdAt)}
              </p>

              {order.items?.length ? (
                <div>
                  <h3>Dishes</h3>

                  <ul>
                    {order.items.map((item, index) => (
                      <li key={`${item.id}-${index}`}>
                        {item.name} — {item.quantity} ×{" "}
                        {etb(item.price)}
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
                  Total: <strong>{etb(order.grandTotal)}</strong>
                </p>
              )}

              <p>
                <strong>Status:</strong> {order.status}
              </p>

              {order.status === "PENDING" && (
                <CancelOrderButton orderId={order.id} />
              )}

              <p>
                <Link href={`/orders/${encodeURIComponent(order.id)}`}>
                  Track this order
                </Link>
              </p>
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