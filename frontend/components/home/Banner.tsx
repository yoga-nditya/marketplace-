"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    { id: 1, text: "Banner 1", bgColor: "bg-purple-100" },
    { id: 2, text: "Banner 2", bgColor: "bg-blue-100" },
    { id: 3, text: "Banner 3", bgColor: "bg-green-100" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative w-full mb-8">
      <div className={`w-full h-[250px] rounded-xl flex items-center justify-center transition-all duration-300 ${banners[currentSlide].bgColor}`}>
        <h2 className="text-3xl font-bold text-gray-800">{banners[currentSlide].text}</h2>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
      >
        <ChevronLeft size={20} className="text-gray-700" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
      >
        <ChevronRight size={20} className="text-gray-700" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {banners.map((_, index) => (
          <div 
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? "bg-purple-600" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}
