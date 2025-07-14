import { X, ArrowDown } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react"; // Import useEffect and useCallback

import { setUser } from "../../store/slices/userSlice"; // Import setUser action

interface EmailModalProps {
  isVisible: boolean;
  email: string;
  onEmailChange: (email: string) => void;
  onClose: () => void;
}

export default function EmailModal({
  isVisible,
  email,
  onEmailChange,
  onClose,
}: EmailModalProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [emailExists, setEmailExists] = useState(false); // State to track if email exists

  if (!isVisible) return null;

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const register = useCallback(async () => {
    if (isEmailValid(email)) {
      setIsLoading(true); // Set loading state to true
      try {
        const response = await axios.post(
          "https://api.pdfezy.com/api/auth/register-email",
          { email }
        );
        const { token } = response.data;
        interface DecodedToken {
          user?: {
            email?: string;
            avatar?: string;
            id?: string;
            isAdmin?: boolean;
          };
          subscription?: string;
        }

        const userData: DecodedToken = jwtDecode(token);
        console.log("Decoded user data:", userData);

        const mappedUserData = {
          email: userData.user?.email ?? "",
          subscription: {
            subscriptionId: userData.subscription || "",
            plan: "", // Default to an empty string
            subscriptionType: "", // Default to an empty string
            subscribedDate: "", // Default to an empty string
            expiryDate: "", // Default to an empty string
          },
          id: userData.user?.id ?? "", // Default to an empty string
          avatar: userData.user?.avatar ?? "", // Default to an empty string
          isAdmin: false, // Default to false
          name: "", // Default to an empty string
        };
        dispatch(setUser(mappedUserData));
        router.push(`/plan`); // Redirect to register page
        onClose();
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (
            error.response?.status === 409 &&
            error.response?.data?.msg ===
              "Email is already registered with a subscription"
          ) {
            setEmailExists(true);
          } else if (error.response?.status === 400) {
            const userData = error.response.data.user;
            console.log(error.response.data);
            const mappedUserData = {
              email: userData?.email ?? "",
              subscription: null,
              id: userData?.id ?? "",
              avatar: userData?.avatar ?? "",
              isAdmin: false,
              name: "",
            };
            dispatch(setUser(mappedUserData));
            router.push(`/plan`);
          } else {
            alert("Registration failed. Please try again.");
          }
        }
      } finally {
        setIsLoading(false); // Reset loading state
      }
    } else {
      alert("Please enter a valid email address.");
    }
  }, [email, dispatch, router, onClose]); // Add dependencies

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isEmailValid(email)) {
        register();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [email, register]); // Ensure dependencies are stable

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl w-full max-w-md p-8 text-center shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>
        {emailExists && (
          <div className="bg-red-100 text-sm text-red-800 p-4 rounded mb-4">
            This email is already registered. Please{" "}
            <div
              className="text-blue-600 cursor-pointer inline text-base"
              onClick={() => {
                router.push("login");
              }}
            >
              log in
            </div>
            .
          </div>
        )}
        <h3 className="text-xl font-bold mb-4">Enter your Email address</h3>
        <div className="text-left w-full mb-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter Your Email Address"
            className="w-full mt-1 px-4 py-3 rounded-md bg-gray-100 text-sm"
          />
        </div>
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold mt-4 flex justify-center items-center gap-2"
          onClick={() => {
            if (isEmailValid(email)) {
              register();
            }
          }}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <span>Loading...</span> // Show loading text
          ) : (
            <>
              Download <ArrowDown size={16} />
            </>
          )}
        </button>
        <p className="text-xs text-gray-500 mt-4">
          By clicking &apos;Download File,&apos; you agree to our{" "}
          <a href="#" className="underline">
            Terms and conditions
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
