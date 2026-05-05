"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function LoginGuard({ children }) {
  const router = useRouter();

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isCheckingAuth && authUser) {
      router.replace("/");
    }
  }, [authUser, isCheckingAuth, router]);

  // While checking auth, prevent flashing
  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // If not authenticated, return null (redirect will happen)
  if (authUser) return null;

  return children;
}
