// app/actions.js

"use server";

import { orderSchema } from "@/lib/schema";
import {
  createOrder,
  getOrder,
  markCancelled,
} from "@/lib/db";
import { createUser, verifyUser } from "@/lib/users";
import {
  createSession,
  getSession,
  deleteSession,
} from "@/lib/session";
import { revalidatePath } from "next/cache";

// Accept only safe, local application paths.
function getSafeNextPath(value) {
  if (
    typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.startsWith("/\\")
  ) {
    return value;
  }

  return "/menu";
}

 // REGISTER
export async function registerUser(formData) {
  const name = String(formData.get("name") ?? "").trim();
  let phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(
    formData.get("confirmPassword") ?? ""
  );
  const termsAccepted = formData.get("terms") === "on";

  // 1. Required fields
  if (!name || !phone || !email || !password) {
    return {
      success: false,
      error: "Please complete all required fields.",
    };
  }

  if (name.length < 2) {
    return {
      success: false,
      error: "Name must contain at least 2 characters.",
    };
  }

  // 2. Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: "Please enter a valid email address.",
    };
  }

  // 3. Normalize Ethiopian mobile numbers
  phone = phone.replace(/[\s()-]/g, "");

  if (/^0[79]\d{8}$/.test(phone)) {
    phone = `+251${phone.slice(1)}`;
  } else if (/^[79]\d{8}$/.test(phone)) {
    phone = `+251${phone}`;
  }

  // Accept only Ethiopian mobile numbers in canonical format
  const phoneRegex = /^\+251[79]\d{8}$/;

  if (!phoneRegex.test(phone)) {
    return {
      success: false,
      error:
        "Enter a valid Ethiopian mobile number, such as 0912345678 or +251912345678.",
    };
  }

  // 4. Password confirmation
  if (password !== confirmPassword) {
    return {
      success: false,
      error: "Passwords do not match.",
    };
  }

  // 5. Password strength
  if (password.length < 8) {
    return {
      success: false,
      error: "Password must be at least 8 characters.",
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      success: false,
      error: "Password must contain at least one uppercase letter.",
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      success: false,
      error: "Password must contain at least one lowercase letter.",
    };
  }

  if (!/\d/.test(password)) {
    return {
      success: false,
      error: "Password must contain at least one number.",
    };
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return {
      success: false,
      error: "Password must contain at least one special character.",
    };
  }

  // 6. Require acceptance of the terms
  if (!termsAccepted) {
    return {
      success: false,
      error: "Please accept the terms and conditions.",
    };
  }

  // 7. Create the account
  try {
    const result = await createUser({
      name,
      phone,
      email,
      password,
    });

    if (!result.success) {
      return {
        success: false,
        error: result.error || "Unable to create your account.",
      };
    }

    // 8. Sign the new user in
    await createSession({
      id: result.user.id,
      role: result.user.role,
    });

    revalidatePath("/", "layout");

    return {
      success: true,
      redirectTo: "/menu",
    };
  } catch (error) {
    console.error("Registration failed:", error);

    return {
      success: false,
      error: "Unable to create your account right now. Please try again.",
    };
  }
}

// LOGIN
export async function loginUser(formData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  let phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = getSafeNextPath(formData.get("next"));

  // Normalize Ethiopian mobile numbers.
  phone = phone.replace(/[\s()-]/g, "");

  if (/^0[79]\d{8}$/.test(phone)) {
    phone = `+251${phone.slice(1)}`;
  } else if (/^[79]\d{8}$/.test(phone)) {
    phone = `+251${phone}`;
  }

  // Prefer email when supplied; otherwise use phone.
  const identifier = email || phone;

  if (!identifier || !password) {
    return {
      success: false,
      error: "Enter your email or phone number and password.",
    };
  }

  try {
    const user = await verifyUser({
      identifier,
      password,
    });

    if (!user) {
      return {
        success: false,
        error: "Invalid email, phone number, or password.",
      };
    }

    await createSession({
      id: user.id,
      role: user.role,
    });

    revalidatePath("/", "layout");

    return {
      success: true,
      redirectTo: next,
    };
  } catch (error) {
    console.error("Login failed:", error);

    return {
      success: false,
      error: "Unable to sign in right now. Please try again.",
    };
  }
}

// LOGOUT
export async function logoutUser() {
  await deleteSession();
  revalidatePath("/", "layout");

  return {
    success: true,
    redirectTo: "/login",
  };
}

// PLACE ORDER
export async function placeOrder(previousState, formData) {
  const session = await getSession();

  if (!session) {
    return {
      fieldErrors: {},
      success: false,
      error: "Please sign in before placing an order.",
    };
  }

  let items;

  try {
    items = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    return {
      fieldErrors: {},
      success: false,
      error: "The cart data is invalid. Please review your cart.",
    };
  }

  // Normalize Ethiopian mobile numbers before validation.
  let phone = String(formData.get("phone") ?? "").trim();
  phone = phone.replace(/[\s()-]/g, "");

  if (/^0[79]\d{8}$/.test(phone)) {
    phone = `+251${phone.slice(1)}`;
  } else if (/^[79]\d{8}$/.test(phone)) {
    phone = `+251${phone}`;
  }

  const data = {
    name: String(formData.get("name") ?? "").trim(),
    phone,
    email: String(formData.get("email") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    landmark: String(formData.get("landmark") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    deliveryMode: String(formData.get("deliveryMode") ?? ""),
    paymentMethod: String(formData.get("paymentMethod") ?? ""),
    items,
    totalItems: Number(formData.get("totalItems")),
    totalPrice: Number(formData.get("totalPrice")),
    deliveryFee: Number(formData.get("deliveryFee")),
    grandTotal: Number(formData.get("grandTotal")),
    notes: String(formData.get("landmark") ?? "").trim(),
  };

  const result = orderSchema.safeParse(data);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
      success: false,
      error: "Please check your details and try again.",
    };
  }

  try {
    const order = await createOrder(result.data, session.id);

    revalidatePath("/checkout");
    revalidatePath("/orders");

    return {
      fieldErrors: {},
      success: true,
      order,
    };
  } catch (error) {
    console.error("Unable to save order:", error);

    return {
      fieldErrors: {},
      success: false,
      error: "We could not save your order. Please try again.",
    };
  }
}


 // CANCEL ORDER
export async function cancelOrder(orderId) {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      error: "You must be logged in to cancel an order.",
    };
  }

  const order = await getOrder(orderId);

  if (!order || order.userId !== session.id) {
    return {
      success: false,
      error: "Order not found or you are not allowed to cancel it.",
    };
  }

  try {
    const cancelledOrder = await markCancelled(orderId, session.id);

    revalidatePath("/orders");
    revalidatePath("/kitchen");

    return {
      success: true,
      order: cancelledOrder,
    };
  } catch (error) {
    console.error("Unable to cancel order:", error);

    return {
      success: false,
      error: "Unable to cancel this order. Please try again.",
    };
  }
}

// CHECK AUTHENTICATION
export async function checkAuthStatus() {
  const session = await getSession();

  return {
    authenticated: Boolean(session),
  };
}
