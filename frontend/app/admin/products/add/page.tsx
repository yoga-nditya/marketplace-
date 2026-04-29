"use client";
import Link from "next/link";
import { ChevronLeft, ChevronDown } from "lucide-react";

export default function AddProduct() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-colors shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
          Kembali
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Form Tambah Produk</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {/* Row 1 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Kategori</label>
              <div className="relative">
                <select className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer">
                  <option value="">Pilih kategori</option>
                  <option value="1">Hantaran</option>
                  <option value="2">Souvenir</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Berat (Gram)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Row 2 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Nama</label>
              <input
                type="text"
                placeholder="Masukkan nama produk"
                className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Minimum Order</label>
              <input
                type="number"
                placeholder="1"
                className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Row 3 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Harga Jual</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Harga Modal</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Upload gambar</label>
            <div className="flex items-center overflow-hidden border border-gray-200 rounded-lg bg-[#F8F9FD]">
              <label className="bg-[#1F2937] hover:bg-black text-white px-6 py-3 cursor-pointer font-bold text-sm transition-colors whitespace-nowrap">
                Choose File
                <input type="file" className="hidden" />
              </label>
              <span className="px-4 text-sm text-gray-400 italic truncate">No file chosen</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Deskripsi</label>
            <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col min-h-[300px]">
              {/* Dummy Toolbar for Rich Text Editor appearance */}
              <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
                {['B', 'I', 'U', 'S'].map(tool => (
                  <button key={tool} type="button" className="w-8 h-8 flex items-center justify-center hover:bg-white border border-transparent hover:border-gray-300 rounded font-bold text-gray-600">{tool}</button>
                ))}
                <div className="w-[1px] h-6 bg-gray-300 mx-1 self-center"></div>
                <button type="button" className="px-3 h-8 flex items-center justify-center hover:bg-white border border-transparent hover:border-gray-300 rounded text-sm font-medium text-gray-600">Styles</button>
                <button type="button" className="px-3 h-8 flex items-center justify-center hover:bg-white border border-transparent hover:border-gray-300 rounded text-sm font-medium text-gray-600">Format</button>
              </div>
              <textarea
                className="flex-1 p-4 focus:outline-none resize-none text-gray-700 leading-relaxed"
                placeholder="Tulis deskripsi produk di sini..."
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
}
