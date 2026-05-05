"use client";

import { useAuthStore } from "@/app/store/useAuthStore";
import { useEffect } from "react";

export default function AuthInitializer({ children }) {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return children;
}
