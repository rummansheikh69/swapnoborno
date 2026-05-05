"use client";
import { useProductStore } from "@/app/store/useProductStore";
import { CircleX, Loader, Search } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SearchModal() {
  // const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { searchResults, isSearching, searchProductsNavbar } =
    useProductStore();

  // Debounce search input
  useEffect(() => {
    if (!search) return;
    const handler = setTimeout(() => {
      searchProductsNavbar(search);
    }, 500); // 500ms debounce
    return () => clearTimeout(handler);
  }, [search]);

  return (
    <>
      {/* <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <Search size={20} className=" text-black" />
      </div> */}

      <dialog id="search_modal" className="modal">
        <div className="modal-box bg-subMain text-text h-[30rem] p-4 max-w-4xl cursor-default">
          {/* Search Input */}
          <div className="w-full relative">
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none mt-3 w-full bg-lightDark border border-zinc-300 rounded-md pl-9 pr-3 py-2 text-sm tracking-wide"
              placeholder="Search products"
            />
            <button className="absolute left-2 top-[21px]">
              {" "}
              <Search className="w-5 h-5 opacity-60" />{" "}
            </button>
            {search.length > 0 && (
              <div
                onClick={() => setSearch("")}
                className="absolute right-2 top-[21px] cursor-pointer"
              >
                <CircleX className="w-5 h-5 text-zinc-500" />
              </div>
            )}
          </div>

          {/* Search Results */}
          <div className="w-full mt-2 flex flex-col overflow-y-auto max-h-96">
            {isSearching ? (
              <div className="w-full flex items-center justify-center mt-10">
                <Loader className="animate-spin" />
              </div>
            ) : searchResults.length > 0 ? (
              <ul>
                {searchResults.map((product) => (
                  <Link href={`/products/${product._id}`} key={product._id}>
                    <div
                      onClick={() => {
                        setIsOpen(false); // <-- close modal
                        setSearch(""); // <-- reset input
                      }}
                      className="py-2 flex items-start gap-3 hover:bg-main px-4 rounded-md cursor-pointer"
                    >
                      <img
                        src={product?.thumbnailImage}
                        alt={product?.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div>
                        <h2 className="text-lg font-medium text-zinc-800">
                          {product?.title}
                        </h2>
                        <div className="flex items-end gap-2">
                          <h2 className="font-semibold text-xl">
                            ৳ {product?.discountPrice.toLocaleString()}
                          </h2>
                          <h2 className="text-gray-600 line-through mb-[1px]">
                            ৳ {product?.price.toLocaleString()}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </ul>
            ) : (
              <p className="text-xl text-center mt-10 font-medium text-zinc-600">
                {search ? "Nothing Found" : "Search Products"}
              </p>
            )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
}
