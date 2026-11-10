// src/orders/order.service.ts

import { Inject, Injectable } from "@nestjs/common";
import { type Area, type Order } from "./order.types";
import { OrderNotFoundError } from "./order.errors";
import type { OrderRepository } from "./order.repository";
import { ORDER_REPOSITORY } from "./orders.constants";

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repository: OrderRepository,
  ) {}

  find(id: number): Order {
    const order = this.repository.byId(id);

    if (!order) {
      throw new OrderNotFoundError(id);
    }

    return order;
  }

  all(): Order[] {
    return this.repository.all();
  }

  create(order: Order): Order {
    return this.repository.create(order);
  }

  feesByArea(): Record<Area, number> {
    return {
      Bole: 4000,
      Kazanchis: 6000,
      Sarbet: 6000,
      Megenagna: 6000,
    };
  }

  summarise<K extends keyof Order>(key: K): Order[K][] {
    return this.repository.all().map((order) => order[key]);
  }
}
