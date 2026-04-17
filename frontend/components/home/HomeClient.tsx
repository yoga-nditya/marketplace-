"use client";

import Banner from "./Banner";
import CategoryTabs from "./CategoryTabs";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";

export default function HomeClient() {
  return (
    <div className="bg-white min-h-screen">
      {/* Container widened for better page coverage */}
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        <Banner />
        <CategoryTabs />
        <ProductGrid />
        <Pagination />
      </div>
    </div>
  );
}
