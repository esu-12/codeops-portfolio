// Calculate the subtotal of all prices
export function subtotal(...prices) {
    return prices.reduce((total, price) => total + price, 0);
}

// Create a discount function
export const discountBy = (rate) => (amount) => {
    return amount * (1 - rate);
};
// Add 15% VAT
export const withVat = (amount) => {
    return amount * 1.15;
};
// Format amount as ETB
export const toETB = (amount) => {
    return `${amount.toFixed(2)} ETB`;
};
// Create a receipt maker with a private order number
export function makeReceiptMaker() {
    let orderNumber = 0;

    return (amount) => {
        orderNumber++;

        return `#${orderNumber}: ${toETB(amount)}`;
    };
}

// module.exports = {
//     subtotal,
//     discountBy,
//     withVat,
//     toETB,
//     makeReceiptMaker
// };