"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Boxes, 
  ShoppingBag, 
  Database, 
  Receipt, 
  Users, 
  HelpCircle,
  ChevronRight
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Kategori", icon: Boxes, path: "/admin/categories" },
  { name: "Produk", icon: ShoppingBag, path: "/admin/products" },
  { name: "Stok", icon: Database, path: "/admin/stock", hasDropdown: true },
  { name: "Transaksi", icon: Receipt, path: "/admin/transactions" },
  { name: "Customer", icon: Users, path: "/admin/customers" },
  { name: "FAQ", icon: HelpCircle, path: "/admin/faq" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 h-[calc(100vh-64px)] sticky top-16 flex flex-col py-6 overflow-y-auto">
      <div className="px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== "/admin" && pathname.startsWith(item.path));
          
          return (
            <div key={item.name}>
              <Link
                href={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-[#EBEBFF] text-[#5E5CE6] shadow-sm" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon className={`w-5 h-5 ${isActive ? "text-[#5E5CE6]" : "text-gray-400 group-hover:text-gray-600"}`} />
                  <span className="font-semibold text-sm">{item.name}</span>
                </div>
                {item.hasDropdown && (
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "rotate-90" : ""}`} />
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
