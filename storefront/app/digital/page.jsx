"use client";

import Image from "next/image";
import DigitalProductCard from "../components/utils/DigitalProductCard";
import { useUtilsStore } from "../store/useUtilsStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function page() {
  const { isLoading, products, fetchProducts } = useUtilsStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="py-10 w-full grid grid-cols-4 gap-3 md:gap-10 max-w-6xl relative mx-auto min-h-screen px-3 md:px-0">
      {isLoading ? (
        <div className=" absolute inset-0 flex items-center justify-center h-screen">
          <Loader className=" animate-spin text-black" />
        </div>
      ) : (
        products?.map((product) => (
          <DigitalProductCard key={product?._id} product={product} />
        ))
      )}

      {!isLoading && products?.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center h-screen text-zinc-400">
          No products found
        </div>
      )}
    </div>
  );
}

export default page;
