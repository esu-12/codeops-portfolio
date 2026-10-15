
import "server-only";

import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";

const globalForUsers = globalThis;

const users =
  globalForUsers.addisEatsUsers ??
  (globalForUsers.addisEatsUsers = []);

export async function createUser({ name, phone, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPhone = phone.trim();

  const existingUser = users.find(
    (user) =>
      user.email === normalizedEmail ||
      user.phone === normalizedPhone
  );

  if (existingUser) {
    return {
      success: false,
      error: "An account with that email or phone already exists.",
    };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = {
    id: randomUUID(),
    name: name.trim(),
    phone: normalizedPhone,
    email: normalizedEmail,
    passwordHash,
    role: "customer",
  };

  users.push(user);

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
    },
  };
}

export async function verifyUser({ identifier, password }) {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const normalizedPhone = identifier.trim();

  const user = users.find(
    (candidate) =>
      candidate.email === normalizedIdentifier ||
      candidate.phone === normalizedPhone
  );

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email,
    role: user.role,
  };
}

export async function getUserById(id) {
  const user = users.find((candidate) => candidate.id === id);

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email,
    role: user.role,
  };
}
