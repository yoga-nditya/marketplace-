"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Upload } from "lucide-react";

export default function AddCategory() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/categories"
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-colors shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
          Kembali
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Form Tambah Kategori</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl">
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Nama Kategori</label>
            <input 
              type="text" 
              placeholder="Masukkan nama kategori"
              className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Upload gambar</label>
            <div className="flex items-center overflow-hidden border border-gray-200 rounded-lg bg-[#F8F9FD]">
              <label className="bg-[#1F2937] hover:bg-black text-white px-6 py-3 cursor-pointer font-bold text-sm transition-colors">
                Choose File
                <input type="file" className="hidden" />
              </label>
              <span className="px-4 text-sm text-gray-400 italic">No file chosen</span>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] mt-4"
          >
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
}
