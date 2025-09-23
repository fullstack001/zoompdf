"use client";
import Image from "next/image";
import { useLocalizedNavigation } from "@/utils/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import tools from "@/data/tools";

export default function ToolsGrid() {
  const { navigate } = useLocalizedNavigation();
  const t = useTranslations();
  const [isMobile, setIsMobile] = useState(false);
  
  // Define categories
  const categories = [
    { key: "convertFromPdf", labelKey: "common.convertFromPdf", active: true },
    { key: "convertToPdf", labelKey: "common.convertToPdf", active: false },
    { key: "convertImage", labelKey: "common.convertImage", active: false },
    { key: "otherFormats", labelKey: "common.otherFormats", active: false },
  ];

  const [activeCategory, setActiveCategory] = useState("convertFromPdf");

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Filter tools based on active category and device type
  const filteredTools = tools.filter(tool => {
    const categoryMatch = tool.category === activeCategory;
    
    // If tool has device-specific properties, filter by device
    if (tool.mobileOnly !== undefined || tool.desktopOnly !== undefined) {
      if (isMobile && tool.mobileOnly) return categoryMatch;
      if (!isMobile && tool.desktopOnly) return categoryMatch;
      if (tool.mobileOnly === false && tool.desktopOnly === false) return categoryMatch;
      return false;
    }
    
    // Default behavior: show all tools if no device-specific properties
    return categoryMatch;
  });

  return (
    <section className="p-8 md:p-24 text-center">
      <h2 className="text-[28px] md:text-[40px] text-[#212121] font-medium text-center mb-8 md:mb-12">
        {t("common.chooseBestTool")}
      </h2>
      
      {/* Category Tabs */}
      <div className="bg-gray-100 rounded-2xl p-2 mb-8 md:mb-12 inline-flex flex-wrap gap-2 md:gap-0">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            className={`px-4 py-3 md:px-6 md:py-4 rounded-xl text-sm md:text-base font-medium transition-all ${
              activeCategory === category.key
                ? "bg-blue-500 text-white shadow-lg"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {category.key === "convertFromPdf" && "📄"}
                {category.key === "convertToPdf" && "📝"}
                {category.key === "convertImage" && "🖼️"}
                {category.key === "otherFormats" && "📋"}
              </span>
              {t(category.labelKey)}
            </div>
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
        {filteredTools.map((tool) => (
          <div
            key={tool.labelKey}
            onClick={() => navigate(tool.href)}
            className=" md:p-6  bg-white rounded-2xl shadow-md hover:shadow-lg px-auto lg:flex items-center cursor-pointer transition-all border border-gray-100"
          >
            <Image
              src={tool.icon}
              alt={t(tool.labelKey)}
              width={48}
              height={48}
              className="mx-auto "
            />
            <p className="text-sm md:text-base text-center font-medium text-[#212121]">
              {t(tool.labelKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
