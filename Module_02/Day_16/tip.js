// Sample inputs

let bill = Number(500);
let partySize = 4;
let paymentMethod = "TeleBirr";

// Calculate tip

let tip;

if (bill > 300) {
    tip = bill * 0.10;
} else {
    tip = bill * 0.05;
}

// Calculate total

let total = bill + tip;

// Service fee

let serviceFee;

switch (paymentMethod) {

    case "TeleBirr":
        serviceFee = 5;
        break;

    case "CBE Birr":
        serviceFee = 3;
        break;

    default:
        serviceFee = 0;

}

// Add fee

total += serviceFee;

// Per person

let perPerson = total / partySize;

// Output

console.log(`Bill: ETB ${bill}`);
console.log(`Tip: ETB ${tip}`);
console.log(`Service Fee: ETB ${serviceFee}`);
console.log(`Total: ETB ${total}`);
console.log(`Per Person: ETB ${perPerson}`);