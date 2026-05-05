import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BottomNavigation from "./components/layout/BottomNavigation";
import AuthInitializer from "./components/utils/AuthInitializer";
import { Toaster } from "react-hot-toast";

const banglaRegular = localFont({
  variable: "--font-bangla-regular",
  src: [
    {
      path: "./fonts/Li_Purno_Pran.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "স্বপ্নবর্ণ - Authentic Sirajganj Handloom Sarees",
  description:
    "সিরাজগঞ্জের সেই ঐতিহ্যবাহী তাঁত শাড়ি ​আমাদের গ্রামের দক্ষ কারিগরদের হাতে তৈরি সেরা মানের শাড়িগুলো সরাসরি ফ্যাক্টরি থেকে সংগ্রহ করে আমরা পৌঁছে দিচ্ছি আপনার দরজায়।",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="swapnoborno" />
      </head>
      <body
        // ensure the body is at least viewport height so descendant height-full works
        className={`${geistSans.variable} ${geistMono.variable} ${banglaRegular.variable} antialiased bg-main text-zinc-900 min-h-screen w-full`}
      >
        <AuthInitializer>
          <Navbar />
          <div className=" pt-16">{children}</div>
          <Footer />
          <Toaster position="bottom-center" />
          {/* <BottomNavigation /> */}
        </AuthInitializer>
      </body>
    </html>
  );
}
