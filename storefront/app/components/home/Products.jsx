"use client";
import { useEffect } from "react";
import ProductCard from "../products/ProductCard";
import { useProductStore } from "@/app/store/useProductStore";

function Products() {
  const { products, hasMore, isLoading, fetchProducts, setFilter, filters } =
    useProductStore();

  const options = [
    { label: "All", value: "newest" },
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Customer Rating", value: "rating_desc" },
  ];

  // First Load
  useEffect(() => {
    fetchProducts(true);
  }, []);

  // When sort changes → reset + fetch
  useEffect(() => {
    fetchProducts(true);
  }, [filters.sort]);

  return (
    <div className="pb-10 w-full grid grid-cols-12 gap-10">
      {/* Sidebar */}
      <div className="col-span-3 bg-subMain sticky top-20 rounded-md h-max p-5 hidden md:block">
        <h2 className="font-medium text-zinc-600">Filter</h2>

        <div className="flex gap-2 mt-3">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => setFilter("minPrice", e.target.value)}
            className="w-full h-8 border rounded-md pl-2 text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => setFilter("maxPrice", e.target.value)}
            className="w-full h-8 border rounded-md pl-2 text-sm"
          />
        </div>

        <button
          onClick={() => fetchProducts(true)}
          className="mt-3 w-full bg-black text-white py-2 rounded-md"
        >
          Apply Filter
        </button>

        <h2 className="font-medium text-zinc-600 mt-6">Sort By</h2>

        <div className="space-y-2 mt-2">
          {options.map((option) => (
            <label key={option.value} className="flex gap-2">
              <input
                type="radio"
                checked={filters.sort === option.value}
                onChange={() => setFilter("sort", option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className=" col-span-12 md:col-span-9 px-3">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {products?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              disabled={isLoading}
              onClick={() => fetchProducts()}
              className="px-6 py-2 bg-black text-white rounded-md disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
