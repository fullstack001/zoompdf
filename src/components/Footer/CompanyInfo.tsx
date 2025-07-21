"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CompanyInfo() {
  const t = useTranslations();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center sm:justify-start lg:justify-start space-x-3">
        <Image
          src="/assets/images/logo.svg"
          alt="PDFEZY Logo"
          width={40}
          height={40}
          className="w-10 h-10"
        />
        <span className="text-2xl font-bold text-gray-900">PDFEZY</span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto sm:mx-0 lg:mx-0 lg:max-w-sm">
        {t("footer.companyDescription")}
      </p>
    </div>
  );
}
