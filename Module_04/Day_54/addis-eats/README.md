# Day 54 — Addis Eats: Wiring the Orders Module

## Overview

This exercise integrates the Day53 TypeScript OrderService into a NestJS application using dependency injection.

The Orders module exposes REST API endpoints for retrieving and creating orders. It uses an in-memory repository, DTO validation, and a global ValidationPipe.

## Technologies

- NestJS
- TypeScript
- class-validator
- class-transformer
- Express HTTP platform

## Project Structure

```text
addis-eats/
├── src/
│   ├── orders/
│   │   ├── dto/
│   │   │   └── create-order.dto.ts
│   │   ├── order.types.ts
│   │   ├── order.errors.ts
│   │   ├── order.repository.ts
│   │   ├── order.service.ts
│   │   ├── orders.constants.ts
│   │   ├── orders.controller.ts
│   │   ├── orders.module.ts
│   │   ├── orders.service.ts
│   │   └── seed-orders.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
├── package.json
└── README.md
```

## Dependency Injection

The application uses NestJS dependency injection.

- `OrderService` contains the original Day53 business logic.
- `OrdersService` provides the operations used by the HTTP controller.
- `ORDER_REPOSITORY` is a symbol token used to inject the repository.
- `InMemoryOrderRepository` stores orders in a `Map<number, Order>`.
- `OrdersModule` registers both services and the repository provider.

The repository uses numeric map keys for lookup while preserving string order IDs such as `ORD-001`.

### Dependency Injection Error Demonstration

The `OrdersService` provider was deliberately removed from the module's providers array.

NestJS reported:

```text
UnknownDependenciesException

Nest can't resolve dependencies of the OrdersController (?).
Please make sure that the argument OrdersService
at index [0] is available in the OrdersModule module.
```

This happened because the controller required `OrdersService`, but NestJS could not find that provider.

Restoring `OrdersService` in the providers array resolved the error.

## DTO Validation

`CreateOrderDto` validates incoming order data:

| Property | Validation |
|---|---|
| customerName | Required, non-empty string, maximum 100 characters |
| area | Must be Bole, Kazanchis, Sarbet, or Megenagna |
| totalSantim | Positive integer |
| teleBirrPhone | Optional Ethiopian mobile number |

Global validation is configured in `src/main.ts`:

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
);
```

- `whitelist` removes properties not declared in the DTO.
- `transform` transforms incoming request objects into DTO instances.

## REST API Endpoints

The global API prefix is `/api`.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/orders` | Retrieve all orders |
| GET | `/api/orders/:id` | Retrieve one order using its numeric repository key |
| POST | `/api/orders` | Create a new order |

New orders receive a generated string ID, `PENDING` status, and an empty dishes array.

## Testing

Start the development server:

```bash
npm run start:dev
```

Build the application:

```bash
npm run build
```

### Verified API Results

**1. Retrieve all orders**

```bash
curl -i http://localhost:3000/api/orders
```

Result: `200 OK`

Returns the four seeded sample orders as JSON.

**2. Retrieve one order**

```bash
curl -i http://localhost:3000/api/orders/1
```

Result: `200 OK`

**3. Missing order**

```bash
curl -i http://localhost:3000/api/orders/99
```

Result: `404 Not Found`

**4. Reject a negative total**

```bash
curl -i -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Test Customer","area":"Bole","totalSantim":-5}'
```

Result: `400 Bad Request`

**5. Strip an extra property**

```bash
curl -i -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Test Customer","area":"Bole","totalSantim":25000,"admin":true}'
```

Result: `201 Created`

The response did not contain the extra `admin` property.

### Build and Controller Checks

- `npm run build` completed successfully.
- `GET /api/orders` returned HTTP 200.
- `GET /api/orders/1` returned HTTP 200.
- Missing orders returned HTTP 404.
- Invalid totals returned HTTP 400.
- Extra DTO properties were stripped.
- No `new` expression was found in `orders.controller.ts`.
- The missing-provider dependency injection error was reproduced and resolved.

## Seed Data Note

Four sample orders from the available Day52 `sample-orders.json` were used. The assignment's twelve-order starter seed file was not present in the supplied project files.

## Completion

Day54 demonstrates NestJS modules, controllers, services, dependency injection, repository providers, DTO validation, HTTP status handling, and REST API development.