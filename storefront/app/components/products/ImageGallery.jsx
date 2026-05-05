"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Check,
  ChevronsRightLeft,
  ChevronLeft,
  ChevronRight,
  X,
  Loader,
} from "lucide-react";
import { useSwipeable } from "react-swipeable";

function ImageGallery({ images }) {
  const isGettingSingleService = false;

  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0); // for progress bar
  const intervalRef = useRef(null);
  const thumbRefs = useRef([]);
  thumbRefs.current = images?.map(
    (_, i) => thumbRefs.current[i] ?? React.createRef(),
  );

  // Scroll thumbnail into view
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      const node = thumbRefs.current[current]?.current;
      if (node) {
        node.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [current]);

  const openFullscreen = () => setIsFullscreen(true);
  const closeFullscreen = () => setIsFullscreen(false);

  const nextImage = () => {
    if (images?.length > 0) {
      setCurrent((prev) => (prev + 1) % images?.length);
    }
  };

  const prevImage = () => {
    if (images?.length > 0) {
      setCurrent((prev) => (prev - 1 + images?.length) % images?.length);
    }
  };
  const selectImage = useCallback((index) => {
    setCurrent(index);
  }, []);

  const startAutoplay = () => {
    if (!intervalRef.current && images?.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images?.length);
      }, 9000);
    }
  };

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    images?.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  useEffect(() => {
    if (images?.length > 0 && current >= images?.length) {
      setCurrent(0); // reset to valid index if out of bounds
    }
  }, [images?.length]);

  //autoplay progress bar
  useEffect(() => {
    // ✅ Skip if fullscreen is not active or only one image
    if (!isFullscreen || images.length <= 1) return;

    let start = performance.now();
    let rafId = null;

    const animateProgress = (now) => {
      const elapsed = now - start;
      const progressPercent = (elapsed / 9000) * 100;

      if (progressPercent >= 100) {
        nextImage(); // move to next image
        start = performance.now(); // reset timer
        setProgress(0); // reset progress bar
      } else {
        setProgress(progressPercent); // update progress bar
      }

      rafId = requestAnimationFrame(animateProgress);
    };

    rafId = requestAnimationFrame(animateProgress);

    return () => cancelAnimationFrame(rafId);
  }, [isFullscreen, images?.length, current]); // dependencies

  //keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setIsFullscreen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, nextImage, prevImage]);

  //mobile gesture for image swipe
  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  return (
    <div>
      {/* image gallery */}

      {isGettingSingleService ? (
        <div className=" col-span-5 ">
          <div className=" p-2 bg-gry rounded-md h-96 border border-border/10 animate-pulse"></div>
          <div className=" grid grid-cols-3 gap-3 mt-4 ">
            <div className=" p-1 bg-gry rounded-md border border-border/10 h-32 animate-pulse"></div>
            <div className=" p-1 bg-gry rounded-md border border-border/10 h-32 animate-pulse"></div>
          </div>
        </div>
      ) : (
        images?.length > 0 && (
          <div
            className="col-span-5"
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
          >
            {/* Main Image */}
            <div className="relative p-2 bg-gry rounded-md border border-border overflow-hidden w-full h-60 sm:h-72 md:h-80 lg:h-96">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.2 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <img
                    src={images[current]}
                    onClick={openFullscreen}
                    alt="gallery"
                    className="w-full h-full object-cover rounded-md cursor-pointer"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-subMain/30 hover:bg-subMain/40 p-2 rounded-full shadow"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-subMain/30 hover:bg-subMain/40 p-2 rounded-full shadow"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {/* Mobile (scrollable row) */}
            <div className="mt-1 block lg:hidden overflow-x-auto py-2">
              <div className="flex gap-3 w-max">
                {images.map((img, index) => (
                  <div
                    key={img + "-mobile"}
                    ref={thumbRefs.current[index]} // 🔥 Add this line
                    onClick={() => selectImage(index)}
                    className={`min-w-[80px] h-20 rounded-md border cursor-pointer transition-all duration-200 ${
                      index === current
                        ? "border-hedingColor ring-2 ring-hedingColor"
                        : "border-border"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${index}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop (grid) */}
            <div className="mt-4 hidden lg:grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-3">
              {images.map((img, index) => (
                <div
                  key={img + "-desktop"}
                  onClick={() => selectImage(index)}
                  className={`p-1 rounded-md border h-32 cursor-pointer transition-all duration-200 ${
                    index === current
                      ? "border-hedingColor ring-2 ring-hedingColor"
                      : "border-border"
                  }`}
                >
                  <img
                    src={img}
                    alt={`thumb-${index}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        )
      )}

      {/* full screen image gallery  */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            {...handlers}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col justify-center items-center px-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-5 right-5 text-white hover:text-gray-300 z-40"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Main Image Area */}
            <div className="relative max-w-5xl w-full h-[80vh] flex items-center justify-center">
              <motion.img
                key={images[current]}
                src={images[current]}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-contain"
              />

              {/* Prev/Next Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-subMain/30 hover:bg-subMain/40 p-2 rounded-full"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-subMain/30 hover:bg-subMain/40 p-2 rounded-full"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Bottom Thumbnails */}
            <div className="w-full max-w-5xl mt-3 px-4">
              <div className="flex gap-4 justify-center overflow-x-auto py-2">
                {images.map((img, index) => (
                  <div
                    key={img}
                    onClick={() => selectImage(index)}
                    className={`w-20 h-14 rounded-md cursor-pointer transition-all duration-200 ${
                      current === index
                        ? "ring-2 ring-hedingColor"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${index}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* full screen image gallery end */}

      {/* image gallery end */}
    </div>
  );
}

export default ImageGallery;
