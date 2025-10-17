"use client";
import React, { useCallback, useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useLocalizedNavigation } from "@/utils/navigation";
import { setUser } from "@/store/slices/userSlice";
import { registerEmail } from "@/utils/apiUtils";
import { useTranslations } from "next-intl";

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
  const { navigate } = useLocalizedNavigation();
  const [emailExists, setEmailExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const register = useCallback(async () => {
    if (!email || !isEmailValid(email)) {
      console.log("Invalid email");
      return;
    }

    setIsLoading(true);
    try {
      const response = await registerEmail(email);

      // Check if this is a 409 status (email already exists with subscription)
      if (response.statusCode === 409) {
        setEmailExists(true);
        return;
      }

      // Check if this is a 400 status (email already exists without subscription)
      if (response.statusCode === 400) {
        // Set user in Redux store and navigate to plan
        dispatch(
          setUser({
            email,
            id: response.user._id,
            name: response.user.name || "",
            cardnumber: response.user.cardnumber || "",
            avatar: response.user.avatar || "",
            isAdmin: response.user.isAdmin,
            subscription: null,
          })
        );
        onClose();
        navigate("/plan");
        return;
      }

      // Normal successful registration
      // Set user in Redux store with all required fields
      dispatch(
        setUser({
          email,
          id: response.user._id,
          name: response.user.name || "",
          cardnumber: response.user.cardnumber || "", // Add cardnumber property
          avatar: response.user.avatar || "",
          isAdmin: response.user.isAdmin,
          subscription: null,
        })
      );

      // Close modal
      onClose();
      navigate("/plan");
    } catch (error: any) {
      // Only log errors that are not expected 409/400 status codes
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [email, dispatch, navigate, onClose, isEmailValid]);

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
            {t("auth.emailAlreadyRegistered")}{" "}
            <div
              className="text-blue-600 cursor-pointer inline text-base"
              onClick={() => {
                navigate("/login");
              }}
            >
              {t("auth.logIn")}
            </div>
            .
          </div>
        )}
        <h3 className="text-xl font-bold mb-4">{t("email.enterEmail")}</h3>
        <div className="text-left w-full mb-2">
          <label htmlFor="email" className="text-sm font-medium">
            {t("auth.email")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder={t("auth.enterEmailAddress")}
            className="w-full mt-1 px-4 py-3 rounded-md bg-gray-100 text-sm"
          />
        </div>
        <p className="text-xs text-gray-500 mb-6">{t("email.downloadLink")}</p>
        <button
          onClick={register}
          disabled={!isEmailValid(email) || isLoading}
          className={`w-full py-3 rounded-md font-medium transition flex items-center justify-center ${
            isEmailValid(email) && !isLoading
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={18} />
              {t("common.loading")}
            </>
          ) : (
            t("email.getStarted")
          )}
        </button>
      </div>
    </div>
  );
}
