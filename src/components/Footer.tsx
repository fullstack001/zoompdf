"use client";
import { useTranslations } from "next-intl";
import { useLocalizedNavigation } from "@/utils/navigation";

export default function Footer() {
  const t = useTranslations();
  const { navigate } = useLocalizedNavigation();

  const footerLinks = [
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

  return (
    <footer className="bg-gray-50 text-gray-800 px-6 md:px-12 lg:px-24 pb-6 text-sm">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-4 gap-4 md:gap-6 text-left mb-10">
          {footerLinks.map((section, i) => (
            <div key={i} className="pt-4 md:pt-8 px-2 md:px-4 lg:px-6">
              <h4 className="text-[16px] md:text-[20px] font-medium pb-2 md:pb-4 text-gray-700">
                {t(section.titleKey)}
              </h4>
              <ul className="space-y-1 mb-4">
                {section.links.map((link, j) => (
                  <li
                    key={j}
                    className="text-gray-600 text-[14px] md:text-[16px] pb-2 md:pb-4 hover:text-blue-600 cursor-pointer"
                    onClick={() => navigate(link.route)}
                  >
                    {t(link.labelKey)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-t border-blue-100 mb-4" />

        <div className="text-center text-gray-500">
          <div className="space-x-2 md:space-x-4 mb-2">
            <span
              className="hover:underline text-[12px] md:text-[14px] cursor-pointer"
              onClick={() => navigate("/disclaimer")}
            >
              {t("footer.disclaimer")}
            </span>
            <span
              className="hover:underline text-[12px] md:text-[14px] cursor-pointer"
              onClick={() => navigate("/privacy-policy")}
            >
              {t("footer.privacyPolicy")}
            </span>
            <span
              className="hover:underline text-[12px] md:text-[14px] cursor-pointer"
              onClick={() => navigate("/sitemap")}
            >
              {t("footer.sitemap")}
            </span>
          </div>
          <div className="text-[12px] md:text-[14px]">
            {t("footer.allRightsReserved")}
          </div>
        </div>
      </div>
    </footer>
  );
}
