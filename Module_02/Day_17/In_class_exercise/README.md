# Habesha Eatery Order Module

## Exercise

Build a small JavaScript order module that calculates restaurant
orders in ETB using pure functions and a closure-based receipt maker.

## Requirements

- Create `subtotal(...prices)` using `reduce()`.
- Create `discountBy(rate)` as a factory that returns an arrow function.
- Create `withVat(amount)` to add VAT.
- Create `toETB(amount)` to format amounts as ETB.
- Create `makeReceiptMaker()` with a private order number.
- Each receipt should have a running order number.
- Compose the functions to calculate each order.
- Print receipts in the required format.
- Run the program with Node.js.
- Compare the output with `expected.txt`.

## Concepts Practiced

- Functions
- Function expressions
- Arrow functions
- Rest parameters
- `reduce()`
- Higher-order functions
- Closures
- Pure functions
- Modules
- `require()` and `module.exports`

## How to Run

Open the terminal in this folder and run:

```bash
node run.js

## Author

- Esayas Nigussie