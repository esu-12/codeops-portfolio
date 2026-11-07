
import {
  InMemoryOrderRepository,
  OrderService,
  type Order,
} from "./src/orders";

// Four sample orders from Day52's sample-orders.json.
const seedOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Abebe Bekele",
    area: "Bole",
    status: "PENDING",
    dishes: [
      { name: "Doro Wat", priceSantim: 35000 },
      { name: "Injera", priceSantim: 5000 },
    ],
    teleBirrPhone: "0911234567",
    totalSantim: 40000,
  },
  {
    id: "ORD-002",
    customerName: "Hana Tesfaye",
    area: "Kazanchis",
    status: "PREPARING",
    dishes: [{ name: "Kitfo", priceSantim: 45000 }],
    teleBirrPhone: "0922345678",
    totalSantim: 45000,
  },
  {
    id: "ORD-003",
    customerName: "Dawit Alemu",
    area: "Sarbet",
    status: "OUT_FOR_DELIVERY",
    dishes: [
      { name: "Shiro", priceSantim: 12000 },
      { name: "Tibs", priceSantim: 30000 },
    ],
    totalSantim: 42000,
  },
  {
    id: "ORD-004",
    customerName: "Mekdes Girma",
    area: "Megenagna",
    status: "DELIVERED",
    dishes: [{ name: "Family Doro Wat", priceSantim: 55000 }],
    teleBirrPhone: "0933456789",
    totalSantim: 55000,
  },
];

const repository = new InMemoryOrderRepository(seedOrders);
const service = new OrderService(repository);

// Find an order using its numeric repository key.
console.log("Order 1:", service.find(1));

// Delivery fees for all areas.
console.log("Delivery fees:", service.feesByArea());

// Generic summary: TypeScript infers string[].
const customerNames: string[] = service.summarise("customerName");
console.log("Customers:", customerNames);

// Generic summary: TypeScript infers number[].
const totals: number[] = service.summarise("totalSantim");
console.log("Order totals:", totals);
