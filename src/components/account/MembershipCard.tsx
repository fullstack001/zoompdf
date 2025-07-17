"use client";
import { useTranslations } from "next-intl";

export default function MembershipCard() {
  const t = useTranslations();

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-1">{t("account.membership")}</h2>
      <p className="text-sm text-gray-600 mb-4">
        {t("account.noSubscription")}
      </p>
      <div className="bg-blue-100 p-4 rounded-lg text-center">
        <h3 className="text-lg font-bold mb-2">
          {t("account.unlockAllTools")}
        </h3>
        <p className="text-sm mb-4">
          {t("account.fullAccess")} <br />
          {t("account.subscribeNow")}
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700">
          {t("account.subscribe")}
        </button>
      </div>
    </div>
  );
}
