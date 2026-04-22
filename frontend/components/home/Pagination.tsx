"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalResults,
  onPageChange,
  itemsPerPage,
}: PaginationProps) {
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalResults);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-gray-100 mt-6">
      <p className="text-xs text-gray-500">
        Menampilkan {startIndex}-{endIndex} dari {totalResults} produk
      </p>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Halaman sebelumnya"
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-lg text-sm font-bold transition-all duration-200 ${
              currentPage === page
                ? "bg-[#6C63FF] text-white shadow-md shadow-purple-200"
                : "border border-gray-100 text-gray-400 hover:border-[#6C63FF] hover:text-[#6C63FF] bg-white"
            }`}
          >
            {page}
          </button>
        ))}

        <button 
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Halaman berikutnya"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
