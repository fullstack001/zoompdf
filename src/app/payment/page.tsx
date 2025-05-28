"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentForm from "@/components/payment/PaymentForm";
import PaymentPreview from "@/components/payment/PaymentPreview";
import PaymentFeatures from "@/components/payment/PaymentFeatures";
import PaymentTotal from "@/components/payment/PaymentTotal";
import "../../app/globals.css";

export default function PaymentPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login());
  }, [dispatch]);

  return (
    <div className="bg-[#EDF0FF] min-h-screen">
      <Navbar />      

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Payment details</h1>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <PaymentForm />
          </div>
          <div className="w-full max-w-sm space-y-4">
            <PaymentPreview />
            <PaymentFeatures />
            <PaymentTotal />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
