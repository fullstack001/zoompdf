"use client";
import Image from "next/image";
import { useLocalizedNavigation } from "@/utils/navigation";

const tools = [
  {
    icon: "/assets/images/pdf_converter.png",
    label: "PDF Converter",
  },
  { icon: "/assets/images/pdf_edit.png", label: "Edit PDF" },
  { icon: "/assets/images/pdf_sign.png", label: "Sign PDF" },
  { icon: "/assets/images/ocr_pdf.png", label: "OCR PDF" },
  {
    icon: "/assets/images/pdf_merge.png",
    label: "Merge PDF",
  },
  {
    icon: "/assets/images/pdf_compress.png",
    label: "Compress PDF",
  },
  {
    icon: "/assets/images/pdf_split.png",
    label: "Split PDF",
  },
];

export default function FileSidebar() {
  const { navigate } = useLocalizedNavigation();

  return (
    <aside className="bg-white p-6 w-full lg:w-80 rounded-lg shadow-md">
      <p
        className="text-[16px] font-semibold text-blue-600 mb-4 cursor-pointer"
        onClick={() => navigate("/#tools-grid-section")}
      >
        All Tools
      </p>

      <ul className="space-y-3">
        {tools.map(({ icon, label }) => (
          <li
            onClick={() => navigate("/#tools-grid-section")}
            key={label}
            className="flex items-center gap-2 text-[16px] text-gray-700 hover:text-blue-600 cursor-pointer border-b py-4"
          >
            <Image src={icon} width={16} height={16} alt={label} /> {label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
