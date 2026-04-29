"use client";

import React from "react";
import { ChevronDown, User } from "lucide-react";

export default function AdminNavbar() {
  return (
    <nav className="h-16 bg-[#5E5CE6] text-white flex items-center justify-between px-6 sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
             <img src="/logo_GiftMoment.png" alt="Logo" className="w-6 h-6 object-contain brightness-0 invert" />
        </div>
        <span className="text-xl font-bold tracking-tight">Admin GiftMoment</span>
      </div>

      <div className="flex items-center gap-3 cursor-pointer group">
        <span className="text-sm font-medium">Hello, admin</span>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center border-2 border-white/30">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1">
             <ChevronDown className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
}
