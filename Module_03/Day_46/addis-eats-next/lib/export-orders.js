// lib/export-orders.js

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

export function downloadOrdersCsv(orders = []) {
  const headers = [
    "Order ID",
    "Customer",
    "Created At",
    "Status",
    "Dish",
    "Quantity",
    "Unit Price ETB",
    "Order Total ETB",
  ];

  const rows = orders.flatMap((order) => {
    const items = Array.isArray(order.items) && order.items.length
      ? order.items
      : [{
          name: order.dishId || "Not specified",
          quantity: order.quantity ?? 1,
          price: "",
        }];

    return items.map((item) => [
      order.id,
      order.name,
      order.createdAt,
      order.status,
      item.name,
      item.quantity,
      item.price,
      order.grandTotal ?? "",
    ]);
  });

  const csv = [headers, ...rows]
    .map((row) => row.map(csvCell).join(","))
    .join("\r\n");

  // BOM helps spreadsheet programs display text correctly.
  const blob = new Blob(["\uFEFF", csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "addis-eats-order-history.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}