"use client";
import { useState } from "react";

interface CouponInputProps {
  onApplyCoupon: (code: string) => void;
  isLoading: boolean;
  error: string | null;
  appliedCoupon: {
    code: string;
    discountType: string;
    discountValue: number;
  } | null;
  onRemoveCoupon: () => void;
}

export default function CouponInput({
  onApplyCoupon,
  isLoading,
  error,
  appliedCoupon,
  onRemoveCoupon,
}: CouponInputProps) {
  const [couponCode, setCouponCode] = useState("");

  const handleApply = () => {
    if (couponCode.trim()) {
      onApplyCoupon(couponCode.trim().toUpperCase());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApply();
    }
  };

  if (appliedCoupon) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-green-800">
              Coupon Applied: {appliedCoupon.code}
            </p>
            <p className="text-sm text-green-600">
              {appliedCoupon.discountType === "percentage"
                ? `${appliedCoupon.discountValue}% off`
                : `$${appliedCoupon.discountValue} off`}
            </p>
          </div>
          <button
            onClick={onRemoveCoupon}
            className="text-red-600 hover:text-red-800 font-medium text-sm"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Have a coupon code?
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          placeholder="Enter coupon code"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
          disabled={isLoading}
        />
        <button
          onClick={handleApply}
          disabled={isLoading || !couponCode.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
        >
          {isLoading ? "Checking..." : "Apply"}
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

