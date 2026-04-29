import React from "react";

export default function AdminPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-4xl text-gray-400">?</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-800">Coming Soon</h1>
      <p className="text-gray-500 mt-2">Halaman ini sedang dalam pengembangan.</p>
    </div>
  );
}
