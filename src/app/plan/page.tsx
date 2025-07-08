"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import { setPlan } from "@/store/slices/flowSlice"; // Import the setPlan action
import { useRouter } from "next/navigation"; // Import useRouter for navigation

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanHero from "@/components/plan/PlanHero";
import PlanPreview from "@/components/plan/PlanPreview";
import PlanOptions from "@/components/plan/PlanOptions";
import PlanFeatures from "@/components/plan/PlanFeatures";
import "../../app/globals.css"; // Ensure global styles are imported

export default function PlanPage() {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize router
  const [selectedOption, setSelectedOption] = useState<string | null>("7_full");

  useEffect(() => {
    dispatch(login());
  }, [dispatch]);

  const confirmPlan = () => {
    if (selectedOption) {
      dispatch(setPlan(selectedOption)); // Save the selected plan to the global store
      router.push("/payment"); // Navigate to the payment page
    }
  };

  return (
    <div className="bg-primary-50-1 min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <PlanHero handleGoPayment={confirmPlan} />
        <div className="flex flex-col lg:flex-row gap-10">
          <PlanPreview />
          <div>
            <PlanOptions
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <PlanFeatures />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
