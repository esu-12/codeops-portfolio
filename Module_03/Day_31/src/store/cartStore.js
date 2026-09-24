import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],

      addToCart: (dish) =>
        set((state) => {
          const dishId = String(dish.id);

          const existingItem = state.cartItems.find(
            (item) => String(item.id) === dishId
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                String(item.id) === dishId
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item
              ),
            };
          }

          return {
            cartItems: [
              ...state.cartItems,
              {
                ...dish,
                id: dishId,
                price: Number(dish.price),
                quantity: 1,
              },
            ],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => String(item.id) !== String(id)
          ),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              cartItems: state.cartItems.filter(
                (item) => String(item.id) !== String(id)
              ),
            };
          }

          return {
            cartItems: state.cartItems.map((item) =>
              String(item.id) === String(id)
                ? {
                    ...item,
                    quantity,
                  }
                : item
            ),
          };
        }),

      clearCart: () =>
        set({
          cartItems: [],
        }),
    }),

    {
      name: "mesob-house-cart",
    }
  )
);

// Helper hooks

export const useCartItems = () =>
  useCartStore((state) => state.cartItems);

export const useCartTotalItems = () =>
  useCartStore((state) =>
    state.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

export const useCartTotalPrice = () =>
  useCartStore((state) =>
    state.cartItems.reduce(
      (total, item) =>
        total + Number(item.price) * item.quantity,
      0
    )
  );