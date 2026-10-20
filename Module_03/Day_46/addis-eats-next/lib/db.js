// db.js

import "server-only";
import { randomUUID } from "node:crypto";

// Mock dish records
const mockDishes = [
  {
    id: "dish_1",
    name: "Doro Wat",
    description:
      "Traditional spicy chicken stew served with injera and boiled egg.",
    price: 350,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_2",
    name: "Beyaynetu",
    description:
      "Assorted vegan fasting dishes served on injera.",
    price: 220,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
  {
    id: "dish_3",
    name: "Kitfo",
    description:
      "Minced beef seasoned with mitmita and niter kibbeh.",
    price: 400,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_4",
    name: "Shiro Tegabeno",
    description:
      "Rich chickpea flour stew served bubbling hot in a clay pot.",
    price: 180,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
];

// Preserve mock data during Next.js development reloads.
const globalForDb = globalThis;

const mockOrders =
  globalForDb.mockOrders ?? (globalForDb.mockOrders = []);

export const db = {
  dish: {
    findMany: async () => [...mockDishes],
    findUnique: async ({ where }) =>
      mockDishes.find((dish) => dish.id === where.id) ?? null,
  },

  order: {
    // Optional user filter: callers can request only their own orders.
    findMany: async ({ where } = {}) => {
      if (where?.userId) {
        return mockOrders.filter(
          (order) => order.userId === where.userId
        );
      }

      return [...mockOrders];
    },
  },
};

// Fetch a single dish by ID.
export async function getDish(id) {
  return mockDishes.find((dish) => dish.id === id) ?? null;
}

// Create an order for the authenticated user.
export async function createOrder(data, userId) {
  if (!userId) {
    throw new Error("An authenticated user is required to create an order.");
  }

  const newOrder = {
    id: `ord_${randomUUID()}`,
    ...data,
    userId,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  mockOrders.push(newOrder);

  return newOrder;
}

// Retrieve a specific order by ID.
export async function getOrder(id) {
  return mockOrders.find((order) => order.id === id) ?? null;
}

// Return only orders belonging to a specific user.
export async function getOrdersForUser(userId) {
  if (!userId) return [];

  return mockOrders.filter((order) => order.userId === userId);
}


export async function getOrders() {
  return db.order.findMany();
}

// Cancel an order only if it belongs to the requesting user.
export async function markCancelled(id, userId) {
  if (!userId) {
    throw new Error("An authenticated user is required.");
  }

  const order = mockOrders.find(
    (item) => item.id === id && item.userId === userId
  );

  if (!order) {
    throw new Error("Order not found or access denied.");
  }

  if (order.status === "CANCELLED") {
    return order;
  }

  order.status = "CANCELLED";
  order.updatedAt = new Date().toISOString();

  return order;
}
