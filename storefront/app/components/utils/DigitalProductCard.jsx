"use client";
import { redirectDigitalToWp } from "@/app/lib/redirectDigitalToWp";
import Image from "next/image";

function DigitalProductCard({ product, position }) {
  return (
    <div
      onClick={() =>
        redirectDigitalToWp({
          productName: product?.title,
          productPrice: product?.price,
        })
      }
      className="col-span-4 md:col-span-1"
    >
      <div className="w-full h-max flex flex-row md:flex-col gap-4 items-center bg-[#eeeeee] rounded-md md:pb-5 cursor-pointer">
        <div className="w-20 md:w-full h-20 md:h-52 rounded-l-lg md:rounded-t-lg overflow-hidden relative">
          <Image
            src={product?.image}
            alt={product?.title}
            fill
            className="object-cover"
          />
        </div>
        <h2 className="text-xl font-medium md:mt-2 break-all whitespace-normal">
          {product?.title}
        </h2>
        <h2 className="text-xl font-bold text-zinc-600 ">
          {product?.price} TK
        </h2>
      </div>
    </div>
  );
}

export default DigitalProductCard;
