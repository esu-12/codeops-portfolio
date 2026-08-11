// ==========================================
// 1. VAT FUNCTION
// ==========================================

function vat(amount, rate = 0.15) {
    return amount * (1 + rate);
}

console.log("Exercise 1:");
console.log(vat(1000));


// Arrow function with implicit return
const vatArrow = (amount, rate = 0.15) => amount * (1 + rate);

console.log(vatArrow(1000));


// ==========================================
// 2. MAKECOUNTER CLOSURE
// ==========================================

function makeCounter() {
    let count = 0;

    return function() {
        count++;
        return count;
    };
}

const counter = makeCounter();

console.log("\nExercise 2:");

console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());

// count stays private because it exists inside
// makeCounter's scope. Only the returned function
// can access it through a closure.


// ==========================================
// 3. DISCOUNT FACTORY
// ==========================================

const discountBy = (rate) => (price) => price * (1 - rate);

const memberPrice = discountBy(0.10);
const salePrice = discountBy(0.30);

console.log("\nExercise 3:");

console.log(`Member price: ${memberPrice(1000)} ETB`);
console.log(`Sale price: ${salePrice(1000)} ETB`);


// ==========================================
// 4. HIGHER-ORDER FUNCTION
// ==========================================

function applyToAll(list, fn) {
    return list.map(fn);
}

const prices = [100, 200, 300, 400];

const pricesWithVat = applyToAll(prices, vatArrow);

console.log("\nExercise 4:");
console.log(pricesWithVat);


// ==========================================
// 5. FOREACH CALLBACK
// ==========================================

const cities = [
    "Addis Ababa",
    "Bahir Dar",
    "Gondar",
    "Hawassa",
    "Mekelle"
];

console.log("\nExercise 5:");

cities.forEach((city, index) => {
    console.log(`${index + 1}. ${city}`);
});