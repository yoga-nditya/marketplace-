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

  return (
    <div className="relative w-full mb-8 group">
      {/* Banner Image Display */}
      <div className="w-full h-[250px] rounded-xl overflow-hidden shadow-sm relative">
        <img
          src={banners[currentSlide].image}
          alt={banners[currentSlide].title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Overlay Title if desired (optional based on aesthetic preference) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6 pt-10">
          <h2 className="text-white text-xl font-bold line-clamp-1">{banners[currentSlide].title}</h2>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 active:scale-90"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="text-gray-700" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 active:scale-90"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="text-gray-700" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-purple-600 w-6" 
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
