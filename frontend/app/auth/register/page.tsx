"use client";

import React from "react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="bg-white w-full max-w-md p-10 shadow-lg rounded-md">
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Register GiftMoment</h1>
        <div className="w-16 h-0.5 bg-gray-800 mx-auto mt-3"></div>
      </div>

      <form className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Nama"
            className="w-full px-4 py-3 border border-gray-200 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-200 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-200 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Konfirmasi Password"
            className="w-full px-4 py-3 border border-gray-200 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#4338CA] text-white font-medium rounded hover:bg-indigo-800 transition-colors mt-6"
        >
          Register
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-600">
        Sudah punya akun?{" "}
        <Link
          href="/auth/login"
          className="text-[#6366F1] font-medium hover:underline"
        >
          Masuk
        </Link>
      </div>
    </div>
  );
}
