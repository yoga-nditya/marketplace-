"use client";

import Link from "next/link";
import { ShoppingCart, Gift } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/logo_GiftMoment.png" 
            alt="GiftMoment Logo" 
            className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-2xl font-bold text-[#1A1A1A] tracking-tight">
            GiftMoment
          </span>
        </Link>

        {/* Navigation Links & Auth */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-10 h-20">
            <Link
              href="/home"
              className="relative font-bold text-[#1A1A1A] h-full flex items-center group/link"
            >
              Beranda
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#6C63FF] rounded-t-full"></span>
            </Link>
            <Link
              href="/tentang-kami"
              className="text-[#555555] hover:text-[#1A1A1A] transition-colors font-medium h-full flex items-center"
            >
              Tentang Kami
            </Link>
          </div>

          <div className="flex items-center gap-6 ml-4">
            <div className="flex items-center gap-4 text-[#555555] font-medium">
              <Link href="/auth/login" className="hover:text-[#1A1A1A] transition-colors">
                Masuk
              </Link>
              <div className="h-4 w-[1px] bg-gray-300"></div>
              <Link href="/auth/register" className="hover:text-[#1A1A1A] transition-colors">
                Daftar
              </Link>
            </div>

            <button className="relative p-1.5 text-[#1A1A1A] hover:text-[#6C63FF] transition-all">
              <ShoppingCart className="w-[22px] h-[22px] stroke-[1.8px]" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
