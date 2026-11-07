# Day 53 — Addis Eats Order Service

## Overview

This exercise builds a modular, strongly typed order service using TypeScript.

The implementation separates order types, custom errors, repository logic, and service logic into individual files.

## Project Structure

```text
addis-eats/
├── src/
│   ├── orders/
│   │   ├── order.types.ts
│   │   ├── order.errors.ts
│   │   ├── order.repository.ts
│   │   ├── order.service.ts
│   │   └── index.ts
│   └── main.ts
├── main.ts
├── tsconfig.json
├── tsconfig.day53.json
└── README.md
```

The root-level `main.ts` is the exercise demonstration file. The NestJS application entry point remains in `src/main.ts`.

## Implementation

- **order.types.ts:** Exports `Area`, `OrderStatus`, `Dish`, and `Order`.
- **order.errors.ts:** Defines `OrderNotFoundError` and `PaymentDeclinedError`.
- **order.repository.ts:** Defines the `OrderRepository` interface and an in-memory implementation using `Map<number, Order>`.
- **order.service.ts:** Implements order lookup, delivery fees by area, and generic order summaries.
- **index.ts:** Re-exports the order module so consumers can import through one barrel file.
- **main.ts:** Demonstrates the service using four sample orders from Day52.

The repository uses numeric map keys for lookup while preserving the original string-based order IDs.

## Type Safety

The service uses:

```ts
feesByArea(): Record<Area, number>
```

This requires a fee for every defined delivery area.

The generic method:

```ts
summarise<K extends keyof Order>(key: K): Order[K][]
```

preserves the type of the selected order property.

For example:

```ts
const customerNames: string[] = service.summarise('customerName');

const totals: number[] = service.summarise('totalSantim');
```

## Validation

Run strict compilation:

```bash
npx tsc --noEmit -p tsconfig.day53.json
```

Run TypeScript watch mode:

```bash
npx tsc --watch -p tsconfig.day53.json
```

### Verified Results

- Strict compilation completed with zero errors.
- Generic summary inference correctly returns `string[]` and `number[]`.
- Removing a required delivery area produces a TypeScript compile-time error.
- No `any` usage in the order module or exercise demonstration.
- No thrown strings; errors are represented by custom Error classes.
- Watch mode completed with zero errors.

## Completion

Day53 demonstrates TypeScript interfaces, classes, generics, mapped record types, custom errors, in-memory repositories, and barrel exports.
