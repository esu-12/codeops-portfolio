// 1. DELIVERY AREAS
const AREAS = [
  "Bole",
  "Kazanchis",
  "Sarbet",
  "Megenagna",
] as const;

type Area = (typeof AREAS)[number];

// 2. ORDER STATUS
type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED";

// 3. DISH TYPE
type Dish = {
  name: string;
  priceSantim: number;
};

// 4. ORDER TYPE
type Order = {
  readonly id: string;
  customerName: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  teleBirrPhone?: string;
  totalSantim: number;
};

// 5. DELIVERY FEE
function deliveryFee(order: Order): number {
  // Free delivery when the order is above 500 ETB
  if (order.totalSantim > 50000) {
    return 0;
  }

  // Bole delivery fee: 40 ETB
  if (order.area === "Bole") {
    return 4000;
  }

  // All other areas: 60 ETB
  return 6000;
}

// 6. ORDER STATUS MESSAGE
function statusMessage(status: OrderStatus): string {
  switch (status) {
    case "PENDING":
      return "Your order has been received.";

    case "PREPARING":
      return "Your food is being prepared.";

    case "READY":
      return "Your order is ready for pickup.";

    case "OUT_FOR_DELIVERY":
      return "Your order is on its way.";

    case "DELIVERED":
      return "Your order has been delivered.";

    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

// 7. ETB CURRENCY FORMATTER
const formatETB = (amountSantim: number): string => {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
  }).format(amountSantim / 100);
};

// 8. ORDER RECEIPT
function receipt(order: Order): string {
  const dishLines = order.dishes
    .map(
      (dish) =>
        `${dish.name}: ${formatETB(dish.priceSantim)}`,
    )
    .join("\n");

  const fee = deliveryFee(order);

  return `
================================
         ADDIS EATS
       ORDER RECEIPT
================================

Order ID: ${order.id}
Customer: ${order.customerName}
Delivery Area: ${order.area}
Status: ${order.status}

--------------------------------
ORDER ITEMS
--------------------------------
${dishLines}

--------------------------------
Order Total: ${formatETB(order.totalSantim)}
Delivery Fee: ${formatETB(fee)}
================================
${statusMessage(order.status)}
================================
`.trim();
}