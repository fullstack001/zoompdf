"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "../../store/slices/userSlice";
import { login } from "../../store/slices/authSlice";
import { RootState } from "@/store/store";
import { downloadFile, loginUser, downloadSavedPdf } from "@/utils/apiUtils";
import ForgotPasswordModal from "./ForgotPasswordModal";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const dispatch = useDispatch();
  const flow = useSelector((state: RootState) => state.flow);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
            const { token, user, subscription } = await loginUser(email, password);

      // Dispatch actions to set user data and login state
      dispatch(
        setUser({
          email: user.email,
          name: user.name || "", // Ensure name is set, default to empty string if not provided
          subscription: subscription
            ? {
                subscriptionId: subscription.subscriptionId,
                plan: subscription.plan,
                subscriptionType: subscription.subscriptionType,
                subscribedDate: subscription.subscribedDate,
                expiryDate: subscription.expiryDate,
              }
            : null,
          id: user.id || "",
          avatar: user.avatar || "", // Add default empty string for avatar
          isAdmin: user.isAdmin,
        })
      );
      dispatch(login());

      // Optionally, store the token in localStorage or cookies
      localStorage.setItem("authToken", token);
      if (subscription && new Date(subscription.expiryDate) > new Date()) {
        // Check for edited PDF data first
        if (flow.fileName && flow.action) {
          // Fallback to regular conversion flow
          try {
            downloadFile(flow.fileName, flow.action, token, router.push);
            router.push(`/files`);
          } catch (err) {
            console.error("Error downloading file:", err);
            window.alert("Failed to download file.");
          }
        } else {
          router.push(`/files`); // Redirect to files page if no flow data
        }
      } else {
        router.push(`/plan`); // Redirect to register page if subscription is not valid
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex justify-center md:justify-start  m-6">
          <Image
            src="/assets/images/logo.svg"
            alt="PDF Guru Logo"
            width={216}
            height={40}
          />
        </div>
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="max-w-xl w-full  p-8 rounded-lg ">
            <h1 className="text-center text-2xl mb-5 font-bold text-gray-800">
              Log in To PDFEZY
            </h1>
            <h2 className="text-sm font-semibold text-center text-gray-800">
              If you are logging in for the first time, please set your
              password.
            </h2>

            <form className="space-y-4 mt-4 px-12" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Create password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-gray-300 focus:ring-purple-500"
                  />
                  Remember me
                </label>
                <div
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-sm text-purple-500 cursor-pointer hover:underline"
                >
                  Forgot password
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Log in
              </button>
              <div className="mt-4 text-center font-light text-sm">
                <span>New to ZoomPDF?</span>
                <Link href="/" className="text-purple-500  ml-1">
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
        <footer className="text-sm text-center text-gray-500 mt-6 p-4">
          PDFGuru.com and our partners use cookies. By using this site you agree
          to our use of cookies as described in our{" "}
          <Link
            href="/privacy-policy"
            className="text-purple-500 hover:underline"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/cookie-policy"
            className="text-purple-500 hover:underline"
          >
            Cookie Tracking Policy
          </Link>
          .
        </footer>
      </div>
      <ForgotPasswordModal
        show={showForgotPasswordModal}
        handleClose={() => setShowForgotPasswordModal(false)}
      />
    </>
  );
}
