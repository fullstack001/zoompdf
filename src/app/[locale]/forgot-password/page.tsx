"use client";

import { FormEvent, useState } from "react";
import { useLocale } from "next-intl";
import { forgotPassword } from "@/utils/apiUtils";
import { useLocalizedNavigation } from "@/utils/navigation";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const { navigate } = useLocalizedNavigation();
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (value: string): string => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      await forgotPassword(email.trim(), locale);
      setSuccessMessage(
        "If an account exists for that email, we sent password reset instructions. Check your inbox and spam folder.",
      );
      setEmail("");
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <Image
            src="/assets/images/logo.svg"
            alt="Pdfezy logo"
            width={140}
            height={40}
            priority
          />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Forgot password</h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Enter your email and we&apos;ll send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="forgot-email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              autoComplete="email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isSubmitting ? "Sending…" : "Send reset link"}
          </button>

          {error && (
            <p className="text-center text-sm text-red-600 font-medium">
              {error}
            </p>
          )}
          {successMessage && (
            <p className="text-center text-sm text-green-600 font-medium">
              {successMessage}
            </p>
          )}

          <p className="text-center text-sm text-gray-600">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
