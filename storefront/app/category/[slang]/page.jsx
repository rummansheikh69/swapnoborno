"use client";
import ProductCard from "@/app/components/products/ProductCard";
import { useUtilsStore } from "@/app/store/useUtilsStore";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const [mounted, setMounted] = useState(false);

  const params = useParams();
  const slang = params?.slang;

  const { productsByCategory, fetchProductsByCategory, isLoading } =
    useUtilsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (slang) {
      fetchProductsByCategory(slang);
    }
  }, [slang, fetchProductsByCategory]);

  // 🔥 Prevent SSR mismatch completely
  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className=" h-screen flex items-center justify-center">
        <Loader className=" animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full md:max-w-6xl mx-auto">
      <div className="w-full flex items-center justify-center text-2xl font-bold my-20">
        #{slang}
      </div>

      <div className=" px-3 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 ">
          {productsByCategory?.length === 0 ? (
            <div className="flex items-center justify-center h-screen text-zinc-400 col-span-full">
              No products found
            </div>
          ) : (
            productsByCategory?.map((product) => (
              <ProductCard key={product?._id} product={product && product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
