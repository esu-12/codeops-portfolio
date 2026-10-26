// app/orders/[id]/OrderStatusClient.jsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { relative } from "@/lib/format";

const DeliveryMap = dynamic(
  () => import("@/app/(components)/DeliveryMap/DeliveryMap"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ height: "380px", display: "grid", placeItems: "center" }}
        aria-live="polite"
      >
        Loading delivery map...
      </div>
    ),
  }
);

export default function OrderStatusClient({ initialOrder }) {
  const [order, setOrder] = useState(initialOrder);
  const [connection, setConnection] = useState("Connecting");

  useEffect(() => {
    const source = new EventSource(
      `/api/orders/${encodeURIComponent(initialOrder.id)}/stream`
    );

    source.onopen = () => {
      setConnection("Connected — waiting for updates");
    };

    source.onmessage = (event) => {
      try {
        const updatedOrder = JSON.parse(event.data);
        setOrder(updatedOrder);

        setConnection(
          updatedOrder.status === "DELIVERED"
            ? "Delivered"
            : "Connected — updates received"
        );

        if (updatedOrder.status === "DELIVERED") {
          source.close();
        }
      } catch {
        setConnection("Could not read update");
      }
    };

    source.onerror = () => {
      setConnection("Connection interrupted");
      source.close();
    };

    return () => source.close();
  }, [initialOrder.id]);

  const items = Array.isArray(order.items) ? order.items : [];
  const money = (amount) =>
    new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    }).format(amount ?? 0);

  return (
    <main className="order-tracking">
      <h1>Track Your Order</h1>

      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Name:</strong> {order.name}</p>
      <p><strong>Status:</strong> {order.status}</p>

  {order.createdAt && (
    <p>
      <strong>Placed:</strong> {relative(order.createdAt)}
    </p>
  )}

      <p role="status" aria-live="polite">
        Live updates: {connection}
      </p>

<DeliveryMap />

<section aria-labelledby="tracking-items-heading"></section>

      <section aria-labelledby="tracking-items-heading">
        <h2 id="tracking-items-heading">Your Dishes</h2>

        {items.length > 0 ? (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong>
                {" — "}
                {item.quantity} × {money(item.price)}
                {" = "}
                {money(item.quantity * item.price)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No dish details are available for this order.</p>
        )}
      </section>

      <section aria-labelledby="delivery-details-heading">
        <h2 id="delivery-details-heading">Delivery Details</h2>
        <p><strong>Address:</strong> {order.address}</p>
        {order.landmark && (
          <p><strong>Landmark:</strong> {order.landmark}</p>
        )}
        <p><strong>Neighborhood:</strong> {order.city}</p>
        <p><strong>Delivery mode:</strong> {order.deliveryMode}</p>
      </section>

      <section aria-labelledby="payment-summary-heading">
        <h2 id="payment-summary-heading">Payment Summary</h2>
        <p>Items: {money(order.totalPrice)}</p>
        <p>Delivery fee: {money(order.deliveryFee)}</p>
        <p><strong>Total: {money(order.grandTotal)}</strong></p>
      </section>
    </main>
  );
}
