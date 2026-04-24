"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email dan password wajib diisi.",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await authService.login({ email, password });

      if (response.success && response.Userdata) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: response.message,
          showConfirmButton: false,
          timer: 1500,
        });

        // Simpan token ke localStorage
        localStorage.setItem("access_token", response.Userdata.access_token);
        localStorage.setItem("token_type", response.Userdata.token_type);
        
        // Redirect ke home
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Login",
          text: response.message,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Kesalahan Sistem",
        text: "Terjadi kesalahan koneksi ke server.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full max-w-md p-10 shadow-lg rounded-md border border-gray-100">
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Login GiftMoment</h1>
        <div className="w-16 h-0.5 bg-indigo-600 mx-auto mt-3"></div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-200 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:bg-gray-50"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-200 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:bg-gray-50"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#4338CA] text-white font-medium rounded hover:bg-indigo-800 transition-all mt-6 disabled:bg-indigo-300 flex items-center justify-center cursor-pointer"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-600">
        Baru di GiftMoment?{" "}
        <Link
          href="/auth/register"
          className="text-[#6366F1] font-medium hover:underline"
        >
          Daftar!
        </Link>
      </div>
    </div>
  );
}
