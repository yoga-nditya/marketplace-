import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[60] min-h-screen bg-[#EEF2FF] flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full flex justify-center py-12">
        {children}
      </div>
    </div>
  );
}
