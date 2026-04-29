import React from "react";
import { ShoppingCart, Tag, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "MONTHLY TRANSACTIONS TOTAL",
    value: "0",
    icon: ShoppingCart,
    color: "bg-[#EBF5FF]",
    iconColor: "bg-[#60A5FA]",
    textColor: "text-[#1E40AF]",
  },
  {
    title: "MONTHLY SALES TOTAL",
    value: "Rp. 0",
    icon: Tag,
    color: "bg-[#FFF7ED]",
    iconColor: "bg-[#F97316]",
    textColor: "text-[#9A3412]",
  },
  {
    title: "MONTHLY PROFIT TOTAL",
    value: "Rp. 0",
    icon: TrendingUp,
    color: "bg-[#ECFDF5]",
    iconColor: "bg-[#10B981]",
    textColor: "text-[#065F46]",
  },
];

const stockWarnings = [
  { id: 1, kategori: "Hantaran", nama: "Cutting Acrylic 25x35cm", stok: 5 },
  { id: 2, kategori: "Hantaran", nama: "Gift Wedding Jam 25x35cm", stok: 5 },
  { id: 3, kategori: "Hantaran", nama: "Cutting Acrylic 20x30cm", stok: 5 },
  { id: 4, kategori: "Souvenir", nama: "Talenan", stok: 0 },
  { id: 5, kategori: "Hantaran", nama: "Cutting Acrylic Premium Flower 30x45cm", stok: 5 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className={`${stat.color} rounded-2xl p-6 shadow-sm border border-white flex items-center gap-6 transition-transform hover:scale-[1.02]`}>
            <div className={`${stat.iconColor} p-4 rounded-2xl text-white shadow-lg`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 tracking-wider mb-1 uppercase">{stat.title}</p>
              <p className="text-3xl font-black text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Stock Warning</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#5E5CE6] text-white">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10">NO</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10">KATEGORI</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-r border-white/10">NAMA PRODUK</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">SISA STOK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stockWarnings.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600 border-r border-gray-50">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 border-r border-gray-50">{item.kategori}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 border-r border-gray-50">{item.nama}</td>
                  <td className={`px-6 py-4 text-sm font-bold ${item.stok === 0 ? 'text-red-500' : 'text-gray-600'}`}>
                    {item.stok}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
