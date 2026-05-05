"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, ChevronDown, ChevronUp, Edit, Trash2, ArrowUpDown, ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react";
import { fetchAdminBanners, deleteBanner, Banner } from "@/services/adminBannerService";
import { getImageUrl } from "@/services/utils";
import Swal from "sweetalert2";

export default function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Banner; direction: 'asc' | 'desc' } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const getBanners = async () => {
    setLoading(true);
    const data = await fetchAdminBanners();
    setBanners(data);
    setLoading(false);
  };

  useEffect(() => {
    getBanners();
  }, []);

  const handleSort = (key: keyof Banner) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredBanners = React.useMemo(() => {
    return banners.filter(banner =>
      banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banner.id.toString().includes(searchTerm)
    );
  }, [banners, searchTerm]);

  const sortedBanners = React.useMemo(() => {
    let sortableItems = [...filteredBanners];
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
  }, [filteredBanners, sortConfig]);

  const paginatedBanners = React.useMemo(() => {
    const startIndex = (currentPage - 1) * entriesToShow;
    return sortedBanners.slice(startIndex, startIndex + entriesToShow);
  }, [sortedBanners, currentPage, entriesToShow]);

  const totalPages = Math.ceil(sortedBanners.length / entriesToShow);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, entriesToShow]);

  const SortIcon = ({ column }: { column: keyof Banner }) => {
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
      text: "Data banner ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      const response = await deleteBanner(id);
      if (response.success) {
        Swal.fire("Berhasil!", response.message, "success");
        getBanners();
      } else {
        Swal.fire("Gagal!", response.message, "error");
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">List Banners</h1>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Link href="/admin/banners/add">
          <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold transition-colors shadow-sm cursor-pointer">
            <Plus className="w-5 h-5" />
            Tambah Banner
          </button>
        </Link>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
            <span>Show</span>
            <select
              value={entriesToShow}
              onChange={(e) => setEntriesToShow(Number(e.target.value))}
              className="font-bold text-gray-900 bg-transparent border-none focus:outline-none cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
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
                  onClick={() => handleSort('title')}
                  className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center">
                    JUDUL <SortIcon column="title" />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10 text-center">STATUS</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    Memuat data...
                  </td>
                </tr>
              ) : paginatedBanners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    {searchTerm ? `Tidak ada hasil untuk "${searchTerm}"` : "Tidak ada data banner."}
                  </td>
                </tr>
              ) : (
                paginatedBanners.map((banner) => (
                  <tr key={banner.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-500 text-center border-r border-gray-50">{banner.id}</td>
                    <td className="px-6 py-4 border-r border-gray-50">
                      <img
                        src={getImageUrl(banner.image, 'banner')}
                        alt={banner.title}
                        className="w-24 h-12 object-cover rounded-lg shadow-sm border border-gray-100"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x100?text=' + banner.title[0];
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 border-r border-gray-50">{banner.title}</td>
                    <td className="px-6 py-4 text-sm text-center border-r border-gray-50">
                        {banner.is_active ? (
                            <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-bold uppercase">
                                <CheckCircle className="w-3 h-3" /> Aktif
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-bold uppercase">
                                <XCircle className="w-3 h-3" /> Non-Aktif
                            </span>
                        )}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/admin/banners/edit/${banner.id}`}>
                          <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                            <Edit className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(banner.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            Showing {Math.min((currentPage - 1) * entriesToShow + 1, sortedBanners.length)} to {Math.min(currentPage * entriesToShow, sortedBanners.length)} of {sortedBanners.length} entries
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${currentPage === i + 1
                      ? "bg-[#3B82F6] text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
