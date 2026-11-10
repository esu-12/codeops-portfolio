// src/orders/order.repository.ts

import type { Order } from "./order.types";

export interface OrderRepository {
  byId(id: number): Order | undefined;
  all(): Order[];
  create(order: Order): Order;
}

export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders = new Map<number, Order>();
  private nextId = 1;

  constructor(initialOrders: Order[] = []) {
    initialOrders.forEach((order) => {
      this.create(order);
    });
  }

  byId(id: number): Order | undefined {
    return this.orders.get(id);
  }

  all(): Order[] {
    return Array.from(this.orders.values());
  }

  create(order: Order): Order {
    this.orders.set(this.nextId, order);
    this.nextId += 1;
    return order;
  }
}