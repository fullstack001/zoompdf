"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Import RootState for type safety

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentForm from "@/components/payment/PaymentForm";
import PaymentPreview from "@/components/payment/PaymentPreview";
import PaymentFeatures from "@/components/payment/PaymentFeatures";
import PaymentTotal from "@/components/payment/PaymentTotal";
import CouponInput from "@/components/payment/CouponInput";
import "@/app/globals.css";

const prices = [
  { id: "7_free", priceId: "price_1RegGPHWocuqbvt5mcTEGCtJ", price: 0.95 },
  { id: "7_full", priceId: "price_1RegGsHWocuqbvt5qR7r2lNu", price: 1.95 },
  { id: "annual", priceId: "price_1RegHuHWocuqbvt5WwHOKAJt", price: 16.58 },
];

interface AppliedCoupon {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
}

export default function PaymentPage() {
  const currentPlan = useSelector((state: RootState) => state.flow.plan); // Get current plan
  const user = useSelector((state: RootState) => state.user); // Use RootState for type safety
  console.log(user);

  const selectedPrice =
    prices.find((plan) => plan.id === currentPlan) || prices[0]; // Ensure a valid plan object is always selected

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  // Calculate final price after discount
  const calculateFinalPrice = () => {
    if (!appliedCoupon) return selectedPrice.price;

    if (appliedCoupon.discountType === "percentage") {
      return selectedPrice.price - (selectedPrice.price * appliedCoupon.discountValue) / 100;
    } else {
      return Math.max(0, selectedPrice.price - appliedCoupon.discountValue);
    }
  };

  const handleApplyCoupon = async (code: string) => {
    setIsValidatingCoupon(true);
    setCouponError(null);

    try {
      const response = await fetch("https://api.pdfezy.com/api/admin/coupons/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          plan: currentPlan,
        }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        setAppliedCoupon({
          code,
          discountType: data.discountType,
          discountValue: data.discountValue,
        });
        setCouponError(null);
      } else {
        setCouponError(data.msg || "Invalid coupon code");
        setAppliedCoupon(null);
      }
    } catch (error) {
      setCouponError("Failed to validate coupon. Please try again.");
      setAppliedCoupon(null);
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const finalPrice = calculateFinalPrice();

  return (
    <div className="bg-[#EDF0FF] min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl md:text-4xl font-semibold mb-2 text-gray-800">
          Payment details
        </h1>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <PaymentForm 
              plan={selectedPrice} 
              email={user.email}
              couponCode={appliedCoupon?.code || null}
            />
          </div>
          <div className="w-full max-w-sm space-y-4">
            <PaymentPreview />
            <PaymentFeatures selectedPlan={currentPlan} />
            <CouponInput
              onApplyCoupon={handleApplyCoupon}
              isLoading={isValidatingCoupon}
              error={couponError}
              appliedCoupon={appliedCoupon}
              onRemoveCoupon={handleRemoveCoupon}
            />
            <PaymentTotal 
              price={selectedPrice.price}
              discount={appliedCoupon ? (selectedPrice.price - finalPrice) : 0}
              finalPrice={finalPrice}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
