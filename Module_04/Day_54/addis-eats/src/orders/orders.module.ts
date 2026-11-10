
import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrderService } from "./order.service";
import { ORDER_REPOSITORY } from "./orders.constants";
import { InMemoryOrderRepository } from "./order.repository";
import { seedOrders } from "./seed-orders";

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useFactory: () => new InMemoryOrderRepository(seedOrders),
    },
  ],
})
export class OrdersModule {}
