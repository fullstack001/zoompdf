"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
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

  const confirmPlan = () => {
    if (selectedOption) {
      dispatch(setPlan(selectedOption)); // Save the selected plan to the global store
      router.push("/payment"); // Navigate to the payment page
    }
  };

  return (
    <div className="bg-primary-50-1 min-h-screen">
      <Navbar />
      <main className="mx-auto px-4 md:px-20 lg:px-60 py-12 space-y-12">
        <PlanHero handleGoPayment={confirmPlan} />
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <PlanPreview />
          <div className=" max-w-full  md:max-w-[50%]">
            <PlanOptions
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <PlanFeatures selectedPlan={selectedOption} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
