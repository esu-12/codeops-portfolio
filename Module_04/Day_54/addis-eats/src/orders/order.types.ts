// src/orders/order.types.ts
export const AREAS = [
  "Bole",
  "Kazanchis",
  "Sarbet",
  "Megenagna",
] as const;

export type Area = (typeof AREAS)[number];

export type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED";

export type Dish = {
  name: string;
  priceSantim: number;
};

export type Order = {
  readonly id: string;
  customerName: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  teleBirrPhone?: string;
  totalSantim: number;
};