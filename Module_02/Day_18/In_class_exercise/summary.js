// summary.js

import { withVat, format, total } from "./pricing.js";
import { orders } from "./orders.js";

// Calculate total for every order
const ordersWithTotals = orders.map(order => {

    const subtotal = total(order.items);

    const finalTotal = withVat(subtotal);

    return {
        ...order,
        total: finalTotal
    };
});

// Find orders over 500 ETB
const largeOrders = ordersWithTotals.filter(
    order => order.total > 500
);

// Calculate grand total
const grandTotal = ordersWithTotals.reduce(
    (sum, order) => sum + order.total,
    0
);

// Print summary
console.log("Addis Market Order Summary");
console.log("==========================");

ordersWithTotals.forEach(order => {
    console.log(
        `Order #${order.id} - ${order.customer}: ${format(order.total)}`
    );
});

// Print orders over 500 ETB
console.log("\nOrders over 500 ETB:");

largeOrders.forEach(order => {
    console.log(
        `Order #${order.id}: ${format(order.total)}`
    );
});

// Print grand total
console.log(`\nGrand Total: ${format(grandTotal)}`);