
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller("orders")
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Get()
  getAllOrders() {
    return this.ordersService.all();
  }

  @Get(":id")
  getOrderById(@Param("id", ParseIntPipe) id: number) {
    return this.ordersService.find(id);
  }

  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }
}
