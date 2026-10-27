//app/orders/[id]/OrderStatus.jsx
"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function OrderStatusClient({ initialOrder }) {
  const { data, error, isLoading } = useSWR(
    `/api/orders/${initialOrder.id}`,
    fetcher,
    {
      fallbackData: initialOrder,
      refreshInterval: 5000,
      revalidateOnFocus: true,
      shouldRetryOnError: true,
    }
  );

  const order = data ?? initialOrder;

  return (
    <main>
      <h1>Order Status</h1>

      <p>
        <strong>Order ID:</strong> {order.id}
      </p>
      <p>
        <strong>Name:</strong> {order.name}
      </p>
      <p>
        <strong>Dish:</strong> {order.dishId}
      </p>
      <p>
        <strong>Quantity:</strong> {order.quantity}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>

      {isLoading && <p>Checking for updates…</p>}

      {error && (
        <p role="status">
          Could not refresh the order. Showing the last available status.
        </p>
      )}

      <p>Order status refreshes every five seconds.</p>
    </main>
  );
}