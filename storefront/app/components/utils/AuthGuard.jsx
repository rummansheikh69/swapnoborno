"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function AuthGuard({ children, requireAdmin = false }) {
  const router = useRouter();

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isCheckingAuth) {
      if (!authUser) {
        router.replace("/");
      } else if (requireAdmin && !authUser.isAdmin) {
        router.replace("/");
      }
    }
  }, [authUser, isCheckingAuth, requireAdmin, router]);

  // While checking auth, prevent flashing
  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // If not authenticated, return null (redirect will happen)

  if (!authUser) return null;
  if (requireAdmin && !authUser.isAdmin) return null;

  return children;
}
