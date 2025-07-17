"use client";
import { useTranslations } from "next-intl";
import { useLocalizedNavigation } from "@/utils/navigation";

export default function FooterBottom() {
  const t = useTranslations();
  const { navigate } = useLocalizedNavigation();

  return (
    <div className="py-4 sm:py-6 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="text-sm text-gray-600 text-center sm:text-left">
          {t("footer.allRightsReserved")}
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-sm">
          <button
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            onClick={() => navigate("/disclaimer")}
          >
            {t("footer.disclaimer")}
          </button>
          <button
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            onClick={() => navigate("/privacy-policy")}
          >
            {t("footer.privacyPolicy")}
          </button>
          <button
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            onClick={() => navigate("/terms-of-service")}
          >
            {t("footer.termsOfService")}
          </button>
        </div>
      </div>
    </div>
  );
}
