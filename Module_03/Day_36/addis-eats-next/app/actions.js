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

  // Validate contact and delivery details on the server.
  const name = String(formData.get("name") ?? "").trim();
  const rawPhone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const landmark = String(formData.get("landmark") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();

  if (!name || !rawPhone || !address || !city) {
    return {
      fieldErrors: {},
      success: false,
      error: "Name, phone, street address, and neighborhood are required.",
    };
  }

  let phone = rawPhone.replace(/[\s()-]/g, "");

  if (/^0[79]\d{8}$/.test(phone)) {
    phone = `+251${phone.slice(1)}`;
  } else if (/^[79]\d{8}$/.test(phone)) {
    phone = `+251${phone}`;
  }

  let requestedItems;

  try {
    requestedItems = JSON.parse(
      String(formData.get("items") ?? "[]")
    );
  } catch {
    return {
      fieldErrors: {},
      success: false,
      error: "Your cart data is invalid. Please review your cart.",
    };
  }

  if (
    !Array.isArray(requestedItems) ||
    requestedItems.length === 0 ||
    requestedItems.length > 50
  ) {
    return {
      fieldErrors: {},
      success: false,
      error: "Your cart is empty or contains too many items.",
    };
  }

  // Read current prices from the existing menu backend.
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://addis-eats-backend.onrender.com";

  let menu;

  try {
    const response = await fetch(`${apiUrl}/menu/`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Menu request failed: ${response.status}`);
    }

    const payload = await response.json();
    menu = Array.isArray(payload.data)
      ? payload.data
      : Array.isArray(payload)
        ? payload
        : [];

    if (menu.length === 0) {
      throw new Error("The menu response is empty.");
    }
  } catch (error) {
    console.error("Checkout menu lookup failed:", error);

    return {
      fieldErrors: {},
      success: false,
      error: "We could not verify menu prices. Please try again shortly.",
    };
  }

  // Never trust the prices, names, or totals submitted by the browser.
  const verifiedItems = [];

  for (const requested of requestedItems) {
    if (
      !requested ||
      typeof requested.id !== "string" ||
      !Number.isInteger(requested.quantity) ||
      requested.quantity < 1 ||
      requested.quantity > 50
    ) {
      return {
        fieldErrors: {},
        success: false,
        error: "An item in your cart has invalid details.",
      };
    }

    const dish = menu.find(
      (item) => String(item.id) === requested.id
    );

    if (!dish || !Number.isFinite(Number(dish.priceETB))) {
      return {
        fieldErrors: {},
        success: false,
        error: "A menu item could not be verified. Please refresh your cart.",
      };
    }

    if (dish.available === false) {
      return {
        fieldErrors: {},
        success: false,
        error: `${dish.nameEn || "A menu item"} is currently unavailable.`,
      };
    }

    verifiedItems.push({
      id: String(dish.id),
      name: String(dish.nameEn || dish.name || "Menu item"),
      price: Number(dish.priceETB),
      quantity: requested.quantity,
      description: String(dish.description || ""),
      image: String(dish.image || ""),
    });
  }

  const totalItems = verifiedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = verifiedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Keep the delivery fee consistent with checkout for now.
  const deliveryFee = 158;
  const grandTotal = totalPrice + deliveryFee;

  const data = {
    name,
    phone,
    email,
    address,
    landmark,
    city,
    deliveryMode: String(formData.get("deliveryMode") ?? ""),
    paymentMethod: String(formData.get("paymentMethod") ?? ""),
    items: verifiedItems,
    totalItems,
    totalPrice,
    deliveryFee,
    grandTotal,
    notes: landmark,
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
