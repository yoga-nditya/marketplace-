"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>("Loading...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHello = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const res = await fetch(`${apiUrl}/api/hello`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        const data = await res.json();
        setMessage(data.message);
      } catch (err: any) {
        setError(err.message);
        setMessage("");
      }
    };

    fetchHello();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <h1 className="text-4xl font-bold">UMKM Marketplace</h1>
        
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Backend Connection Status:</h2>
          
          {error ? (
            <p className="text-red-500 font-medium">Error: {error}</p>
          ) : (
            <p className="text-green-600 dark:text-green-400 font-medium text-lg">
              {message}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
