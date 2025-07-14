"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const ResetPasswordPageContent = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Extract token from URL query
  console.log("Reset Password Token:", token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://api.pdfezy.com/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Failed to reset password");
      } else {
        setSuccessMessage(data.msg || "Password reset successfully");
        setTimeout(() => router.push("/login"), 3000); // Redirect to login after success
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex justify-center md:justify-start  m-6">
        <Image
          src="/assets/images/logo.svg"
          alt="PDF Guru Logo"
          width={216}
          height={40}
        />
      </div>
      <div className=" flex flex-col  justify-center mx-auto max-w-2xl md:mt-36">
        <div className="max-w-xl w-full  p-8 rounded-lg ">
          <h1 className="text-2xl font-semibold text-gray-800">
            Reset Password
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mt-4 px-6 md:min-w-40"
        >
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-600"
            >
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm mb-4">{successMessage}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Reset Password
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          <a href="/login" className="text-blue-600 hover:underline">
            Go to Login
          </a>
        </p>
      </div>
    </div>
  );
};

const ResetPasswordPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ResetPasswordPageContent />
  </Suspense>
);

export default ResetPasswordPage;
