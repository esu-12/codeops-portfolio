// const {
//     subtotal,
//     discountBy,
//     withVat,
//     toETB,
//     makeReceiptMaker
// } = require("./order.js");

import {
    subtotal,
    discountBy,
    withVat,
    makeReceiptMaker
} from "./order.js";

const memberDiscount = discountBy(0.10);

const receipt = makeReceiptMaker();

const order1 = subtotal(200, 150, 100);
const discounted1 = memberDiscount(order1);
const total1 = withVat(discounted1);

console.log(receipt(total1));