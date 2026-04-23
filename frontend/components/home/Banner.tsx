"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchBanners, Banner as BannerType } from "@/services/bannerService";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const data = await fetchBanners();
        setBanners(data);
      } catch (error) {
        console.error("Failed to load banners:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBanners();
  }, []);

  const nextSlide = () => {
    if (banners.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    if (banners.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  if (loading) {
    return (
      <div className="w-full h-[250px] rounded-xl mb-8 bg-gray-100 flex items-center justify-center animate-pulse">
        <p className="text-gray-400 font-medium">Memuat banner...</p>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="w-full h-[250px] rounded-xl mb-8 bg-gray-50 flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
        <p className="text-gray-400 font-medium">Tidak ada banner tersedia.</p>
        <p className="text-xs text-gray-300 mt-1">Coba lagi nanti atau hubungi admin.</p>
      </div>
    );
  }

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;

    const baseUrl = (process.env.NEXT_PUBLIC_API_URL);
    let cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    if (!cleanPath.includes("/assets/")) {
      cleanPath = `/assets/img/banner${cleanPath}`;
    }

    return `${baseUrl}${cleanPath}`;
  };

  return (
    <div className="relative w-full mb-10 group">
      {/* Banner Image Display */}
      <div className="w-full h-[280px] md:h-[350px] rounded-2xl overflow-hidden shadow-md relative">
        <img
          src={getImageUrl(banners[currentSlide].image)}
          alt={banners[currentSlide].title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100 active:scale-95 border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100 active:scale-95 border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight size={28} className="text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2.5 mt-5">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${index === currentSlide
              ? "bg-gray-800 w-8 h-2"
              : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
