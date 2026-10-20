// app/orders/error.js
"use client";

export default function OrdersError({ reset }) {
  return (
    <main role="alert" className="orders-error">
      <h1>Unable to load orders</h1>
      <p>Something went wrong while retrieving the order records.</p>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}