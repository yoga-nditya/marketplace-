import React from "react";
import Link from "next/link";
import { Plus, Search, ChevronDown, Edit, Trash2 } from "lucide-react";

const dummyProducts = [
  { id: 1, nama: "Cutting Acrylic 25x35cm", kategori: "Hantaran", harga: "Rp. 150.000", stok: 10, gambar: "https://placehold.co/100x100?text=Acrylic" },
  { id: 2, nama: "Gift Wedding Jam 25x35cm", kategori: "Hantaran", harga: "Rp. 250.000", stok: 5, gambar: "https://placehold.co/100x100?text=Jam" },
  { id: 3, nama: "Talenan Kayu Jati", kategori: "Souvenir", harga: "Rp. 35.000", stok: 50, gambar: "https://placehold.co/100x100?text=Talenan" },
];

export default function AdminProducts() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">List Produk</h1>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Link href="/admin/products/add">
          <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold transition-colors shadow-sm">
            <Plus className="w-5 h-5" />
            Tambah Produk
          </button>
        </Link>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
            <span>Show</span>
            <div className="flex items-center gap-1 font-bold text-gray-900 cursor-pointer">
              10 <ChevronDown className="w-4 h-4" />
            </div>
            <span>entries</span>
          </div>

          <div className="relative group">
            <input
              type="text"
              placeholder="Search:"
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm w-full md:w-64"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#5E5CE6] text-white">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10 w-20 text-center">ID</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10">GAMBAR</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10">NAMA PRODUK</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10">KATEGORI</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10 text-right">HARGA</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10 text-center">STOK</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {dummyProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-500 text-center border-r border-gray-50">{product.id}</td>
                  <td className="px-6 py-4 border-r border-gray-50">
                    <img src={product.gambar} alt={product.nama} className="w-12 h-12 object-cover rounded-lg shadow-sm border border-gray-100" />
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800 border-r border-gray-50">{product.nama}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 border-r border-gray-50">
                    <span className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium">{product.kategori}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-blue-600 text-right border-r border-gray-50">{product.harga}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center border-r border-gray-50">{product.stok}</td>
                  <td className="px-6 py-4 text-sm text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="h-1 bg-gray-100 w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-gray-300 w-1/4 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
