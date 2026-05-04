"use client";
import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronDown, Loader2 } from "lucide-react";
import { fetchAdminCategories, Category } from "@/services/adminCategoryService";
import { fetchAdminProductById, updateProduct, ProductAdmin } from "@/services/adminProductService";
import Swal from "sweetalert2";

import { getImageUrl } from "@/services/utils";

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    categories_id: "",
    name: "",
    price: "",
    capital_price: "",
    description: "",
    weight: "",
    stock_amount: "",
    minimum_order: "",
    slug: "",
  });
  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      setFetching(true);
      const [cats, product] = await Promise.all([
        fetchAdminCategories(),
        fetchAdminProductById(id)
      ]);
      
      setCategories(cats);
      
      if (product) {
        // Cari ID kategori berdasarkan nama (karena BE mengirimkan nama di field categories_id)
        const matchingCategory = cats.find(c => c.name === product.categories_id);
        
        setFormData({
          categories_id: matchingCategory ? matchingCategory.id : product.categories_id,
          name: product.name,
          price: product.price.toString(),
          capital_price: product.capital_price.toString(),
          description: product.description,
          weight: product.weight.toString(),
          stock_amount: product.stock_amount.toString(),
          minimum_order: product.minimum_order.toString(),
          slug: product.slug,
        });
        setCurrentImage(product.image);
      } else {
        await Swal.fire("Error", "Produk tidak ditemukan", "error");
        router.push("/admin/products");
      }
      setFetching(false);
    };
    loadInitialData();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (image) {
      data.append("image", image);
    }

    const result = await updateProduct(id, data);
    setLoading(false);

    if (result.success) {
      await Swal.fire("Berhasil!", result.message, "success");
      router.push("/admin/products");
    } else {
      Swal.fire("Gagal!", result.message, "error");
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-2">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <span className="text-gray-500 font-medium">Memuat data produk...</span>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold text-gray-800">Edit Produk</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {/* Row 1 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Kategori</label>
              <div className="relative">
                <select 
                  name="categories_id"
                  value={formData.categories_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Pilih kategori</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Berat (Gram)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Row 2 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Nama Produk</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama produk"
                required
                className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Minimum Order</label>
              <input
                type="number"
                name="minimum_order"
                value={formData.minimum_order}
                onChange={handleChange}
                placeholder="1"
                required
                className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Row 3 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Harga Jual</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Harga Modal</label>
              <input
                type="number"
                name="capital_price"
                value={formData.capital_price}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Row 4 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Stok</label>
              <input
                type="number"
                name="stock_amount"
                value={formData.stock_amount}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="url-produk-anda"
                required
                className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Ganti Gambar (Opsional)</label>
            <div className="flex flex-col gap-4">
              {currentImage && !image && (
                <div className="w-32 h-32 relative group">
                  <img 
                    src={getImageUrl(currentImage, "product")} 
                    alt="Current" 
                    className="w-full h-full object-cover rounded-lg border border-gray-200" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                    <span className="text-white text-xs font-bold">Gambar Saat Ini</span>
                  </div>
                </div>
              )}
              <div className="flex items-center overflow-hidden border border-gray-200 rounded-lg bg-[#F8F9FD]">
                <label className="bg-[#1F2937] hover:bg-black text-white px-6 py-3 cursor-pointer font-bold text-sm transition-colors whitespace-nowrap">
                  Choose New File
                  <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                </label>
                <span className="px-4 text-sm text-gray-400 italic truncate">
                  {image ? image.name : "No new file chosen"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Deskripsi</label>
            <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col min-h-[300px]">
              <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
                {['B', 'I', 'U', 'S'].map(tool => (
                  <button key={tool} type="button" className="w-8 h-8 flex items-center justify-center hover:bg-white border border-transparent hover:border-gray-300 rounded font-bold text-gray-600">{tool}</button>
                ))}
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="flex-1 p-4 focus:outline-none resize-none text-gray-700 leading-relaxed"
                placeholder="Tulis deskripsi produk di sini..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-gray-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>
      </div>
    </div>
  );
}
