"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

const features = [
  {
    icon: "/assets/images/unlimited-downloads.png",
    textKey: "features.comprehensiveSuite",
  },
  {
    icon: "/assets/images/unlimited-edits.png",
    textKey: "features.unlimitedDocuments",
  },
  {
    icon: "/assets/images/shield-done.png",
    textKey: "features.comprehensiveSuite",
  },
  {
    icon: "/assets/images/time-circle.png",
    textKey: "features.unlimitedDocuments",
  },
];

export default function FeatureItems() {
  const t = useTranslations();

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-8 mb-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Image
            src={feature.icon}
            alt={t(feature.textKey)}
            width={24}
            height={0}
            style={{ height: "auto" }}
            className="w-6 h-6"
          />
          <span className="text-sm text-gray-600 font-medium">
            {t(feature.textKey)}
          </span>
        </div>
      ))}
    </div>
  );
}
