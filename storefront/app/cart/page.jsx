"use client";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldEllipsis } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { redirectCartToWhatsApp } from "../lib/redirectCartToWhatsApp";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCartStore();

  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.discountPrice * item.quantity,
      0,
    );
  }, [cart]);

  const totalDiscount = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + (item.price - item.discountPrice) * item.quantity,
      0,
    );
  }, [cart]);

  const total = subtotal;

  return (
    <div className="bg-[#f4f4f4] min-h-screen py-16 px-6 md:px-0">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-light">Cart Items</h1>
            <span className="text-gray-500">{cart.length} items</span>
          </div>

          {cart.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-2xl mb-4">Your cart is empty</h2>
              <Link href="/" className="text-[#7a8f7c] hover:underline">
                Continue Shopping
              </Link>
            </div>
          )}

          <div className="space-y-10">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-300 pb-8"
              >
                <div className="flex gap-6 items-center">
                  <div className="relative w-32 h-24 bg-gray-200 rounded">
                    <Image
                      src={item.thumbnailImage}
                      alt={item.title}
                      fill
                      className="object-contain rounded"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-medium">{item.title}</h2>

                    <p className="text-lg text-[#7a8f7c] font-semibold">
                      ৳{item.discountPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-6 mt-6 sm:mt-0">
                  <div className="flex border border-zinc-300 rounded overflow-hidden">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                    >
                      -
                    </button>

                    <span className="px-6 py-2">{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-gray-400 hover:text-black text-xl"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {cart.length > 0 && (
            <Link
              href="/"
              className="inline-block mt-10 text-[#7a8f7c] hover:underline"
            >
              ← Continue Shopping
            </Link>
          )}
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        {cart.length > 0 && (
          <div className="bg-[#8a9a8b] text-white p-10 rounded">
            <h2 className="text-2xl mb-10 font-light">Checkout Summary</h2>

            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span>- ৳{totalDiscount.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-white/40 my-8"></div>

            <div className="flex justify-between text-3xl font-semibold mb-10">
              <span>Total</span>
              <span>৳{total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => redirectCartToWhatsApp(cart)}
              className="w-full bg-black py-4 uppercase tracking-widest text-sm hover:bg-gray-900 transition"
            >
              Checkout
            </button>

            <p className="text-sm text-white/70 mt-6 text-center flex items-center justify-center gap-1">
              <ShieldEllipsis size={14} />
              Secure Checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
