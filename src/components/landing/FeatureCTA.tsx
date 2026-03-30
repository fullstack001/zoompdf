"use client";
import Image from "next/image";
import { ChevronRight, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import "../../app/globals.css";

export default function FeatureCTA() {
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
    <section className="py-8 sm:py-10 md:py-12 bg-primary-900 px-4 sm:px-6 md:px-12 lg:px-24 text-center">
      <div className="mx-auto max-w-9xl flex flex-col lg:flex-row justify-between items-center gap-8 md:gap-12 lg:gap-16 xl:gap-24 w-full min-w-0">
        {/* min-w-0 lets the flex item shrink below intrinsic image width; wrapper scales with breakpoints */}
        <div className="w-full min-w-0 max-w-[min(100%,260px)] sm:max-w-[min(100%,320px)] md:max-w-[min(100%,380px)] lg:max-w-[min(100%,440px)] xl:max-w-[min(100%,508px)] mx-auto lg:mx-0 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
          <Image
            src="/assets/images/feature-cta.png"
            alt="PDFEZY illustration"
            width={508}
            height={476}
            className="w-full h-auto object-contain"
            sizes="(max-width: 640px) min(280px, 100vw), (max-width: 1024px) min(440px, 90vw), (max-width: 1280px) min(480px, 45vw), 508px"
            priority={false}
          />
        </div>
        <div className="text-center lg:text-left text-white flex-1 min-w-0 px-2 sm:px-4 md:px-8 lg:px-12 py-2 w-full">
          <h2 className="font-medium text-2xl sm:text-3xl md:text-[40px]  mb-4 sm:mb-6 md:mb-8 ">
            {t("featureCTA.title")}
          </h2>
          <p className="mb-6 md:mb-8 text-base sm:text-lg md:text-xl lg:text-2xl font-medium">
            {t("featureCTA.subtitle")}
          </p>
          <button
            onClick={handleGetStarted}
            disabled={isLoading}
            className="bg-primary-900 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl text-base sm:text-lg md:text-[24px] font-bold disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center mx-auto lg:mx-0 w-full max-w-sm sm:max-w-none sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 w-5 md:w-6 h-5 md:h-6" />
                {t("common.loading")}
              </>
            ) : (
              <>
                {t("plan.getStarted")}
                <ChevronRight className="inline w-5 md:w-6 h-5 md:h-6 ml-1 mb-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
