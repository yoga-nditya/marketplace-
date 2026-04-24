"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, LogOut, ChevronDown, ClipboardList } from "lucide-react";
import Swal from "sweetalert2";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("access_token");
    const name = localStorage.getItem("user_name");
    setIsLoggedIn(!!token);
    if (name) setUserName(name);

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
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
        localStorage.removeItem("user_name");
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
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#4338CA] transition-colors font-semibold"
                >
                  <span>Hello, {userName || "User"}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link 
                      href="/profile" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#4338CA] transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">Edit Profil</span>
                    </Link>
                    <Link 
                      href="/orders" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#4338CA] transition-colors"
                    >
                      <ClipboardList className="w-5 h-5" />
                      <span className="font-medium">Riwayat Pesanan</span>
                    </Link>
                    <div className="h-[1px] bg-gray-100 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
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
