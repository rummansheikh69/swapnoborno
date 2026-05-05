import { Heart, ShoppingBag, ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import Rating from "./Rating";
import Link from "next/link";
import { useCartStore } from "@/app/store/useCartStore";

function ProductCard({ product }) {
  const cartItem = useCartStore((state) =>
    state.cart.find((item) => item._id === product._id),
  );

  const addToCart = useCartStore((s) => s.addToCart);
  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);
  return (
    <div className=" h-[26rem] bg-subMain rounded-md border border-border relative overflow-hidden cursor-pointer">
      <Link href={`/products/${product._id}`}>
        <div className=" w-full h-3/5 bg-red-500 group relative overflow-hidden">
          {/* <div
          className=" z-20 absolute top-2 right-2 size-10 rounded-full hover:bg-red-500 duration-300 ease-in-out flex items-center justify-center text-white lg:tooltip lg:tooltip-left tooltip-accent"
          data-tip="Add to wishlist"
        >
          <Heart size={20} />
        </div> */}
          <Image
            src={product?.thumbnailImage}
            alt={product?.title}
            fill
            className="object-cover group-hover:scale-110 transition-all duration-500"
          />
        </div>
      </Link>

      <div className=" h-full px-3 py-2">
        <Link href={`/products/${product._id}`}>
          <h2 className=" text-[18.5px] font-medium text-nowrap truncate cursor-pointer font-bangla-regular ">
            {product?.title}
          </h2>
          <Rating
            rating={product?.rating}
            reviewCount={product?.totalReviews}
          />
          <h2>
            In Stock{" "}
            <span className=" font-medium text-teal-900">
              {product?.inStock}
            </span>
          </h2>
        </Link>

        <div className=" flex items-end gap-2">
          <h2 className=" font-medium text-2xl  ">
            <span className="font-bangla-regular">৳</span>

            {Number(product?.discountPrice).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h2>
          <h2 className=" text-gray-600 line-through mb-[1px]">
            <span className="font-bangla-regular">৳</span>
            {Number(product?.price).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h2>
        </div>

        {/* 🔥 CONDITIONAL BUTTON */}
        {!cartItem ? (
          // ADD TO CART
          <div
            className="w-full rounded-full bg-contrast hover:bg-[#65b119] h-8 flex items-center justify-center gap-2 text-white mt-2 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
          >
            <ShoppingBagIcon size={15} />
            <h2 className="text-sm font-medium">Add to Cart</h2>
          </div>
        ) : (
          // QUANTITY CONTROLLER
          <div className="w-full flex items-center justify-between mt-2 border border-zinc-300 rounded-full overflow-hidden">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                decreaseQty(product._id);
              }}
              className="px-4 py-1 bg-gray-100 hover:bg-gray-200"
            >
              -
            </button>

            <span className="px-4 font-medium">{cartItem.quantity}</span>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                increaseQty(product._id);
              }}
              className="px-4 py-1 bg-gray-100 hover:bg-gray-200"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
