// app/(components)/CancelOrderButton/CancelOrderButton.jsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cancelOrder } from "@/app/actions";

export default function CancelOrderButton({ orderId }) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleCancel() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result = await cancelOrder(orderId);

      if (result.success) {
        setMessage("Order cancelled successfully.");
        router.refresh();
      } else {
        setMessage(result.error || "Could not cancel the order.");
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleCancel}
        disabled={isPending}
      >
        {isPending ? "Cancelling..." : "Cancel Order"}
      </button>

      {message && <p role="status">{message}</p>}
    </div>
  );
}