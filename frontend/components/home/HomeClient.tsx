"use client";

import { useState, useEffect, useMemo } from "react";
import Banner from "./Banner";
import CategoryTabs from "./CategoryTabs";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import { fetchCategories, Category } from "@/services/categoryService";
import { fetchProducts, Product } from "@/services/productService";

export default function HomeClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [catData, prodData] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);
        setCategories(catData);
        setProducts(prodData);
      } catch (error) {
        console.error("Failed to load home data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    const activeCategory = categories.find((c) => c.id === activeCategoryId);
    let filtered = activeCategory
      ? products.filter((p) => p.categories_id === activeCategory.name)
      : products;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.categories_id.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [products, categories, activeCategoryId, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategoryId, searchQuery]);
  const totalResults = filteredProducts.length;
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
  const displayedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  return (
    <div className="bg-white min-h-screen">
      {/* Reduced top padding since Navbar is now present */}
      <div className="max-w-[1280px] mx-auto px-6 py-4">
        <Banner />
        <CategoryTabs
          categories={categories}
          activeCategoryId={activeCategoryId}
          onCategoryChange={setActiveCategoryId}
        />
        <ProductGrid
          products={displayedProducts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isLoading={isLoading}
          isFiltered={!!(activeCategoryId || searchQuery.trim())}
        />
        {!isLoading && totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            onPageChange={setCurrentPage}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        )}
      </div>
    </div>
  );
}
