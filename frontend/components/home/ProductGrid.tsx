"use client";

import { Search } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/services/productService";

interface ProductGridProps {
  products: Product[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isLoading: boolean;
  isFiltered: boolean;
}

export default function ProductGrid({
  products,
  searchQuery,
  onSearchChange,
  isLoading,
  isFiltered,
}: ProductGridProps) {
  return (
    <div className="mb-10">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Produk</h2>

        <div className="relative w-full sm:w-[280px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari produk..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#6C63FF] transition-colors"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6C63FF]" size={18} />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-2xl">
          <p className="text-gray-400">
            {isFiltered 
              ? `Tidak ditemukan produk untuk pencarian dan kategori ini.`
              : "Tidak ada produk yang tersedia saat ini."}
          </p>
        </div>
      )}
    </div>
  );
}
