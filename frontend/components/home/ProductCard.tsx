interface ProductCardProps {
  shopName: string;
  productName: string;
  price: string;
  originalPrice?: string;
}

export default function ProductCard({ shopName, productName, price, originalPrice }: ProductCardProps) {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] p-3 hover:shadow-md transition-shadow bg-white flex flex-col h-full">
      {/* Product Image Placeholder */}
      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-3">
        <span className="text-xs text-gray-400 font-medium font-inter">Foto Produk</span>
      </div>

      {/* Shop Name */}
      <p className="text-[10px] text-[#6366f1] font-medium mb-1 uppercase tracking-wider">{shopName}</p>

      {/* Product Name */}
      <h3 className="text-sm font-semibold text-[#3B82F6] line-clamp-2 mb-2 leading-snug">
        {productName}
      </h3>

      {/* Price Section */}
      <div className="mt-auto">
        {originalPrice && (
          <p className="text-[11px] text-gray-400 line-through mb-0.5">{originalPrice}</p>
        )}
        <p className="text-sm font-bold text-gray-900">{price}</p>
      </div>
    </div>
  );
}
