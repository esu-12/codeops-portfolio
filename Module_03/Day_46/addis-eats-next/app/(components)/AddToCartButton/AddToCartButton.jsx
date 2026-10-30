// app/(components)/AddToCartButton/AddToCartButton.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuthStatus } from "@/app/actions";
import { useCart } from "../../providers";

export default function AddToCartButton({ dish }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isChecking, setIsChecking] = useState(false);

  async function handleAddToCart() {
    if (isChecking) return;

    setIsChecking(true);

    try {
      const result = await checkAuthStatus();
      if (!result.authenticated) {
        router.push(
          `/login?next=${encodeURIComponent("/menu")}`
        );
        return;
      }

      addToCart({
        id: dish.id,
        name: dish.nameEn,
        price: dish.priceETB,
        image: dish.image,
      });
    } catch (error) {
      console.error("Unable to verify your session:", error);
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <button
      type="button"
      className="add-to-cart"
      onClick={handleAddToCart}
      disabled={isChecking}
    >
      {isChecking ? "Checking..." : "Add to Cart"}
    </button>
  );
}