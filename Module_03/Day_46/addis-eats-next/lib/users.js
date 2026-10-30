
import "server-only";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { sql } from "@/lib/neon";

export async function createUser({ name, phone, email, password }) {
  const normalizedName = name.trim();
  const normalizedPhone = phone.trim();
  const normalizedEmail = email.trim().toLowerCase();

  const passwordHash = await bcrypt.hash(password, 12);

  const id = randomUUID();

  try {
    const rows = await sql`
      INSERT INTO users (
        id,
        name,
        phone,
        email,
        password_hash,
        role
      )
      VALUES (
        ${id},
        ${normalizedName},
        ${normalizedPhone},
        ${normalizedEmail},
        ${passwordHash},
        ${
          process.env.NODE_ENV === "development" &&
          normalizedEmail ===
            process.env.DEV_STAFF_EMAIL?.trim().toLowerCase()
            ? "staff"
            : "customer"
        }
      )
      RETURNING id, name, phone, email, role
    `;

    return {
      success: true,
      user: rows[0],
    };
  } catch (error) {
    if (error.code === "23505") {
      return {
        success: false,
        error: "An account with that email or phone already exists.",
      };
    }

    throw error;
  }
}

export async function verifyUser({ identifier, password }) {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const normalizedPhone = identifier.trim();

  const rows = await sql`
    SELECT
      id,
      name,
      phone,
      email,
      password_hash AS "passwordHash",
      role
    FROM users
    WHERE email = ${normalizedIdentifier}
       OR phone = ${normalizedPhone}
    LIMIT 1
  `;

  const user = rows[0];

  if (!user) return null;

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) return null;

  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email,
    role: user.role,
  };
}

export async function getUserById(id) {
  const rows = await sql`
    SELECT id, name, phone, email, role
    FROM users
    WHERE id = ${id}
    LIMIT 1
  `;

  return rows[0] ?? null;
}