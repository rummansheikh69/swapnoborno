"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function AdminNavigation() {
  const pathname = usePathname();

  const navItems = [
    // { name: "Providers", path: "/admin/manage-provider" },
    { name: "Products", path: "/admin/products" },
    // { name: "Digital", path: "/admin/digital" },
    // { name: "Verification", path: "/admin/verification" },
    { name: "Banner", path: "/admin/banner" },
    { name: "Categories", path: "/admin/categories" },
    // { name: "Rules", path: "/admin/rules" },
    // { name: "Officers", path: "/admin/officers" },
  ];

  return (
    <div className="flex items-center justify-center my-14 md:my-20">
      <div className="px-6 md:px-0 w-full md:w-[40rem]">
        <div className="grid grid-cols-3 gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`col-span-2 md:col-span-1 h-10 rounded-md shadow-md flex items-center justify-center cursor-pointer transition-all duration-200
                  ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-zinc-100 text-black hover:bg-zinc-200"
                  }`}
              >
                <p className="text-sm font-medium">{item.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminNavigation;
