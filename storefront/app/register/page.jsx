"use client";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import toast from "react-hot-toast";
import LoginGuard from "../components/utils/LoginGuard";
import { useAuthStore } from "../store/useAuthStore";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password !== formData.confirmPassword)
      return toast.error("Passwords do not match");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signUp(formData);
  };
  return (
    <LoginGuard>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
        <div className="w-[420px] text-center bg-white px-10 py-6 rounded-md shadow-md">
          {/* Logo */}
          <div className="mb-12 flex flex-col items-center">
            <Image
              src={"/logo.jpeg"}
              width={120}
              height={120}
              alt="Logo"
              className=" rounded-full"
            />
            <p className="text-xs tracking-wider text-gray-500">
              CREATE YOUR ACCOUNT
            </p>
          </div>
          {/* Form */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="text-left">
              <label className="text-xs uppercase tracking-wide text-gray-600 mb-2 block">
                Name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border-b border-gray-400 focus:border-black outline-none p-2 text-sm bg-transparent"
              />
            </div>
            {/* Email */}
            <div className="text-left">
              <label className="text-xs uppercase tracking-wide text-gray-600 mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border-b border-gray-400 focus:border-black outline-none p-2 text-sm bg-transparent"
              />
            </div>

            {/* Create Password */}
            <div className="text-left">
              <label className="text-xs uppercase tracking-wide text-gray-600 mb-2 block">
                Create Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full border-b border-gray-400 focus:border-black outline-none p-2 text-sm bg-transparent"
              />
            </div>

            {/* Confirm Password */}
            <div className="text-left">
              <label className="text-xs uppercase tracking-wide text-gray-600 mb-2 block">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full border-b border-gray-400 focus:border-black outline-none p-2 text-sm bg-transparent"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                required
                className="w-4 h-4 accent-black"
              />
              <span>
                I agree to the{" "}
                <Link href="tos" className="underline text-gray-900">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="policy" className="underline text-gray-900">
                  Privacy Policy
                </Link>
              </span>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-black text-white p-3 text-xs tracking-widest hover:bg-gray-800 transition rounded"
            >
              {isSigningUp ? "Registering..." : "REGISTER"}
            </button>
          </form>
          {/* Login Link */}
          <p className=" mt-3">
            Already have account?{" "}
            <Link
              href="/login"
              className="font-bold text-black hover:underline text-sm"
            >
              Login
            </Link>
          </p>

          {/* Footer */}
          <footer className="mt-10 text-[11px] text-gray-400 tracking-wider">
            © {new Date().getFullYear()} LUXE. ALL RIGHTS RESERVED.
          </footer>
        </div>
      </div>
    </LoginGuard>
  );
}
