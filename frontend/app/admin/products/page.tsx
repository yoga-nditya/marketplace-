"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, ChevronDown, ChevronUp, Edit, Trash2, Loader2, ArrowUpDown } from "lucide-react";
import { fetchAdminProducts, deleteProduct, ProductAdmin } from "@/services/adminProductService";
import { getImageUrl } from "@/services/utils";
import Swal from "sweetalert2";

export default function AdminProducts() {
  const [products, setProducts] = useState<ProductAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof ProductAdmin; direction: 'asc' | 'desc' } | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    const data = await fetchAdminProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSort = (key: keyof ProductAdmin) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ column }: { column: keyof ProductAdmin }) => {
    if (!sortConfig || sortConfig.key !== column) {
      return <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />;
    }
    return sortConfig.direction === 'asc' ?
      <ChevronUp className="w-3 h-3 ml-1" /> :
      <ChevronDown className="w-3 h-3 ml-1" />;
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data produk akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal"
    });

    if (result.isConfirmed) {
      const response = await deleteProduct(id);
      if (response.success) {
        await Swal.fire("Terhapus!", response.message, "success");
        loadProducts();
      } else {
        Swal.fire("Gagal!", response.message, "error");
      }
    }
  };

  const filteredProducts = React.useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categories_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const sortedProducts = React.useMemo(() => {
    let sortableItems = [...filteredProducts];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = (a[sortConfig.key] || "").toString().toLowerCase();
        const bValue = (b[sortConfig.key] || "").toString().toLowerCase();

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredProducts, sortConfig]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">List Produk</h1>
        <Link href="/admin/products/add">
          <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold transition-colors shadow-sm">
            <Plus className="w-5 h-5" />
            Tambah Produk
          </button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
            <span>Show</span>
            <div className="flex items-center gap-1 font-bold text-gray-900 cursor-pointer">
              {products.length} <ChevronDown className="w-4 h-4" />
            </div>
            <span>entries</span>
          </div>
        </div>

        <div className="relative group">
          <input
            type="text"
            placeholder="Search:"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm w-full md:w-64"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#5E5CE6] text-white">
                <th 
                  onClick={() => handleSort('id')}
                  className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10 w-24 text-center cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-center">
                    ID <SortIcon column="id" />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10">GAMBAR</th>
                <th 
                  onClick={() => handleSort('name')}
                  className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center">
                    NAMA <SortIcon column="name" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('categories_id')}
                  className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center">
                    KATEGORI <SortIcon column="categories_id" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('price')}
                  className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10 text-right cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-end">
                    HARGA <SortIcon column="price" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('stock_amount')}
                  className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10 text-center cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-center">
                    STOK <SortIcon column="stock_amount" />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                      <span>Memuat data...</span>
                    </div>
                  </td>
                </tr>
              ) : sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-500 text-center border-r border-gray-50">#{product.id.slice(-4)}</td>
                    <td className="px-6 py-4 border-r border-gray-50">
                      <img 
                        src={getImageUrl(product.image, "product")} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded-lg shadow-sm border border-gray-100" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=No+Image";
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 border-r border-gray-50">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 border-r border-gray-50">
                      <span className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium">{product.categories_id}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-blue-600 text-right border-r border-gray-50">
                      Rp {new Intl.NumberFormat("id-ID").format(product.price)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-center border-r border-gray-50">{product.stock_amount}</td>
                    <td className="px-6 py-4 text-sm text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/admin/products/edit/${product.id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Tidak ada produk ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="h-1 bg-gray-100 w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-blue-500 w-full transition-transform duration-500 transform translate-x-[-100%]" style={{ transform: loading ? 'translateX(-50%)' : 'translateX(0)' }}></div>
        </div>
      </div>
    </div>
  );
}


