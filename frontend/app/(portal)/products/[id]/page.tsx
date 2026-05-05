"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, Home, Minus, Plus, ShoppingCart, Loader2 } from "lucide-react";
import { fetchProductById, Product } from "@/services/productService";
import { getImageUrl } from "@/services/utils";

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        if (data) {
          setProduct(data);
        } else {
          setError("Produk tidak ditemukan");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Gagal mengambil data produk");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getProduct();
    }
  }, [id]);

  const increment = () => {
    if (product && quantity < product.stock_amount) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Memuat data produk...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
        <div className="text-center space-y-4">
          <div className="bg-red-50 text-red-600 p-4 rounded-full inline-block mb-2">
            <ShoppingCart size={48} className="opacity-50" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{error || "Produk Tidak Ditemukan"}</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Maaf, produk yang Anda cari tidak tersedia atau terjadi kesalahan saat memuat data.
          </p>
          <Link 
            href="/home" 
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = product.price * quantity;

  return (
    <div className="bg-white min-h-screen py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb - Sesuai Screenshot (Boxed dengan Shadow) */}
        <nav className="bg-white px-6 py-4 rounded-xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] mb-10 flex items-center gap-3 text-sm text-gray-600">
          <Link href="/home" className="flex items-center gap-2 hover:text-black transition-colors font-medium">
            <Home size={16} className="text-gray-500" />
            <span>Beranda</span>
          </Link>
          <ChevronRight size={14} className="text-gray-300" />
          <Link href="/products" className="hover:text-black transition-colors font-medium">
            Produk
          </Link>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-gray-400 truncate">{product.name}</span>
        </nav>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Kolom Kiri: Gambar Produk */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm sticky top-24">
              <div className="relative aspect-square w-full bg-gray-50">
                <img
                  src={getImageUrl(product.image, "product")}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Kolom Tengah: Info Detail Produk */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-black leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-black text-black">
                {formatRupiah(product.price)}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <h3 className="text-indigo-600 font-bold text-xs uppercase tracking-wider">Kategori Produk</h3>
                <p className="text-black font-medium text-sm">{product.categories_id}</p>
              </div>

              <div className="w-full h-[1px] bg-gray-100"></div>

              <div className="space-y-2.5">
                <h3 className="text-indigo-600 font-bold text-xs uppercase tracking-wider">Deskripsi Produk</h3>
                <div className={`text-black leading-relaxed text-[15px] whitespace-pre-line ${!isExpanded ? 'line-clamp-4' : ''}`}>
                  {product.description || "Tidak ada deskripsi untuk produk ini."}
                </div>
                {product.description && product.description.length > 200 && (
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-indigo-600 text-xs font-bold hover:underline"
                  >
                    {isExpanded ? "Lihat Lebih Sedikit" : "Selengkapnya"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Kotak Aksi Checkout */}
          <div className="lg:col-span-3">
            <div className="bg-white p-5 rounded-xl border border-gray-200 sticky top-24 shadow-sm">
              <h3 className="text-black font-bold text-sm mb-4">Pilih jumlah</h3>
              
              {/* Counter Component */}
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden w-full mb-4">
                <button 
                  onClick={decrement}
                  className="p-2.5 hover:bg-gray-50 transition-colors text-gray-500 active:bg-gray-100 disabled:opacity-30"
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <div className="flex-1 text-center font-bold text-black py-2 text-sm">
                  {quantity}
                </div>
                <button 
                  onClick={increment}
                  className="p-2.5 hover:bg-gray-50 transition-colors text-gray-500 active:bg-gray-100 disabled:opacity-30"
                  disabled={product ? quantity >= product.stock_amount : true}
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="flex justify-between items-center mb-6 text-xs bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                <span className="text-gray-500 font-medium">Stok tersedia:</span>
                <span className={`font-bold ${product.stock_amount > 0 ? 'text-black' : 'text-red-600'}`}>
                  {product.stock_amount}
                </span>
              </div>

              <div className="space-y-0.5 mb-6">
                <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider">Subtotal</p>
                <p className="text-xl font-black text-black">
                  {formatRupiah(subtotal)}
                </p>
              </div>

              <button 
                disabled={product.stock_amount <= 0}
                className="w-full bg-indigo-600 text-white py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all text-sm shadow-md active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={18} />
                <span>{product.stock_amount > 0 ? "Masukkan ke keranjang" : "Stok Habis"}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
