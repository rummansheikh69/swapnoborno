"use client";
import {
  ArrowRight,
  Delete,
  Minus,
  Plus,
  ShoppingBagIcon,
  ShoppingCart,
  Trash,
} from "lucide-react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

function CartDrawer() {
  const checkboxRef = useRef(null);
  const cartItems = [
    {
      _id: "hdfn",
      name: "Headphones with comatozze saree",
      image:
        "https://media.istockphoto.com/id/93355119/photo/indian-saris.jpg?s=612x612&w=0&k=20&c=afmfiTJg0VAmIY6P_TJ_JYsTfGhUdevv18WXQRUZ8NQ=",
      discountPrice: 2944320,
      price: 200,
    },
    {
      _id: "fw4g",
      name: "Headphones with comatozze saree",
      image:
        "https://media.istockphoto.com/id/93355119/photo/indian-saris.jpg?s=612x612&w=0&k=20&c=afmfiTJg0VAmIY6P_TJ_JYsTfGhUdevv18WXQRUZ8NQ=",
      discountPrice: 290,
      price: 200,
    },
    {
      _id: "sfg3",
      name: "Headphones with comatozze saree",
      image:
        "https://media.istockphoto.com/id/93355119/photo/indian-saris.jpg?s=612x612&w=0&k=20&c=afmfiTJg0VAmIY6P_TJ_JYsTfGhUdevv18WXQRUZ8NQ=",
      discountPrice: 290,
      price: 200,
    },
    {
      _id: "sfew",
      name: "Headphones with comatozze saree",
      image:
        "https://media.istockphoto.com/id/93355119/photo/indian-saris.jpg?s=612x612&w=0&k=20&c=afmfiTJg0VAmIY6P_TJ_JYsTfGhUdevv18WXQRUZ8NQ=",
      discountPrice: 290,
      price: 200,
    },
  ];
  return (
    // make drawer/container full height so it always spans viewport (especially on mobile)
    <div className="drawer drawer-end z-40 h-full">
      <input
        ref={checkboxRef}
        id="cart-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content h-full">
        {/* Page content here */}
        <label htmlFor="cart-drawer" className=" drawer-button">
          <div className=" relative cursor-pointer">
            <div className=" absolute -top-1.5 -right-1 bg-black text-white rounded-full size-4 text-xs flex items-center justify-center">
              1
            </div>

            <ShoppingBagIcon size={20} />
          </div>
        </label>
      </div>
      <div className="drawer-side w-full h-full">
        <label
          htmlFor="cart-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu flex flex-col bg-main min-h-full w-80 md:w-[30rem]  p-4">
          <div className=" pb-2 border-b border-border">
            <div className=" flex items-center gap-3">
              <div className=" size-9 rounded-full bg-subMain flex items-center justify-center">
                <ShoppingCart size={20} />
              </div>
              <h2 className=" text-lg text-zinc-500 font-medium">Your Cart</h2>
            </div>
          </div>
          <div className=" flex-1 mt-2">
            {cartItems.map((product) => (
              <div
                key={product?._id}
                className="flex items-center justify-between py-3 border-b border-border group"
              >
                <div className=" flex items-start gap-2">
                  <div className=" size-14 rounded-md relative overflow-hidden">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      fill
                      className=" object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl text-zinc-800 truncate w-[17rem]">
                      {product?.name}
                    </h2>

                    <div className=" flex items-end gap-2">
                      <h2 className=" font-medium text-lg  ">
                        <span className="font-bangla-regular text-xl">৳</span>

                        {Number(product.discountPrice).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* quantity  */}
                <div className=" flex flex-col items-end justify-between">
                  <div className=" size-7 rounded-full block group-hover:hidden "></div>
                  <div className=" size-7 rounded-full hidden group-hover:flex items-center justify-center bg-subMain hover:bg-red-500 hover:text-white duration-200 ">
                    <Trash size={15} />
                  </div>
                  <div className=" flex items-center gap-2">
                    <div className=" cursor-pointer">
                      <Minus className=" text-zinc-500" />
                    </div>
                    <div className=" size-6 rounded-md flex items-center justify-center border border-border">
                      <span className=" text-lg ">1</span>
                    </div>
                    <div className=" cursor-pointer">
                      <Plus className=" text-zinc-500" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" h-max bg-subMain sticky bottom-0 rounded-t-md border border-border py-3 px-5">
            <div className=" flex items-center justify-between">
              <h2 className=" text-lg  ">Sub Total</h2>
              <h2 className=" text-lg font-medium ">
                <span className="font-bangla-regular">৳</span>
                1234
              </h2>
            </div>
            <div className=" flex items-center justify-between">
              <h2 className=" text-lg  ">Discount</h2>
              <h2 className=" text-lg font-medium ">
                <span className="font-bangla-regular">৳</span>
                33
              </h2>
            </div>

            <div className=" border-b border-zinc-300 w-full border-dashed py-1.5"></div>
            <div className=" flex items-center justify-between">
              <h2 className=" text-xl font-medium ">Total</h2>
              <h2 className=" text-xl font-medium ">
                <span className="font-bangla-regular">৳</span>
                1200
              </h2>
            </div>
            <Link
              onClick={() => {
                checkboxRef.current.checked = false;
              }}
              href="/cart"
            >
              <div className=" w-full h-10 rounded-full bg-black text-white flex items-center gap-2 justify-center mt-2 cursor-pointer hover:bg-black/90 duration-200 ">
                <h2 className=" text-lg mb-1">Checkout</h2>
                <ArrowRight size={20} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
