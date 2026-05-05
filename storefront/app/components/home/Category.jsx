"use client";
import { useAdminStore } from "@/app/store/useAdminStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Category() {
  const { fetchCategories, categories } = useAdminStore();

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (!categories || categories.length === 0) return null;

  return (
    <div className="w-full mt-6 px-3 md:px-0">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {categories.map((item) => (
          <div
            key={item._id}
            className="relative h-32 w-full rounded-md overflow-hidden group cursor-pointer"
          >
            <Link
              href={`/category/${item?.link}`} // ⚠️ don't use item.link unless DB has it
              className="w-full h-full flex items-center justify-center"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-110 transition-all duration-500"
              />

              <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-bold uppercase text-lg md:text-2xl">
                <h2 className="drop-shadow-xl break-all text-center whitespace-normal px-4">
                  {item.name}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
