"use client";
import { useTranslations } from "next-intl";

const values = [
  {
    titleKey: "whyUs.openness",
    descKey: "whyUs.opennessDesc",
  },
  {
    titleKey: "whyUs.expertise",
    descKey: "whyUs.expertiseDesc",
  },
  {
    titleKey: "whyUs.growth",
    descKey: "whyUs.growthDesc",
  },
  {
    titleKey: "whyUs.diversity",
    descKey: "whyUs.diversityDesc",
  },
];

export default function CoreValues() {
  const t = useTranslations();

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
            <p className="text-[14px] md:text-[16px] text-gray-600">
              {t(val.descKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
