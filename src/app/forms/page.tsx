"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormSidebar from "@/components/forms/FormSidebar";
import FormGrid from "@/components/forms/FormGrid";
import { Search } from "lucide-react";

export default function FormPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login());
  }, [dispatch]);

  return (
    <div className="bg-[#EDF0FF] min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto flex gap-6 px-4 py-12 space-y-10">
        <FormSidebar />
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Forms</h1>
            <div className="relative w-72">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={16}
              />
              <input
                placeholder="Search Forms"
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>
          <FormGrid />
          <div className="flex justify-center mt-6 gap-2">
            {[1, 2, 3, 4, 10].map((n) => (
              <button
                key={n}
                className={`w-6 h-6 text-xs rounded ${
                  n === 2 ? "bg-blue-600 text-white" : "bg-white text-black"
                } border border-gray-300`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
