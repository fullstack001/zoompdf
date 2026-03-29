"use client";
import { useTranslations } from "next-intl";

const values = [
  {
    titleKey: "coreValues.openness",
    descKey: "coreValues.opennessDesc",
  },
  {
    titleKey: "coreValues.expertise",
    descKey: "coreValues.expertiseDesc",
  },
  {
    titleKey: "coreValues.growth",
    descKey: "coreValues.growthDesc",
  },
  {
    titleKey: "coreValues.diversity",
    descKey: "coreValues.diversityDesc",
  },
];

export default function CoreValues() {
  const t = useTranslations();
  const scrollToToolsGrid = () => {
    document
      .getElementById("tools-grid-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-gray-100 py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-36 text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-medium text-gray-900 mb-6 md:mb-8 px-1 break-words">
        {t("coreValues.title")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8 max-w-7xl mx-auto w-full">
        {values.map((val) => (
          <div
            key={val.titleKey}
            className="bg-white shadow-md rounded-2xl p-5 sm:p-6 md:p-8 gap-4 md:gap-6 w-full min-w-0 text-left"
          >
            <p className="font-semibold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 break-words">
              {t(val.titleKey)}
            </p>
            <button
              type="button"
              onClick={scrollToToolsGrid}
              className="text-[14px] md:text-[16px] text-gray-900 text-left hover:text-blue-600 transition-colors"
            >
              {t(val.descKey)}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
