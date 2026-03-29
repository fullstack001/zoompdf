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
      await new Promise((resolve) => setTimeout(resolve, 500));
      document
        .getElementById("tools-grid-section")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-12 lg:px-24 bg-primary-50">
      <div className="mx-auto max-w-9xl flex flex-col lg:flex-row lg:items-start items-center justify-between gap-8 lg:gap-12 xl:gap-16 w-full min-w-0">
        <div className="flex-1 min-w-0 w-full lg:max-w-[55%] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 gap-8 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[40px] font-medium text-gray-900 mb-6 md:mb-8 break-words">
            {t("whyUs.title")}
          </h2>
          {features.map((f) => (
            <div
              key={f.titleKey}
              className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-6 md:mb-8 border-b border-gray-300 pb-4"
            >
              <div className="flex-shrink-0 mx-auto sm:mx-0 sm:mr-4">
                <Image
                  src={f.icon}
                  alt=""
                  width={55}
                  height={55}
                  className="mx-auto sm:mx-0 w-11 h-11 sm:w-12 sm:h-12 object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-900">
                  {t(f.titleKey)}
                </p>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  {t(f.descKey)}
                </p>
              </div>
            </div>
          ))}
          <button
            onClick={handleGetStarted}
            disabled={isLoading}
            className="bg-primary-900 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl text-base sm:text-lg md:text-2xl font-bold disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center mx-auto lg:mx-0 w-full max-w-sm sm:max-w-none sm:w-auto min-h-[44px]"
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
        {/* min-w-0: flex item can shrink below image intrinsic size; clamp() scales width smoothly with viewport */}
        <div className="w-full min-w-0 flex justify-center lg:justify-end lg:w-[44%] lg:max-w-[720px] px-2 sm:px-4 py-2">
          <div className="relative w-full max-w-[clamp(11rem,88vw,45rem)] lg:max-w-full aspect-[720/650]">
            <Image
              src="/assets/images/why-us.png"
              alt={t("whyUs.title")}
              fill
              className="object-contain object-center"
              sizes="(max-width: 1023px) 88vw, (max-width: 1536px) 42vw, 720px"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
