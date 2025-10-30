"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, UploadCloud } from "lucide-react";

const tools = [
  {
    icon: "/assets/images/pdf_converter.png",
    label: "PDF Converter",
    key: [
      "pdf_to_word",
      "pdf_to_excel",
      "pdf_to_jpg",
      "pdf_to_pptx",
      "pdf_to_png",
      "pdf_to_epub",
      "pdf_to_svg",
      "pdf_to_txt",
      "pdf_to_html",
      "pdf_to_tiff",
      "pdf_to_webp",
      "pdf_to_avif",
      "pdf_to_eps",
      "pdf_to_dxf",
      "pdf_to_azw3",
      "pdf_to_mobi",
      "pdf_to_doc",
      "word_to_pdf",
      "excel_to_pdf",
      "jpg_to_pdf",
      "pptx_to_pdf",
      "png_to_pdf",
      "epub_to_pdf",
      "mobi_to_pdf",
      "avif_to_pdf",
      "image_to_pdf",
    ],
  },
  { icon: "/assets/images/pdf_edit.png", label: "Edit PDF", key: ["edit_pdf"] },
  { icon: "/assets/images/pdf_sign.png", label: "Sign PDF", key: ["sign_pdf"] },
  { icon: "/assets/images/ocr_pdf.png", label: "OCR PDF", key: ["ocr_pdf"] },
  {
    icon: "/assets/images/pdf_merge.png",
    label: "Merge PDF",
    key: ["merge_pdf"],
  },
  {
    icon: "/assets/images/pdf_compress.png",
    label: "Compress PDF",
    key: ["compress_pdf"],
  },
  {
    icon: "/assets/images/pdf_split.png",
    label: "Split PDF",
    key: ["pdf_split"],
  },
  // { icon: "/assets/images/pure_translate.png", label: "Translate PDF" },
];

const subTools = {
  "AI Summarizer": [
    { label: "Summarize PDF", key: ["summarize_pdf"] },
    { label: "Extract Highlights", key: ["extract_highlights"] },
  ],
};

export default function FileSidebar({
  setSelectedTool,
}: {
  setSelectedTool: (tool: string[]) => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <aside
      className={`bg-white p-6 w-full lg:w-80 rounded-lg shadow-md ${
        isSidebarOpen ? "block" : "hidden lg:block"
      }`}
    >
      <button
        className="w-full bg-blue-600 text-white font-semibold py-5 px-4 rounded-2xl flex items-center justify-center gap-2 mb-6"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <UploadCloud size={18} />
        Upload File
      </button>

      <p
        className="text-[16px] font-semibold text-blue-600 mb-4 cursor-pointer"
        onClick={() => setSelectedTool([])}
      >
        All Tools
      </p>

      <ul className="space-y-3">
        {tools.map(({ icon, label, key }) => (
          <li
            onClick={() => setSelectedTool(key)}
            key={label}
            className="flex items-center gap-2 text-[16px] text-gray-700 hover:text-blue-600 cursor-pointer border-b py-4"
          >
            <Image src={icon} width={16} height={16} alt={label} /> {label}
          </li>
        ))}

        {/* Expandable: AI Summarizer */}
        <li className="text-sm text-gray-700 cursor-pointer">
          <div
            className="flex items-center justify-between border-b py-4"
            onClick={() => toggleDropdown("AI Summarizer")}
          >
            <div className="flex gap-2 items-center hover:text-blue-600">
              <Image
                src="/assets/images/pdf-summarizer.png"
                width={16}
                height={16}
                alt="AI Summarizer"
              />
              AI Summarizer
            </div>
            <ChevronDown
              size={16}
              className={
                openDropdown === "AI Summarizer"
                  ? "rotate-180 transition"
                  : "transition"
              }
            />
          </div>
          {openDropdown === "AI Summarizer" && (
            <ul className="pl-6 mt-2 space-y-1">
              {subTools["AI Summarizer"].map(({ label, key }, index) => (
                <li
                  key={index}
                  className="hover:text-blue-600 text-[16px]"
                  onClick={() => setSelectedTool(key)}
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}
