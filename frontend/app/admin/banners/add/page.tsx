"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Upload } from "lucide-react";
import { createBanner } from "@/services/adminBannerService";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AddBanner() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    is_active: "1",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    if (!formData.title) {
      Swal.fire("Error", "Judul banner harus diisi", "error");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("is_active", formData.is_active);
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    setSubmitting(true);
    const response = await createBanner(data);
    setSubmitting(false);

    if (response.success) {
      await Swal.fire("Berhasil!", response.message, "success");
      router.push("/admin/banners");
    } else {
      Swal.fire("Gagal!", response.message, "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/banners"
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-colors shadow-sm cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
          Kembali
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Form Tambah Banner</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Judul Banner</label>
            <input 
              type="text" 
              name="title"
              placeholder="Masukkan judul banner"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Status</label>
            <select
              name="is_active"
              value={formData.is_active}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#F8F9FD] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer font-semibold text-gray-900"
            >
              <option value="1">Aktif</option>
              <option value="0">Non-Aktif</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Upload Gambar</label>
            <div className="flex items-center overflow-hidden border border-gray-200 rounded-lg bg-[#F8F9FD]">
              <label className="bg-[#1F2937] hover:bg-black text-white px-6 py-3 cursor-pointer font-bold text-sm transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Pilih File
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
              <span className="px-4 text-sm text-gray-400 truncate">
                {selectedFile ? selectedFile.name : "Belum ada file terpilih"}
              </span>
            </div>
            
            {previewUrl && (
              <div className="mt-4">
                <label className="text-xs font-bold text-gray-500 block mb-2">Preview Gambar:</label>
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full max-w-md h-40 object-cover rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
            )}
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] mt-4 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {submitting ? "Menyimpan..." : "Tambah Banner"}
          </button>
        </form>
      </div>
    </div>
  );
}
