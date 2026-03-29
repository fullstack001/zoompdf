"use client";
import { useTranslations } from "next-intl";
import "../../app/globals.css";

export default function HowItWorks() {
  const t = useTranslations();

  const steps = ["howItWorks.step1", "howItWorks.step2", "howItWorks.step3"];

  return (
    <section className="bg-white px-4 py-8 sm:px-6 sm:py-10 md:p-12 lg:p-24">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <h2 className="text-2xl sm:text-3xl md:text-[40px] text-[#212121] font-medium text-center mb-8 md:mb-12 px-1 break-words">
          {t("howItWorks.title")}
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-stretch md:items-start gap-6 md:gap-6 lg:gap-8">
          {steps.map((stepKey, i) => (
            <div
              key={i}
              className="p-3 sm:p-4 md:p-6 w-full md:flex-1 md:min-w-0 max-w-md md:max-w-none mx-auto flex flex-row md:flex-col gap-4 items-center md:items-center text-left md:text-center"
            >
              <div className="bg-primary-900 text-white rounded-full font-bold text-xl sm:text-2xl md:text-[28px] lg:text-[32px] w-12 h-12 sm:w-14 sm:h-14 md:w-[72px] md:h-[72px] lg:w-[78px] lg:h-[78px] shrink-0 flex items-center justify-center">
                {i + 1}
              </div>
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#616161] font-medium min-w-0 flex-1 md:flex-none">
                {t(stepKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
