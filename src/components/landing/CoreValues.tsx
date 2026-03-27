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
    <section className="bg-gray-100 py-12 md:py-16 lg:py-24 px-6 md:px-12 lg:px-36 text-center">
      <h2 className="text-[24px] md:text-[28px] lg:text-[40px] font-medium text-gray-900 mb-6 md:mb-8">
        {t("coreValues.title")}
      </h2>
      <div className="flex flex-wrap justify-center xl:justify-between gap-4 md:gap-6 xl:gap-8">
        {values.map((val) => (
          <div
            key={val.titleKey}
            className="bg-white shadow-md rounded-2xl p-6 md:p-8 gap-4 md:gap-6 w-full sm:w-[300px] md:w-[348px] text-left"
          >
            <p className="font-semibold text-[20px] md:text-[24px] mb-4">
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
