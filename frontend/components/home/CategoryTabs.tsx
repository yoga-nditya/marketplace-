"use client";

import { useState } from "react";

const CATEGORIES = ["Semua", "Handmade", "Souvenir"];

export default function CategoryTabs() {
  const [activeTab, setActiveTab] = useState("Semua");

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Kategori</h2>
      <div className="flex gap-3">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === category
                ? "bg-[#6C63FF] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
