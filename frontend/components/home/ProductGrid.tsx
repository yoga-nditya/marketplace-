import { Search } from "lucide-react";
import ProductCard from "./ProductCard";

const DUMMY_PRODUCTS = [
  { id: 1, shopName: "Artisan Wood", productName: "Talenan Kayu Jati Solid", price: "Rp85.000", originalPrice: "Rp120.000" },
  { id: 2, shopName: "Karya Tangan", productName: "Tas Rajut Handmade Estetik", price: "Rp150.000" },
  { id: 3, shopName: "Souvenir Jogja", productName: "Gantungan Kunci Wayang Kulit", price: "Rp15.000", originalPrice: "Rp20.000" },
  { id: 4, shopName: "Clay Magic", productName: "Pajangan Keramik Mini Custom", price: "Rp45.000" },
  { id: 5, shopName: "Batik Solo", productName: "Masker Batik Tulis Halus", price: "Rp12.000" },
  { id: 6, shopName: "Gerabah Melati", productName: "Pot Bunga Tanah Liat Ukir", price: "Rp35.000", originalPrice: "Rp50.000" },
  { id: 7, shopName: "Aksesoris Cantik", productName: "Gelang Manik-Manik Etnik", price: "Rp25.000" },
  { id: 8, shopName: "Tenun Ikat", productName: "Taplak Meja Tenun Jepara", price: "Rp95.000", originalPrice: "Rp110.000" },
];

export default function ProductGrid() {
  return (
    <div className="mb-10">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Produk</h2>
        
        <div className="relative w-full sm:w-[280px]">
          <input 
            type="text" 
            placeholder="Cari produk..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#6C63FF] transition-colors"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6C63FF]" size={18} />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {DUMMY_PRODUCTS.map((product) => (
          <ProductCard 
            key={product.id}
            shopName={product.shopName}
            productName={product.productName}
            price={product.price}
            originalPrice={product.originalPrice}
          />
        ))}
      </div>
    </div>
  );
}
