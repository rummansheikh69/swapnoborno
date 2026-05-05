"use client";
import AdminNavigation from "@/app/components/admin/AdminNavigation";
import AuthGuard from "@/app/components/utils/AuthGuard";
import { useAdminStore } from "@/app/store/useAdminStore";
import Link from "next/link";
import { useEffect, useState } from "react";

function page() {
  const { getAllVerificatios, isLoading, verificatios } = useAdminStore();

  const [verificationStatus, setverificationStatus] = useState("pending");
  useEffect(() => {
    getAllVerificatios(verificationStatus);
  }, [verificationStatus]);

  return (
    <AuthGuard requireAdmin>
      <div className=" w-full min-h-screen bg-main">
        <AdminNavigation />

        <div className="max-w-6xl relative mx-auto p-6 lg:px-0 mt-20 space-y-4">
          <div className=" flex items-center gap-4">
            <button
              onClick={() => setverificationStatus("pending")}
              className={`${verificationStatus === "pending" ? "bg-black text-white" : " bg-zinc-200 text-black"} px-4 py-1.5 rounded-md `}
            >
              Pending
            </button>
            <button
              onClick={() => setverificationStatus("verified")}
              className={`${verificationStatus === "verified" ? "bg-black text-white" : " bg-zinc-200 text-black"} px-4 py-1.5 rounded-md `}
            >
              Verified
            </button>
            <button
              onClick={() => setverificationStatus("rejected")}
              className={`${verificationStatus === "rejected" ? "bg-black text-white" : " bg-zinc-200 text-black"} px-4 py-1.5 rounded-md `}
            >
              Rejected
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5">
            {isLoading ? (
              <div className=" w-full absolute inset-0 flex items-center justify-center">
                Loading...
              </div>
            ) : (
              verificatios &&
              verificatios?.map((verification, index) => (
                <div
                  key={verification?.id}
                  className=" bg-white rounded-lg shadow-lg  border border-zinc-200 p-3 cursor-pointer"
                >
                  <Link href={`/admin/verification/${verification?._id}`}>
                    <p className="text-lg bg-zinc-200 text-center rounded-md p-1 text-gray-600">
                      #{index + 1}
                    </p>
                    <h1 className=" break-words whitespace-normal capitalize text-lg font-medium">
                      Name: {verification?.userId?.name}
                    </h1>
                    <h1 className=" break-all whitespace-normal text-sm ">
                      Email: {verification?.userId?.email}
                    </h1>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

export default page;
