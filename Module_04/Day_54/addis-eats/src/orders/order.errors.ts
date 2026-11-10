// src/orders/order.errors.ts
import { NotFoundException } from "@nestjs/common";

export class OrderNotFoundError extends NotFoundException {
  constructor(public readonly id: number) {
    super(`Order with ID ${id} was not found.`);
    this.name = "OrderNotFoundError";
  }
}

export class PaymentDeclinedError extends Error {
  constructor(
    public readonly phone: string,
    public readonly reason: string,
  ) {
    super(`Payment declined for ${phone}: ${reason}`);
    this.name = "PaymentDeclinedError";
  }
}