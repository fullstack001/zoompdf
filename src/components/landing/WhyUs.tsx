"use client";
import Image from "next/image";
import { ChevronRight, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import "../../app/globals.css";

const features = [
  {
    titleKey: "whyUs.openness",
    descKey: "whyUs.opennessDesc",
    icon: "/assets/images/unlimited-downloads.png",
  },
  {
    titleKey: "whyUs.expertise",
    descKey: "whyUs.expertiseDesc",
    icon: "/assets/images/unlimited-edits.png",
  },
  {
    titleKey: "whyUs.growth",
    descKey: "whyUs.growthDesc",
    icon: "/assets/images/shield-done.png",
  },
  {
    titleKey: "whyUs.diversity",
    descKey: "whyUs.diversityDesc",
    icon: "/assets/images/time-circle.png",
  },
];

export default function WhyUs() {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = async () => {
    setIsLoading(true);
    try {
      // Add your navigation or action logic here
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 px-6 md:px-12 lg:px-24 bg-primary-50">
      <div className="mx-auto flex flex-col xl:flex-row items-center justify-between gap-12 lg:gap-24">
        <div className="flex-1 p-6 md:p-12 max-w-full lg:max-w-[816px] gap-8">
          <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-middle text-gray-900 mb-6 md:mb-8">
            {t("whyUs.title")}
          </h2>
          {features.map((f) => (
            <div
              key={f.titleKey}
              className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6 md:mb-8 border-b border-gray-300 pb-4"
            >
              <div className="flex-shrink-0">
                <Image
                  src={f.icon}
                  alt={t(f.titleKey)}
                  width={48}
                  height={0}
                  style={{ height: "auto" }}
                  className="mx-auto mb-2 md:mr-6"
                />
              </div>
              <div>
                <p className="font-semibold text-[20px] md:text-[24px] text-gray-900">
                  {t(f.titleKey)}
                </p>
                <p className="text-[14px] md:text-[16px] text-gray-600">
                  {t(f.descKey)}
                </p>
              </div>
            </div>
          ))}
          <button
            onClick={handleGetStarted}
            disabled={isLoading}
            className="bg-primary-900 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl text-[18px] md:text-[24px] font-bold disabled:opacity-60 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6" />
                {t("common.loading")}
              </>
            ) : (
              <>
                {t("plan.getStarted")}
                <ChevronRight className="inline w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6 ml-1 mb-1" />
              </>
            )}
          </button>
        </div>
        <Image
          src="/assets/images/why-us.png"
          alt={t("whyUs.title")}
          width={408}
          height={0}
          style={{ height: "auto" }}
          className="w-full max-w-[408px] md:max-w-[612px] lg:max-w-[816px] p-6 md:p-12"
        />
      </div>
    </section>
  );
}
