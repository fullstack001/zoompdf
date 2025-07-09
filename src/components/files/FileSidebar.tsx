"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, UploadCloud } from "lucide-react";

const tools = [
  { icon: "/assets/images/pdf_converter.png", label: "PDF Converter" },
  { icon: "/assets/images/pdf_edit.png", label: "Edit PDF" },
  { icon: "/assets/images/pdf_sign.png", label: "Sign PDF" },
  { icon: "/assets/images/ocr_pdf.png", label: "OCR PDF" },
  { icon: "/assets/images/pdf_merge.png", label: "Merge PDF" },
  { icon: "/assets/images/pdf_compress.png", label: "Compress PDF" },
  { icon: "/assets/images/pdf_split.png", label: "Split PDF" },
  { icon: "/assets/images/pure_translate.png", label: "Translate PDF" },
];

const subTools = {
  Forms: [
    { label: "Fill PDF" },
    { label: "Create Form" },
    { label: "Edit Form" },
  ],
  "AI Summarizer": [
    { label: "Summarize PDF" },
    { label: "Extract Highlights" },
  ],
};

export default function FileSidebar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <aside
      className={`bg-white p-6 w-80 rounded-lg shadow-md ${
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

      <p className="text-[16px] font-semibold text-blue-600 mb-4">All Tools</p>

      <ul className="space-y-3">
        {tools.map(({ icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-2 text-[16px] text-gray-700 hover:text-blue-600 cursor-pointer border-b py-4"
          >
            <Image src={icon} width={16} height={16} alt={label} /> {label}
          </li>
        ))}

        {/* Expandable: Forms */}
        <li className="text-sm text-gray-700 cursor-pointer">
          <div
            className="flex items-center justify-between border-b py-4"
            onClick={() => toggleDropdown("Forms")}
          >
            <div className="flex gap-2 items-center hover:text-blue-600">
              <Image
                src="/assets/images/pdf_forms.png"
                width={16}
                height={16}
                alt="Forms"
              />
              Forms
            </div>
            <ChevronDown
              size={16}
              className={
                openDropdown === "Forms"
                  ? "rotate-180 transition"
                  : "transition"
              }
            />
          </div>
          {openDropdown === "Forms" && (
            <ul className="pl-6 mt-2 space-y-1">
              {subTools["Forms"].map(({ label }) => (
                <li key={label} className="hover:text-blue-600">
                  {label}
                </li>
              ))}
            </ul>
          )}
        </li>

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
              {subTools["AI Summarizer"].map(({ label }) => (
                <li key={label} className="hover:text-blue-600 text-[16px]">
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
