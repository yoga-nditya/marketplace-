"use client";

import { Category } from "@/services/categoryService";

interface CategoryTabsProps {
  categories: Category[];
  activeCategoryId: string | null;
  onCategoryChange: (id: string | null) => void;
}

export default function CategoryTabs({ categories, activeCategoryId, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Kategori</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            activeCategoryId === null
              ? "bg-[#6C63FF] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Semua
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeCategoryId === category.id
                ? "bg-[#6C63FF] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
