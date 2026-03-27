"use client";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthResponse, changeEmail, changePassword } from "@/utils/apiUtils";
import { setUser } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";

interface AccountDetailsProps {
  email: string;
}

export default function AccountDetails({ email }: AccountDetailsProps) {
  const t = useTranslations();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const refreshUserFromAuthResponse = (data: AuthResponse) => {
    localStorage.setItem("authToken", data.token);
    dispatch(
      setUser({
        id: data.user._id || "",
        email: data.user.email || "",
        name: data.user.name || "",
        cardnumber: data.user.cardnumber || "",
        avatar: data.user.avatar || "",
        isAdmin: data.user.isAdmin || false,
        subscription: data.subscription
          ? {
              subscriptionId: data.subscription.subscriptionId,
              plan: data.subscription.plan,
              subscriptionType: data.subscription.subscriptionType,
              subscribedDate: data.subscription.subscribedDate,
              expiryDate: data.subscription.expiryDate,
            }
          : null,
      })
    );
  };

  const handleChangeEmail = async (e: FormEvent) => {
    e.preventDefault();
    setEmailMessage("");

    if (!newEmail.trim()) {
      setEmailMessage("Please enter a new email.");
      return;
    }
    if (!emailPassword) {
      setEmailMessage("Please enter your password.");
      return;
    }

    setIsUpdatingEmail(true);
    try {
      const data = await changeEmail(newEmail.trim(), emailPassword);
      refreshUserFromAuthResponse(data);
      setEmailMessage("Email updated successfully.");
      setEmailPassword("");
      setNewEmail("");
    } catch (error) {
      setEmailMessage(
        error instanceof Error ? error.message : "Failed to update email."
      );
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordMessage("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage("New password must be at least 6 characters.");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const result = await changePassword(oldPassword, newPassword);
      localStorage.setItem("authToken", result.token);
      setPasswordMessage("Password updated successfully.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setPasswordMessage(
        error instanceof Error ? error.message : "Failed to update password."
      );
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 mb-3 sm:mb-4 lg:mb-6">
        {t("account.account")}
      </h2>
      <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
        {t("account.betterExperience")}
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            {t("auth.emailAddress")}
          </label>
          <input
            type="email"
            disabled
            value={user.email || email || "email@domain.com"}
            className="w-full p-3 sm:p-4 rounded-lg bg-gray-50 border border-gray-300 text-sm sm:text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <form onSubmit={handleChangeEmail} className="space-y-3">
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            New Email
          </label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter your new email"
            className="w-full p-3 sm:p-4 rounded-lg bg-white border border-gray-300 text-sm sm:text-base text-gray-800"
          />
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            value={emailPassword}
            onChange={(e) => setEmailPassword(e.target.value)}
            placeholder="Enter your password to confirm"
            className="w-full p-3 sm:p-4 rounded-lg bg-white border border-gray-300 text-sm sm:text-base text-gray-800"
          />
          <button
            type="submit"
            disabled={isUpdatingEmail}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold disabled:opacity-60"
          >
            {isUpdatingEmail ? "Updating..." : "Change Email"}
          </button>
          {emailMessage && (
            <p className="text-sm text-gray-700 mt-1">{emailMessage}</p>
          )}
        </form>

        <form onSubmit={handleChangePassword} className="space-y-3 pt-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Current password"
            className="w-full p-3 sm:p-4 rounded-lg bg-white border border-gray-300 text-sm sm:text-base text-gray-800"
          />
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            className="w-full p-3 sm:p-4 rounded-lg bg-white border border-gray-300 text-sm sm:text-base text-gray-800"
          />
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full p-3 sm:p-4 rounded-lg bg-white border border-gray-300 text-sm sm:text-base text-gray-800"
          />
          <button
            type="submit"
            disabled={isUpdatingPassword}
            className="px-5 py-2.5 rounded-lg bg-gray-800 text-white text-sm font-semibold disabled:opacity-60"
          >
            {isUpdatingPassword ? "Updating..." : "Change Password"}
          </button>
          {passwordMessage && (
            <p className="text-sm text-gray-700 mt-1">{passwordMessage}</p>
          )}
        </form>

        <div className="mt-2 sm:mt-4">
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
            {t("account.importantUpdates")}
          </p>
        </div>
      </div>
    </div>
  );
}
