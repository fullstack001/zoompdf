"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanHero from "@/components/plan/PlanHero";
import PlanPreview from "@/components/plan/PlanPreview";
import PlanOptions from "@/components/plan/PlanOptions";
import PlanFeatures from "@/components/plan/PlanFeatures";
import "../../app/globals.css"; // Ensure global styles are imported

export default function PlanPage() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(login());
    }, [dispatch]);

  return (
    <div className="bg-primary-50-1 min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <PlanHero />
        <div className="flex flex-col lg:flex-row gap-10">
          <PlanPreview />
          <div>
            <PlanOptions />
            <PlanFeatures />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
