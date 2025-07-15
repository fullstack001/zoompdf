"use client";
import Image from "next/image";
import { X, ArrowDown } from "lucide-react";

const formats = [
  { label: "PDF", icon: "/assets/images/pdf.png" },
  { label: "PNG", icon: "/assets/images/png.png" },
  { label: "Word", icon: "/assets/images/list.png" },
  { label: "JPG", icon: "/assets/images/png.png" },
  { label: "Excel", icon: "/assets/images/excel.png" },
  { label: "PPT", icon: "/assets/images/ppt.png" },
];

interface SelectFormatModalProps {
  isVisible: boolean;
  selected: string;
  filename: string;
  onClose: () => void;
  onFormatSelect: (format: string) => void;
  onFilenameChange: (filename: string) => void;
  onDownload: () => void;
  saving: boolean;
}

export default function SelectFormatModal({
  isVisible,
  selected,
  filename,
  onClose,
  onFormatSelect,
  onFilenameChange,
  onDownload,
  saving,
}: SelectFormatModalProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={18} />
        </button>
        <h2 className="text-xl font-bold text-center mb-1">Great Job!</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Select the format to download your file.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {formats.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => onFormatSelect(label)}
              className={`flex items-center gap-2 justify-start border rounded-md px-3 py-2 text-sm ${
                selected === label
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-700"
              }`}
            >
              <div className="border border-md border-blue-500 p-2 rounded-lg">
                <Image src={icon} alt={label} width={20} height={20} />
              </div>

              <input type="radio" checked={selected === label} readOnly />

              {label}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label
            htmlFor="filename"
            className="block text-xs text-gray-500 mb-1"
          >
            File Name
          </label>
          <input
            id="filename"
            value={filename}
            onChange={(e) => onFilenameChange(e.target.value)}
            className="w-full border px-4 py-2 rounded-md text-sm"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-200 px-6 py-2 rounded-lg text-sm hover:bg-gray-300 flex items-center gap-2 font-semibold"
          >
            Cancel
            <div className="border border-md border-gray-950 p-1 rounded-md">
              <X size={10} />
            </div>
          </button>
          <button
            onClick={onDownload}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Processing..." : "Download"}
            <div className="border border-md border-white p-1 rounded-md">
              <ArrowDown size={10} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
} 