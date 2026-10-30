// app/(components)/ExportOrdersButton/ExportOrdersButton.jsx
"use client";

import { downloadOrdersCsv } from "@/lib/export-orders";

export default function ExportOrdersButton({ orders }) {
  return (
    <button
      type="button"
      onClick={() => downloadOrdersCsv(orders)}
      disabled={!orders?.length}
    >
      Download Order History CSV
    </button>
  );
}