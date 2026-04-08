"use client";

import { FormEvent, useState } from "react";
import { registerEmail } from "@/utils/apiUtils";
import { useLocalizedNavigation } from "@/utils/navigation";

export default function RegisterPage() {
  const { navigate } = useLocalizedNavigation();
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
      const result = await registerEmail(email.trim());
      if ((result as any).statusCode === 409) {
        setError("This email already has an active subscription. Please sign in.");
      } else if ((result as any).statusCode === 400) {
        setError("This email is already registered. Please sign in.");
      } else {
        const mailStatus = result.welcomeEmailStatus;
        if (mailStatus?.sent) {
          setSuccessMessage(
            "Account created. Check your email for your default password and sign-in link."
          );
        } else if (mailStatus?.skipped) {
          setSuccessMessage(
            `Account created. Welcome email skipped (${mailStatus.reason || "mail service not configured"}).`
          );
        } else if (mailStatus && !mailStatus.sent) {
          setSuccessMessage(
            `Account created. Email delivery failed (${mailStatus.reason || "unknown error"}).`
          );
        } else {
          setSuccessMessage("Account created successfully.");
        }
        setEmail("");
      }
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
        <h1 className="text-2xl font-bold text-center mb-8">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <label
            htmlFor="register-email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>

          <div className="rounded-lg bg-blue-50 border border-blue-100 px-4 py-3 text-center text-sm text-blue-900">
            We will email your default password and a link to sign in. Check spam if you do not see it.
          </div>

          {error && (
            <p className="mt-4 text-center text-sm text-red-600 font-medium">{error}</p>
          )}
          {successMessage && (
            <p className="mt-4 text-center text-sm text-green-600 font-medium">
              {successMessage}
            </p>
          )}

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </button>
          </p>

          <p className="text-center text-xs text-gray-600 leading-5">
            By clicking <strong>Create account</strong> or <strong>Sign in</strong>, you
            agree to the{" "}
            <a href="/terms-of-service" className="text-blue-600 hover:underline">
              Terms of Service
            </a>
            ,{" "}
            <a href="/subscription-policy" className="text-blue-600 hover:underline">
              Subscription Terms
            </a>
            ,{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            , and{" "}
            <a href="/cookie-policy" className="text-blue-600 hover:underline">
              Cookie Policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
