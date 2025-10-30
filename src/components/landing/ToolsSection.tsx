"use client";
import { useTranslations } from "next-intl";
import { useLocalizedNavigation } from "@/utils/navigation";

export default function ToolsSection() {
  const t = useTranslations();
  const { navigate } = useLocalizedNavigation();

  const toolsData = [
    {
      titleKey: "tools.editPdf",
      tools: [
        { nameKey: "tools.editPdf", href: "/edit-pdf" },
        { nameKey: "tools.addWatermark", href: "/add-watermark" },
      ],
    },
    {
      titleKey: "toolsSection.splitAndMerge",
      tools: [
        { nameKey: "tools.splitPdf", href: "/split-pdf" },
        { nameKey: "tools.mergePdf", href: "/merge-pdf" },
      ],
    },
    {
      titleKey: "common.convertFromPdf",
      tools: [
        { nameKey: "tools.pdfToWord", href: "/pdf-to-word" },
        { nameKey: "tools.pdfToPptx", href: "/pdf-to-pptx" },
        { nameKey: "tools.pdfToExcel", href: "/pdf-to-excel" },
        { nameKey: "tools.pdfToJpg", href: "/pdf-to-jpg" },
        { nameKey: "tools.pdfToPng", href: "/pdf-to-png" },
      ],
    },
    {
      titleKey: "common.convertToPdf",
      tools: [
        { nameKey: "tools.wordToPdf", href: "/word-to-pdf" },
        { nameKey: "tools.pptxToPdf", href: "/pptx-to-pdf" },
        { nameKey: "tools.excelToPdf", href: "/excel-to-pdf" },
        { nameKey: "tools.jpgToPdf", href: "/jpg-to-pdf" },
        { nameKey: "tools.pngToPdf", href: "/png-to-pdf" },
      ],
    },
  ];

  return (
    <section className="py-12 px-6 md:px-12 lg:px-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t("toolsSection.allPdfTools")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("toolsSection.subtitle")}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {toolsData.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm  p-6 hover:shadow-md transition-shadow duration-200"
            >
              {/* Category Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {t(category.titleKey)}
              </h3>

              {/* Tools List */}
              <ul className="space-y-3">
                {category.tools.map((tool, toolIndex) => (
                  <li key={toolIndex}>
                    <button
                      onClick={() => navigate(tool.href)}
                      className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors duration-200 block hover:bg-gray-50 -mx-2 px-2 py-1 rounded w-full text-left"
                    >
                      {t(tool.nameKey)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">{t("toolsSection.ctaText")}</p>
          <button
            onClick={() => navigate("/tools")}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {t("toolsSection.viewAllTools")}
          </button>
        </div>
      </div>
    </section>
  );
}
