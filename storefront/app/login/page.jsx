"use client";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import LoginGuard from "../components/utils/LoginGuard";

export default function page() {
  const { login, isLoggingIn } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) login(formData);
  };
  return (
    <LoginGuard>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white w-[380px] px-10 py-12 text-center shadow-md rounded-md">
          {/* Logo */}
          <div className="mb-10 flex flex-col items-center">
            <Image
              src={"/logo.jpeg"}
              width={120}
              height={120}
              alt="Logo"
              className=" rounded-full"
            />

            <p className="text-xs text-gray-500">WELCOME BACK</p>
          </div>
          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="text-left">
              <label className="text-xs text-gray-600 uppercase mb-1 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border-b border-gray-300 focus:border-black outline-none p-2 bg-transparent text-sm"
              />
            </div>

            {/* Password */}
            <div className="text-left">
              <label className="text-xs text-gray-600 uppercase mb-1 block">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full border-b border-gray-300 focus:border-black outline-none p-2 bg-transparent text-sm"
              />
            </div>

            {/* Options */}
            <div className="flex justify-between items-center text-xs text-gray-600 mb-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-black" />
                Remember me
              </label>
              <a className="hover:underline">Forgot password?</a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-black text-white p-3 text-sm tracking-widest hover:bg-gray-800 transition rounded"
            >
              {isLoggingIn ? "Logging in..." : "LOG IN"}
            </button>
          </form>
          {/* Register */}
          <p className="mt-3">
            Not a member?{" "}
            <Link
              href="/register"
              className="font-bold text-black hover:underline text-sm "
            >
              Create an Account
            </Link>
          </p>

          {/* Footer */}
          <footer className="mt-8 text-[10px] text-gray-400">
            <p>© {new Date().getFullYear()} LUXE. All Rights Reserved.</p>
          </footer>
        </div>
      </div>
    </LoginGuard>
  );
}
