"use client";
import { useRouter } from "next/navigation";

const footerLinks = [
  {
    title: "Edit PDF",
    links: ["Edit PDF", "Sign PDF", "Split PDF", "Image to Text"],
  },
  {
    title: "Convert from PDF",
    links: [
      "PDF to Word",
      "PDF to Excel",
      "PDF to Pptx",
      "PDF to PNG",
      "PDF to JPG",
      "PDF to Epub",
    ],
  },
  {
    title: "Convert to PDF",
    links: [
      "Word to PDF",
      "Excel to PDF",
      "Pptx to PDF",
      "PNG to PDF",
      "JPG to PDF",
      "Epub to PDF",
    ],
  },
  {
    title: "Forms",
    links: ["Sign PDF", "Fill PDF Form", "Create PDF Form"],
  },
];

export default function Footer() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <footer className="bg-gray-50 text-gray-800 px-6 md:px-12 lg:px-24 pb-6 text-sm">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-left mb-10">
          {footerLinks.map((section, i) => (
            <div key={i} className="pt-4 md:pt-8 px-4 md:px-6 lg:px-12">
              <h4 className="text-[16px] md:text-[20px] font-medium pb-2 md:pb-4 text-gray-700">
                {section.title}
              </h4>
              <ul className="space-y-1 mb-4">
                {section.links.map((link, j) => (
                  <li
                    key={j}
                    className="text-gray-600 text-[14px] md:text-[16px] pb-2 md:pb-4 hover:text-blue-600 cursor-pointer"
                    onClick={() =>
                      handleNavigation(
                        `/${link.toLowerCase().replace(/\s+/g, "-")}`
                      )
                    }
                  >
                    {link}
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
              onClick={() => handleNavigation("/disclaimer")}
            >
              Disclaimer
            </span>
            <span
              className="hover:underline text-[12px] md:text-[14px] cursor-pointer"
              onClick={() => handleNavigation("/privacy-policy")}
            >
              Privacy Policy
            </span>
            <span
              className="hover:underline text-[12px] md:text-[14px] cursor-pointer"
              onClick={() => handleNavigation("/sitemap")}
            >
              Sitemap
            </span>
          </div>
          <div className="text-[12px] md:text-[14px]">
            &copy; 2025 PDFDEN All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
