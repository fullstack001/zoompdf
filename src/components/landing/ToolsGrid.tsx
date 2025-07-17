"use client";
import Image from "next/image";
import { useLocalizedNavigation } from "@/utils/navigation";
import { useTranslations } from "next-intl";
import tools from "@/data/tools";

export default function ToolsGrid() {
  const { navigate } = useLocalizedNavigation();
  const t = useTranslations();

  return (
    <section className=" p-8 md:p-24 text-center">
      <h2 className="text-[28px] md:text-[40px] text-[#212121] font-medium text-center mb-8 md:mb-12">
        {t("common.chooseBestTool")}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-12 mx-auto px-2 md:px-4">
        {tools.map((tool) => (
          <div
            key={tool.labelKey}
            onClick={() => navigate(tool.href)}
            className="p-2 md:p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer"
          >
            <Image
              src={tool.icon}
              alt={t(tool.labelKey)}
              width={56}
              height={0}
              style={{ height: "auto" }}
              className="mx-auto mb-4"
            />
            <p className="text-[14px] md:text-[20px] font-semibold text-[#212121]">
              {t(tool.labelKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
