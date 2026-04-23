import { Category } from "@/services/categoryService";
import { LayoutGrid } from "lucide-react";

interface CategoryTabsProps {
  categories: Category[];
  activeCategoryId: string | null;
  onCategoryChange: (id: string | null) => void;
}

export default function CategoryTabs({ categories, activeCategoryId, onCategoryChange }: CategoryTabsProps) {
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    let cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    
    if (!cleanPath.includes("/assets/")) {
      cleanPath = `/assets/img/category${cleanPath}`;
    }

    return `${baseUrl}${cleanPath}`;
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-5 px-1">Kategori</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
        {/* "Semua" Category */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap shadow-sm border ${
            activeCategoryId === null
              ? "bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE] scale-[1.02]"
              : "bg-white text-gray-600 border-gray-100 hover:border-gray-200 hover:bg-gray-50"
          }`}
        >
          <div className={`p-1.5 rounded-lg ${activeCategoryId === null ? "bg-[#4F46E5] text-white" : "bg-gray-100 text-gray-500"}`}>
            <LayoutGrid size={18} />
          </div>
          Semua
        </button>

        {/* Dynamic Categories */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap shadow-sm border ${
              activeCategoryId === category.id
                ? "bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE] scale-[1.02]"
                : "bg-white text-gray-600 border-gray-100 hover:border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className={`w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center ${activeCategoryId === category.id ? "bg-[#4F46E5]/10" : "bg-gray-100"}`}>
              {category.image ? (
                <img 
                  src={getImageUrl(category.image)} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=' + category.name[0];
                  }}
                />
              ) : (
                <div className="text-gray-400 font-bold">{category.name[0]}</div>
              )}
            </div>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
