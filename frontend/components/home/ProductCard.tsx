"use client";

import { Product } from "@/services/productService";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock_amount <= 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    let cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    
    if (!cleanPath.includes("/assets/")) {
      cleanPath = `/assets/img/product${cleanPath}`;
    }

    return `${baseUrl}${cleanPath}`;
  };

  return (
    <div 
      className={`border border-gray-100 rounded-xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] p-3 transition-all duration-300 bg-white flex flex-col h-full group ${
        isOutOfStock 
          ? "grayscale opacity-75 cursor-not-allowed pointer-events-none" 
          : "hover:shadow-md hover:-translate-y-1"
      }`}
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3">
        {product.image ? (
          <img 
            src={getImageUrl(product.image)} 
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              !isOutOfStock && "group-hover:scale-110"
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs text-gray-400 font-medium font-inter">Foto Produk</span>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
            <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Habis
            </span>
          </div>
        )}
      </div>

      {/* Category Name */}
      <p className={`text-[10px] font-medium mb-1 uppercase tracking-wider ${
        isOutOfStock ? "text-gray-400" : "text-[#6366f1]"
      }`}>
        {product.categories_id || "Kategori"}
      </p>

      {/* Product Name */}
      <h3 className={`text-sm font-semibold line-clamp-2 mb-2 leading-snug h-10 transition-colors ${
        isOutOfStock ? "text-gray-400" : "text-[#3B82F6]"
      }`}>
        {product.name}
      </h3>

      {/* Price Section */}
      <div className="mt-auto">
        <p className={`text-sm font-bold ${isOutOfStock ? "text-gray-400" : "text-gray-900"}`}>
          {formatCurrency(product.price)}
        </p>
        <div className="flex items-center justify-between mt-1">
           <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
             isOutOfStock 
               ? 'bg-gray-100 text-gray-400' 
               : 'bg-green-50 text-green-600'
           }`}>
              {isOutOfStock ? 'STOK HABIS' : `STOK: ${product.stock_amount}`}
           </span>
        </div>
      </div>
    </div>
  );
}
