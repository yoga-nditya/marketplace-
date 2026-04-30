"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Upload } from "lucide-react";
import { fetchCategoryById, updateCategory } from "@/services/adminCategoryService";
import { getImageUrl } from "@/services/utils";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";

export default function EditCategory() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [existingImageUrl, setExistingImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      setLoading(true);
      const data = await fetchCategoryById(id);
      if (data) {
        setFormData({
          name: data.name,
          slug: data.slug,
        });
        setExistingImageUrl(getImageUrl(data.image));
      } else {
        Swal.fire("Error", "Kategori tidak ditemukan", "error");
        router.push("/admin/categories");
      }
      setLoading(false);
    };

    if (id) {
      getCategory();
    }
  }, [id, router]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    
    setFormData({ ...formData, name, slug });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      Swal.fire("Error", "Nama kategori harus diisi", "error");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    setSubmitting(true);
    const response = await updateCategory(id, data);
    setSubmitting(false);

    if (response.success) {
      await Swal.fire("Berhasil!", response.message, "success");
      router.push("/admin/categories");
    } else {
      Swal.fire("Gagal!", response.message, "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Memuat data kategori...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/categories"
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-colors shadow-sm cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
          Kembali
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Form Edit Kategori</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Nama Kategori</label>
            <input 
              type="text" 
              placeholder="Masukkan nama kategori"
              value={formData.name}
              onChange={handleNameChange}
              className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Slug (Otomatis)</label>
            <input 
              type="text" 
              placeholder="slug-kategori"
              value={formData.slug}
              readOnly
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Upload Gambar Baru (Opsional)</label>
            <div className="flex items-center overflow-hidden border border-gray-200 rounded-lg bg-[#F8F9FD]">
              <label className="bg-[#1F2937] hover:bg-black text-white px-6 py-3 cursor-pointer font-bold text-sm transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Pilih File
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
              <span className="px-4 text-sm text-gray-400 truncate">
                {selectedFile ? selectedFile.name : "Ganti gambar..."}
              </span>
            </div>
            
            {(previewUrl || existingImageUrl) && (
              <div className="mt-4">
                <label className="text-xs font-bold text-gray-500 block mb-2">
                  {previewUrl ? "Preview Gambar Baru:" : "Gambar Saat Ini:"}
                </label>
                <img 
                  src={previewUrl || existingImageUrl} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                  }}
                />
              </div>
            )}
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] mt-4 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {submitting ? "Menyimpan..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
