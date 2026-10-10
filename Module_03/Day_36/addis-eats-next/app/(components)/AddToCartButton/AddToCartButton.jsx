// app/(components)/AddToCartButton/AddToCartButton.jsx
"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../../providers";

export default function AddToCartButton({ dish }) {
  const router = useRouter();
  const { addToCart } = useCart();

  function handleAddToCart() {
    const loggedIn =
      localStorage.getItem("addisEatsLoggedIn") === "true";

    if (!loggedIn) {
      router.push("/login?redirect=/menu");
      return;
    }

    addToCart({
      id: dish.id,
      name: dish.nameEn,
      price: dish.priceETB,
      image: dish.image,
    });
  }

  return (
    <button
      type="button"
      className="add-to-cart"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
}