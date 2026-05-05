"use client";
import {
  HeartIcon,
  Loader,
  Search,
  SearchIcon,
  ShoppingBagIcon,
  User,
} from "lucide-react";
import Link from "next/link";
import SearchModal from "../utils/SearchModal";
import Image from "next/image";
import { useCartStore } from "@/app/store/useCartStore";
import { useAuthStore } from "@/app/store/useAuthStore";
import { LuIdCard } from "react-icons/lu";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FiBox } from "react-icons/fi";
import { MdOutlineSimCard } from "react-icons/md";
import { LuShieldCheck } from "react-icons/lu";
import { RiComputerLine } from "react-icons/ri";

function Navbar() {
  const { cart } = useCartStore();
  const { authUser, isLoggingOut, logout } = useAuthStore();
  return (
    <div className=" w-full bg-subMain h-16 border-b border-border fixed top-0 left-0 z-50">
      <div className=" md:max-w-6xl md:mx-auto flex items-center h-full justify-between px-3 md:px-0">
        <div className=" py-2">
          <Link href="/">
            <Image
              src={"/logo.jpeg"}
              width={50}
              height={50}
              alt="Logo"
              className=" rounded-full"
            />
          </Link>
        </div>

        <div className=" flex items-center gap-5">
          <div
            className="cursor-pointer p-1"
            onClick={() => document.getElementById("search_modal").showModal()}
          >
            <Search size={20} className=" text-black" />
          </div>
          <SearchModal />
          <Link href="/cart">
            <div className=" relative cursor-pointer">
              {cart.length > 0 && (
                <div className=" absolute -top-1.5 -right-1 bg-black text-white rounded-full size-4 text-xs flex items-center justify-center">
                  {cart.length}
                </div>
              )}

              <ShoppingBagIcon size={20} className=" text-black" />
            </div>
          </Link>
          {/* <div className=" relative cursor-pointer">
            <div className=" absolute -top-1.5 -right-1 bg-black text-white rounded-full size-4 text-xs flex items-center justify-center">
              1
            </div>
            <HeartIcon size={20} />
          </div> */}
          {authUser ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className=" cursor-pointer size-10 rounded-full border border-border flex items-center justify-center gap-1 hover:bg-main duration-200"
              >
                <User size={20} className="text-black" />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-zinc-100 rounded-box z-1 w-52 p-2 shadow-sm mt-4"
              >
                {authUser && authUser?.isAdmin && (
                  <>
                    <li>
                      <Link href="/admin/products">
                        <div className=" flex items-center gap-2">
                          <FiBox size={20} className="text-black" />

                          <p>Products</p>
                        </div>
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <Link href="/profile">
                    <div className=" flex items-center gap-2">
                      <LuIdCard size={20} className="text-black" />

                      <p>Profile</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <div
                    onClick={() => logout()}
                    className=" flex items-center gap-2 mt-1"
                  >
                    {isLoggingOut ? (
                      <Loader size={20} className="text-black animate-spin" />
                    ) : (
                      <AiOutlinePoweroff size={20} className="text-black" />
                    )}

                    <p>Logout</p>
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login">
              <div className=" cursor-pointer w-24 h-8 rounded-md border border-border flex items-center justify-center gap-1 hover:bg-main duration-200">
                <div>
                  <User size={20} className="text-black" />
                </div>
                <span className=" text-black">Login</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
