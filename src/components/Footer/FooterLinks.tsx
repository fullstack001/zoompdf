"use client";
import { useTranslations } from "next-intl";
import { useLocalizedNavigation } from "@/utils/navigation";
import { useState, useEffect } from "react";

// Define footer links structure
const footerLinksData = [
  {
    titleKey: "footer.editPdf",
    links: [
      { labelKey: "tools.editPdf", route: "/edit-pdf" },
      { labelKey: "tools.signPdf", route: "/sign-pdf" },
      { labelKey: "tools.splitPdf", route: "/split-pdf" },
      { labelKey: "tools.imageToText", route: "/image-to-text" },
    ],
  },
  {
    titleKey: "footer.convertFromPdf",
    links: [
      { labelKey: "tools.pdfToWord", route: "/pdf-to-word" },
      { labelKey: "tools.pdfToExcel", route: "/pdf-to-excel" },
      { labelKey: "tools.pdfToPptx", route: "/pdf-to-pptx" },
      { labelKey: "tools.pdfToPng", route: "/pdf-to-png" },
      { labelKey: "tools.pdfToJpg", route: "/pdf-to-jpg" },
      { labelKey: "tools.pdfToEpub", route: "/pdf-to-epub" },
    ],
  },
  {
    titleKey: "footer.convertToPdf",
    links: [
      { labelKey: "tools.wordToPdf", route: "/word-to-pdf" },
      { labelKey: "tools.excelToPdf", route: "/excel-to-pdf" },
      { labelKey: "tools.pptxToPdf", route: "/pptx-to-pdf" },
      { labelKey: "tools.pngToPdf", route: "/png-to-pdf" },
      { labelKey: "tools.jpgToPdf", route: "/jpg-to-pdf" },
      { labelKey: "tools.epubToPdf", route: "/epub-to-pdf" },
    ],
  },
  {
    titleKey: "footer.forms",
    links: [
      { labelKey: "tools.signPdf", route: "/sign-pdf" },
      { labelKey: "footer.fillPdfForm", route: "/fill-pdf-form" },
      { labelKey: "footer.createPdfForm", route: "/create-pdf-form" },
    ],
  },
];

export default function FooterLinks() {
  const t = useTranslations();
  const { navigate } = useLocalizedNavigation();

  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>(
    () => {
      // Initialize all sections as closed for consistent SSR/client hydration
      const defaultState: { [key: number]: boolean } = {};
      footerLinksData.forEach((_, index) => {
        defaultState[index] = false;
      });
      return defaultState;
    }
  );

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Handle responsive initialization after hydration
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      const newState: { [key: number]: boolean } = {};
      footerLinksData.forEach((_, index) => {
        newState[index] = isDesktop;
      });
      setOpenSections(newState);
    };

    // Set initial state after hydration
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="lg:col-span-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
        {footerLinksData.map((section, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg overflow-hidden lg:border-none lg:rounded-none lg:overflow-visible"
          >
            <button
              onClick={() => toggleSection(i)}
              className="w-full flex items-center justify-between p-4 lg:p-0 lg:pb-2 bg-white hover:bg-gray-50 lg:hover:bg-transparent lg:cursor-pointer transition-colors duration-200"
            >
              <h4 className="text-lg font-semibold text-gray-900 text-left lg:border-b lg:border-gray-200 lg:w-full lg:pb-2">
                {t(section.titleKey)}
              </h4>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 lg:hidden ${
                  openSections[i] ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out lg:transition-none lg:opacity-100 lg:max-h-none lg:overflow-visible ${
                openSections[i]
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden lg:opacity-100 lg:max-h-none lg:overflow-visible"
              }`}
            >
              <div className="p-4 pt-0 bg-gray-50 lg:p-0 lg:pt-4 lg:bg-transparent">
                <ul className="space-y-3 lg:space-y-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <button
                        className="text-gray-600 hover:text-blue-600 text-sm leading-relaxed transition-colors duration-200 text-left w-full py-2 px-2 rounded hover:bg-white lg:py-0 lg:px-0 lg:rounded-none lg:hover:bg-transparent"
                        onClick={() => navigate(link.route)}
                      >
                        {t(link.labelKey)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
