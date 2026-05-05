"use client";
import AdminNavigation from "@/app/components/admin/AdminNavigation";
import AuthGuard from "@/app/components/utils/AuthGuard";
import VerificationFormPreview from "@/app/components/utils/VerificationFormPreview";
import { useAdminStore } from "@/app/store/useAdminStore";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

function Page() {
  const { id } = useParams();
  const pdfRef = useRef();

  const {
    getSingleVerification,
    isLoading,
    singleVerification,
    markAsRejected,
    isMarkRejectedLoading,
    markAsVerified,
    isMarkVerifiedLoading,
    deleteVerification,
  } = useAdminStore();

  useEffect(() => {
    getSingleVerification(id);
  }, [id]);
  const handlePrint = () => {
    window.print();
  };

  return (
    <AuthGuard requireAdmin>
      <div className="w-full min-h-screen bg-main">
        <AdminNavigation />

        <div className="max-w-6xl relative mx-auto p-6 lg:px-0 mt-20 space-y-4">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader className="animate-spin" />
            </div>
          ) : (
            <div>
              <div className="flex md:flex-row flex-col items-center md:justify-between">
                <div>
                  <h1 className="capitalize text-lg font-medium">
                    Name: {singleVerification?.userId?.name}
                  </h1>
                  <h1 className="text-sm break-all">
                    Email: {singleVerification?.userId?.email}
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => markAsVerified(singleVerification?._id)}
                    className={`px-4 py-1.5 rounded-md cursor-pointer ${
                      singleVerification?.status === "verified"
                        ? "bg-black text-white"
                        : "bg-zinc-200 text-black"
                    }`}
                  >
                    {isMarkVerifiedLoading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Verified"
                    )}
                  </button>

                  <button
                    onClick={() => markAsRejected(singleVerification?._id)}
                    className={`px-4 py-1.5 rounded-md cursor-pointer ${
                      singleVerification?.status === "rejected"
                        ? "bg-black text-white"
                        : "bg-zinc-200 text-black"
                    }`}
                  >
                    {isMarkRejectedLoading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Rejected"
                    )}
                  </button>

                  <button
                    onClick={() => deleteVerification(singleVerification?._id)}
                    className="px-4 py-1.5 rounded-md ml-10 cursor-pointer bg-black text-white"
                  >
                    Delete
                  </button>

                  {/* PDF DOWNLOAD BUTTON */}

                  <button
                    onClick={handlePrint}
                    className="px-4 py-1.5 rounded-md cursor-pointer bg-zinc-200 text-black"
                  >
                    Print
                  </button>
                </div>
              </div>

              <div className="print-area mt-10">
                <VerificationFormPreview
                  position="admin"
                  verificationForm={singleVerification}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

export default Page;
