"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const existing = get().cart.find((item) => item._id === product._id);

        if (existing) {
          set({
            cart: get().cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({
            cart: [
              ...get().cart,
              {
                _id: product._id,
                title: product.title,
                thumbnailImage: product.thumbnailImage,
                price: Number(product.price),
                discountPrice: Number(product.discountPrice),
                quantity: 1,
              },
            ],
          });
        }
      },

      increaseQty: (_id) => {
        set({
          cart: get().cart.map((item) =>
            item._id === _id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        });
      },

      decreaseQty: (_id) => {
        set({
          cart: get().cart.map((item) =>
            item._id === _id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        });
      },

      removeFromCart: (_id) => {
        set({
          cart: get().cart.filter((item) => item._id !== _id),
        });
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
