import React from "react";
import { LockIcon, Loader2 } from "lucide-react";
import type { AuthButtonProps } from "./types";

/**
 * Authentication button component for sign in/sign up actions
 */
export const AuthButton: React.FC<AuthButtonProps> = ({
  onClick,
  label,
  className = "",
  isLoading = false,
  loadingText,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`px-4 py-3 text-2xl bg-white border-2 text-[#3758F9] border-[#3758F9] rounded-xl flex items-center hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      aria-label={label}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={14} />
          <span className="ml-1 font-medium">{loadingText || label}</span>
        </>
      ) : (
        <>
          <LockIcon size={14} />
          <span className="ml-1 font-medium">{label}</span>
        </>
      )}
    </button>
  );
};
