"use client";
import { useTranslations } from "next-intl";

export default function AccountDetails() {
  const t = useTranslations();

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-1">{t("account.account")}</h2>
      <p className="text-sm text-gray-600 mb-4">
        {t("account.betterExperience")}
      </p>
      <label className="block text-sm font-medium mb-1">
        {t("auth.emailAddress")}
      </label>
      <input
        type="email"
        disabled
        defaultValue="email@domain.com"
        className="w-full p-2 rounded bg-white border text-sm text-gray-500"
      />
      <p className="text-xs text-gray-500 mt-2">
        {t("account.importantUpdates")}
      </p>
    </div>
  );
}
