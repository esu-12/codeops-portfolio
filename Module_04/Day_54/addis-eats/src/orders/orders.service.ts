
import { Injectable } from "@nestjs/common";
import { OrderService } from "./order.service";
import type { Order } from "./order.types";
import type { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  all(): Order[] {
    return this.orderService.all();
  }

  find(id: number): Order {
    return this.orderService.find(id);
  }

  create(dto: CreateOrderDto): Order {
    const nextNumber = this.orderService.all().length + 1;

    const order: Order = {
      id: `ORD-${String(nextNumber).padStart(3, "0")}`,
      customerName: dto.customerName,
      area: dto.area,
      status: "PENDING",
      dishes: [],
      totalSantim: dto.totalSantim,
      ...(dto.teleBirrPhone
        ? { teleBirrPhone: dto.teleBirrPhone }
        : {}),
    };

    return this.orderService.create(order);
  }
}
