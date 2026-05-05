"use client";
import { useBannerStore } from "@/app/store/useBannerStore";
import { useState, useEffect } from "react";

function Hero() {
  const { fetchBanners, isLoading, banners } = useBannerStore();

  useEffect(() => {
    fetchBanners();
  }, []);

  const [current, setCurrent] = useState(0);

  // Auto slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners?.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners?.length) % banners?.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners?.length);
  };

  if (isLoading) {
    return (
      <div className=" w-full md:max-w-6xl mx-auto">
        <div className="relative w-full overflow-hidden md:rounded-b-md h-56 md:h-80">
          <div className="absolute z-20 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
            <button className="w-3 h-3 rounded-full bg-white/50" />
            <button className="w-3 h-3 rounded-full bg-white/50" />
            <button className="w-3 h-3 rounded-full bg-white/50" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" w-full md:max-w-6xl mx-auto">
      <div className="relative w-full overflow-hidden md:rounded-b-md h-56 md:h-80">
        {/* Slides */}
        {banners?.map((item, index) => (
          <img
            key={item._id}
            src={item.image}
            alt={`Slide ${index}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Indicators */}
        <div className="absolute z-20 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
          {banners?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute top-0 left-0 z-20 flex items-center justify-center h-full px-4"
        >
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/50">
            ❮
          </span>
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute top-0 right-0 z-20 flex items-center justify-center h-full px-4"
        >
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/50">
            ❯
          </span>
        </button>
      </div>
    </div>
  );
}

export default Hero;
