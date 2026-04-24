"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, LogOut } from "lucide-react";
import Swal from "sweetalert2";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Anda akan keluar dari akun ini.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4338CA",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Logout!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        setIsLoggedIn(false);
        Swal.fire({
          icon: "success",
          title: "Logout Berhasil",
          showConfirmButton: false,
          timer: 1500
        });
        window.location.href = "/";
      }
    });
  };

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
              href="/"
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
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link 
                  href="/profile" 
                  className="flex items-center gap-2 text-[#555555] hover:text-[#4338CA] transition-colors font-medium"
                >
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#4338CA]" />
                  </div>
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 text-[#555555] font-medium">
                <Link href="/auth/login" className="hover:text-[#1A1A1A] transition-colors">
                  Masuk
                </Link>
                <div className="h-4 w-[1px] bg-gray-300"></div>
                <Link href="/auth/register" className="hover:text-[#1A1A1A] transition-colors">
                  Daftar
                </Link>
              </div>
            )}

            <button className="relative p-1.5 text-[#1A1A1A] hover:text-[#6C63FF] transition-all">
              <ShoppingCart className="w-[22px] h-[22px] stroke-[1.8px]" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
