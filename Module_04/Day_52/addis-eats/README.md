# Day 52 — Typing the Addis Eats Order

## Overview

This exercise uses TypeScript strict mode to model Addis Eats delivery orders with safe, explicit types.

## Requirements implemented

- `Area`: A union type derived from an `as const` array of four delivery areas.
- `OrderStatus`: A union of five order statuses.
- `Dish`: Contains a dish name and price in santim.
- `Order`: Contains a readonly ID, customer name, delivery area, status, dishes, optional TeleBirr phone, and total in santim.
- `deliveryFee()`: Provides free delivery above 500 ETB, 40 ETB for Bole, and 60 ETB for other areas.
- `statusMessage()`: Uses an exhaustive switch with a `never` default.
- `formatETB()`: Formats santim amounts as Ethiopian Birr using `Intl.NumberFormat`.
- `receipt()`: Produces a multiline order receipt.

## Money representation

All monetary values are stored in santim.

- 100 santim = 1 ETB
- 40 ETB = 4,000 santim
- 60 ETB = 6,000 santim
- 500 ETB = 50,000 santim

## Files

- `order.ts` — Type definitions and order functions.
- `sample-orders.json` — Four example Addis Eats orders.
- `tsconfig.order.json` — Strict TypeScript configuration for this exercise.

## Run the TypeScript check

From the project directory:

```bash
npx tsc --noEmit -p tsconfig.order.json
```

To watch for changes:

```bash
npx tsc --watch -p tsconfig.order.json
```

A successful strict check produces no compiler errors.

## Exhaustiveness test

Temporarily add `CANCELLED` to the `OrderStatus` union without modifying `statusMessage()`.

TypeScript reports that `CANCELLED` is not assignable to `never`, demonstrating that the switch handles every declared status.

After capturing the compiler error, remove the temporary status and run the strict check again.

## Acceptance

- Strict TypeScript compilation: zero errors.
- No use of `any`.
- All receipt currency amounts use one formatting helper.
- Adding an unhandled status produces a compiler error.
