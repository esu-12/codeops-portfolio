
import "server-only";
import { randomUUID } from "node:crypto";
import { sql } from "@/lib/neon";

// Existing dish records.
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

// Convert PostgreSQL rows to the camelCase structure used by the UI.
function mapOrder(row) {
  if (!row) return null;

  return {
    id: row.id,
    userId: row.userId,
    name: row.name,
    phone: row.phone,
    email: row.email,
    address: row.address,
    landmark: row.landmark,
    city: row.city,
    deliveryMode: row.deliveryMode,
    paymentMethod: row.paymentMethod,
    dishId: row.dishId,
    quantity: Number(row.quantity ?? 1),
    items: Array.isArray(row.items) ? row.items : [],
    totalItems: Number(row.totalItems ?? 0),
    totalPrice: Number(row.totalPrice ?? 0),
    deliveryFee: Number(row.deliveryFee ?? 0),
    grandTotal: Number(row.grandTotal ?? 0),
    notes: row.notes,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

const orderSelect = `
  id,
  user_id AS "userId",
  name,
  phone,
  email,
  address,
  landmark,
  city,
  delivery_mode AS "deliveryMode",
  payment_method AS "paymentMethod",
  dish_id AS "dishId",
  quantity,
  items,
  total_items AS "totalItems",
  total_price AS "totalPrice",
  delivery_fee AS "deliveryFee",
  grand_total AS "grandTotal",
  notes,
  status,
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;

async function fetchOrders(userId) {
  let rows;

  if (userId) {
    rows = await sql`
      SELECT
        id,
        user_id AS "userId",
        name,
        phone,
        email,
        address,
        landmark,
        city,
        delivery_mode AS "deliveryMode",
        payment_method AS "paymentMethod",
        dish_id AS "dishId",
        quantity,
        items,
        total_items AS "totalItems",
        total_price AS "totalPrice",
        delivery_fee AS "deliveryFee",
        grand_total AS "grandTotal",
        notes,
        status,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM orders
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;
  } else {
    rows = await sql`
      SELECT
        id,
        user_id AS "userId",
        name,
        phone,
        email,
        address,
        landmark,
        city,
        delivery_mode AS "deliveryMode",
        payment_method AS "paymentMethod",
        dish_id AS "dishId",
        quantity,
        items,
        total_items AS "totalItems",
        total_price AS "totalPrice",
        delivery_fee AS "deliveryFee",
        grand_total AS "grandTotal",
        notes,
        status,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM orders
      ORDER BY created_at DESC
    `;
  }

  return rows.map(mapOrder);
}

export const db = {
  dish: {
    findMany: async () => [...mockDishes],
    findUnique: async ({ where }) =>
      mockDishes.find((dish) => dish.id === where.id) ?? null,
  },
  order: {
    findMany: async ({ where } = {}) =>
      fetchOrders(where?.userId),
  },
};

// Fetch a single dish by ID.
export async function getDish(id) {
  return mockDishes.find((dish) => dish.id === id) ?? null;
}

// Create and persist an order for the authenticated user.
export async function createOrder(data, userId) {
  if (!userId) {
    throw new Error("An authenticated user is required to create an order.");
  }

  const id = `ord_${randomUUID()}`;

  const rows = await sql`
    INSERT INTO orders (
      id,
      user_id,
      name,
      phone,
      email,
      address,
      landmark,
      city,
      delivery_mode,
      payment_method,
      dish_id,
      quantity,
      items,
      total_items,
      total_price,
      delivery_fee,
      grand_total,
      notes,
      status
    )
    VALUES (
      ${id},
      ${userId},
      ${data.name},
      ${data.phone},
      ${data.email ?? null},
      ${data.address ?? null},
      ${data.landmark ?? null},
      ${data.city ?? null},
      ${data.deliveryMode ?? null},
      ${data.paymentMethod ?? null},
      ${data.dishId ?? null},
      ${data.quantity ?? 1},
      ${JSON.stringify(data.items ?? [])}::jsonb,
      ${data.totalItems ?? 0},
      ${data.totalPrice ?? 0},
      ${data.deliveryFee ?? 0},
      ${data.grandTotal ?? 0},
      ${data.notes ?? null},
      'PENDING'
    )
    RETURNING
      id,
      user_id AS "userId",
      name,
      phone,
      email,
      address,
      landmark,
      city,
      delivery_mode AS "deliveryMode",
      payment_method AS "paymentMethod",
      dish_id AS "dishId",
      quantity,
      items,
      total_items AS "totalItems",
      total_price AS "totalPrice",
      delivery_fee AS "deliveryFee",
      grand_total AS "grandTotal",
      notes,
      status,
      created_at AS "createdAt",
      updated_at AS "updatedAt"
  `;

  return mapOrder(rows[0]);
}

// Retrieve a specific order.
export async function getOrder(id) {
  const rows = await sql`
    SELECT
      id,
      user_id AS "userId",
      name,
      phone,
      email,
      address,
      landmark,
      city,
      delivery_mode AS "deliveryMode",
      payment_method AS "paymentMethod",
      dish_id AS "dishId",
      quantity,
      items,
      total_items AS "totalItems",
      total_price AS "totalPrice",
      delivery_fee AS "deliveryFee",
      grand_total AS "grandTotal",
      notes,
      status,
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    FROM orders
    WHERE id = ${id}
    LIMIT 1
  `;

  return mapOrder(rows[0]);
}

// Return only orders belonging to a specific customer.
export async function getOrdersForUser(userId) {
  if (!userId) return [];
  return fetchOrders(userId);
}

// Return all orders for staff.
export async function getOrders() {
  return fetchOrders();
}

// Cancel an order only if it belongs to the requesting user.
export async function markCancelled(id, userId) {
  if (!userId) {
    throw new Error("An authenticated user is required.");
  }

  const rows = await sql`
    UPDATE orders
    SET
      status = 'CANCELLED',
      updated_at = NOW()
    WHERE id = ${id}
      AND user_id = ${userId}
      AND status = 'PENDING'
    RETURNING
      id,
      user_id AS "userId",
      name,
      phone,
      email,
      address,
      landmark,
      city,
      delivery_mode AS "deliveryMode",
      payment_method AS "paymentMethod",
      dish_id AS "dishId",
      quantity,
      items,
      total_items AS "totalItems",
      total_price AS "totalPrice",
      delivery_fee AS "deliveryFee",
      grand_total AS "grandTotal",
      notes,
      status,
      created_at AS "createdAt",
      updated_at AS "updatedAt"
  `;

  if (rows.length > 0) {
    return mapOrder(rows[0]);
  }

  const existingOrder = await getOrder(id);

  if (!existingOrder || existingOrder.userId !== userId) {
    throw new Error("Order not found or access denied.");
  }

  if (existingOrder.status === "CANCELLED") {
    return existingOrder;
  }

  throw new Error("Only pending orders can be cancelled.");
}
