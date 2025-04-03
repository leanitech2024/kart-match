'use client'

import { useState, useEffect } from "react";
export default function Loading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); 
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loading ? (
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      ) : (
        <div className="text-lg font-semibold">Data Loaded</div>
      )}
    </div>
  );
}
