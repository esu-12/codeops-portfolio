// lib/session.js

import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { getUserById } from "@/lib/users";

const COOKIE_NAME = "addis-eats-session";
const SESSION_DURATION = 60 * 60 * 24 * 7;

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET must be configured with at least 32 characters."
    );
  }

  return new TextEncoder().encode(secret);
}

export async function createSession(user) {
  if (!user?.id || !["customer", "staff"].includes(user.role)) {
    throw new Error("A valid user ID and role are required.");
  }

  const token = await new SignJWT({ role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(user.id))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecretKey());

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });

    if (
      typeof payload.sub !== "string" ||
      !["customer", "staff"].includes(payload.role)
    ) {
      return null;
    }

    const user = await getUserById(payload.sub);

    if (!user || user.role !== payload.role) {
      return null;
    }

    return {
      id: user.id,
      role: user.role,
    };
  } catch {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}