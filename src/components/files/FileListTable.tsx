import {
  Eye,
  Pencil,
  Download,
  ArrowUpDown,
  MoreVertical,
  Search,
  Trash2,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";

export default function FileListTable({
  files,
}: {
  files: Array<{
    name: string;
    uploadTime: string;
    size: string;
    action: string;
  }>;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fileImage = (action: string) => {
    if (action === "pdf_to_pptx") {
      return "/assets/images/pptx-example.png";
    }
    if (action === "pdf_to_word") {
      return "/assets/images/doc-example.png";
    }
    if (action === "pdf_to_excel") {
      return "/assets/images/excel-example.png";
    }
    if (action === "pdf_to_epub") {
      return "/assets/images/epub-example.png";
    }
    if (action === "pdf_to_jpg") {
      return "/assets/images/jpg-example.jpg";
    }
    if (action === "pdf_to_png") {
      return "/assets/images/png-example.jpg";
    }
  };

  const handleDownload = (file: any) => {
    // Add your download logic here
    console.log("Downloading file:", file.name);
    setOpenDropdown(null);
  };

  const handleView = (file: any) => {
    // Add your view logic here
    console.log("Viewing file:", file.name);
    setOpenDropdown(null);
  };

  const handleDelete = (file: any) => {
    // Add your delete logic here
    console.log("Deleting file:", file.name);
    setOpenDropdown(null);
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
      <div className="flex items-center justify-between p-4 ">
        <h2 className="text-lg font-semibold md:text-[32px]">My Files</h2>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search Files"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md pl-10 pr-3 py-1 w-72"
          />
        </div>
      </div>

      {/* Header */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
        <div className="col-span-5">Name</div>
        <div className="col-span-2">Size</div>
        <div className="col-span-3">Date</div>
        <div className="col-span-1 text-right">Actions</div>
      </div>

      {/* File List */}
      <div className="divide-y divide-gray-100">
        {filteredFiles.map((file, idx) => (
          <div
            key={idx}
            className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors duration-150 items-center"
          >
            <div className="col-span-5 flex items-center gap-3">
              <div className="flex-shrink-0">
                <Image
                  src={
                    fileImage(file.action) || "/assets/images/pdf-example.png"
                  }
                  alt="File Icon"
                  width={40}
                  height={40}
                  className="rounded"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name.replace(/_\d+/, "")}
                </p>
              </div>
            </div>

            <div className="col-span-2">
              <p className="text-sm text-gray-500">{file.size}</p>
            </div>

            <div className="col-span-3">
              <p className="text-sm text-gray-500">
                {file.uploadTime.split("T")[0]}
              </p>
            </div>

            <div className="col-span-1 flex justify-end">
              <div
                className="relative"
                ref={openDropdown === idx ? dropdownRef : null}
              >
                <button
                  onClick={() => toggleDropdown(idx)}
                  className="p-2 rounded hover:bg-gray-100 transition-colors duration-200"
                  aria-label="More actions"
                >
                  <MoreVertical size={18} />
                </button>

                {openDropdown === idx && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                    <button
                      onClick={() => handleView(file)}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(file)}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <Download size={16} />
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(file)}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6  shadow mt-6">
        <div className="border-[#757575] border-[1px] border-dashed flex justify-between items-center p-6 rounded-xl ">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Experience the best of PDF Guru — go premium!
            </h3>
            <Link href="/plan" onClick={() => setIsUpgrading(true)}>
              <button
                disabled={isUpgrading}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg mt-2 font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isUpgrading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={16} />
                    Loading...
                  </>
                ) : (
                  "Upgrade Plan"
                )}
              </button>
            </Link>
          </div>
          <Image
            src="/assets/images/feature-cta.png"
            width={160}
            height={160}
            alt="Upgrade"
          />
        </div>
      </div>
    </div>
  );
}
