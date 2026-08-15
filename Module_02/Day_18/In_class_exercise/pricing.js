// pricing.js

// Add 15% VAT
export function withVat(amount) {
    return amount * 1.15;
}

// Format an amount as ETB
export function format(amount) {
    return `${amount.toFixed(2)} ETB`;
}

// Calculate the total of an order's items
export function total(items) {
    return items.reduce((sum, { price, qty }) => {
        return sum + price * qty;
    }, 0);
}