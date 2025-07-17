import { X, ArrowDown } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { registerEmail } from "@/utils/apiUtils";
import { useLocalizedNavigation } from "@/utils/navigation";

import { setUser } from "../../store/slices/userSlice";

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
  const { navigate } = useLocalizedNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const isEmailValid = useCallback((email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const register = useCallback(async () => {
    if (isEmailValid(email)) {
      setIsLoading(true);
      try {
        const { user } = await registerEmail(email);

        const mappedUserData = {
          email: user.email,
          subscription: null,
          id: user.id,
          avatar: user.avatar || "",
          isAdmin: user.isAdmin,
          name: user.name || "",
        };
        dispatch(setUser(mappedUserData));
        navigate(`/plan`);
        onClose();
      } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error) {
          if (
            error.message.includes(
              "Email is already registered with a subscription"
            )
          ) {
            setEmailExists(true);
          } else if (error.message.includes("Email is already registered")) {
            const mappedUserData = {
              email: email,
              subscription: null,
              id: "",
              avatar: "",
              isAdmin: false,
              name: "",
            };
            dispatch(setUser(mappedUserData));
            navigate(`/plan`);
          } else {
            alert("Registration failed. Please try again.");
          }
        } else {
          alert("Registration failed. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please enter a valid email address.");
    }
  }, [email, dispatch, router, onClose, isEmailValid]);

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
  }, [email, register, isEmailValid]);

  if (!isVisible) return null;

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
                navigate("/login");
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
          disabled={isLoading}
        >
          {isLoading ? (
            <span>Loading...</span>
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
