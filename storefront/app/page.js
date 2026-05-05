import Image from "next/image";
import Hero from "./components/home/Hero";
import Category from "./components/home/Category";
import Products from "./components/home/Products";

export default function Home() {
  return (
    <div className=" min-h-screen w-full ">
      <div className=" w-full md:max-w-6xl mx-auto">
        <Hero />

        <Category />

        <div className="w-full my-10 border-b border-zinc-300" />
        <Products />
      </div>
    </div>
  );
}
