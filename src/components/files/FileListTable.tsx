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
import { downloadFile, deletePdfByFileName } from "@/utils/apiUtils";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function FileListTable({
  files,
  onFileDeleted,
}: {
  files: Array<{
    name: string;
    uploadTime: string;
    size: string;
    action: string;
  }>;
  onFileDeleted?: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);
  const [deletingFile, setDeletingFile] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const t = useTranslations();

  const user = useSelector((state: RootState) => state.user);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutside = Object.values(dropdownRefs.current).every(
        (ref) => ref && !ref.contains(target)
      );

      // Also check if clicking on the button itself
      const isDropdownButton = (target as HTMLElement).closest(
        'button[aria-label="More actions"]'
      );

      if (isOutside && !isDropdownButton) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [openDropdown]);

  const fileImage = (action: string) => {
    // Normalize action for safety
    const a = (action || "").toLowerCase();

    // Conversions FROM PDF
    if (a === "pdf_to_word" || a === "pdf_to_doc")
      return "/assets/images/doc-example.png";
    if (a === "pdf_to_pptx") return "/assets/images/pptx-example.png";
    if (a === "pdf_to_excel") return "/assets/images/excel-example.png";
    if (a === "pdf_to_epub") return "/assets/images/epub-example.png";
    if (a === "pdf_to_jpg") return "/assets/images/jpg-example.jpg";
    if (a === "pdf_to_png") return "/assets/images/png-example.jpg";
    if (a === "pdf_to_svg") return "/assets/icnos/pdf_svg.svg";
    if (a === "pdf_to_txt") return "/assets/icnos/pdf_txt.svg";
    if (a === "pdf_to_html") return "/assets/icnos/pdf_html.svg";
    if (a === "pdf_to_tiff") return "/assets/icnos/pdf_tiff.svg";
    if (a === "pdf_to_webp") return "/assets/icnos/pdf_webp.svg";
    if (a === "pdf_to_avif") return "/assets/icnos/pdf_Avif.svg";
    if (a === "pdf_to_eps") return "/assets/icnos/pdf_eps.svg";
    if (a === "pdf_to_dxf") return "/assets/icnos/pdf_dxf.svg";
    if (a === "pdf_to_azw3") return "/assets/icnos/pdf_azw3.svg";
    if (a === "pdf_to_mobi") return "/assets/icnos/pdf_mobi.svg";
    if (a === "pdf_to_jpg") return "/assets/icnos/pdf_jpg.svg";
    if (a === "pdf_to_png") return "/assets/icnos/pdf_png.svg";

    // Conversions TO PDF
    if (a === "word_to_pdf" || a === "doc_to_pdf")
      return "/assets/images/word-pdf.png";
    if (a === "excel_to_pdf") return "/assets/images/excel-pdf.png";
    if (a === "pptx_to_pdf") return "/assets/images/ppt.png";
    if (a === "png_to_pdf") return "/assets/images/png.png";
    if (a === "jpg_to_pdf") return "/assets/icnos/image_pdf.svg";
    if (a === "epub_to_pdf") return "/assets/images/epub-pdf.png";
    if (a === "mobi_to_pdf") return "/assets/icnos/mobi_epub.svg";
    if (a === "avif_to_pdf") return "/assets/icnos/avif_png.svg";

    // Tool actions
    if (a === "compress_pdf") return "/assets/images/pdf_compress.png";
    if (a === "merge_pdf") return "/assets/images/pdf_merge.png";
    if (a === "split_pdf") return "/assets/images/pdf_split.png";
    if (a === "edit_pdf") return "/assets/images/pdf_edit.png";
    if (a === "sign_pdf") return "/assets/images/pdf_sign.png";
    if (a === "pdf_ocr") return "/assets/images/ocr_pdf.png";
    if (a === "pdf_to_image") return "/assets/icnos/pdf_image.svg";
    if (a === "image_to_pdf") return "/assets/icnos/image_pdf.svg";

    // Fallback generic PDF
    return "/assets/images/pdf.png";
  };

  const handleDownload = async (file: any) => {
    if (!token || !user.id) {
      alert("Please log in to download files");
      setOpenDropdown(null);
      return;
    }

    try {
      setDownloadingFile(file.name);
      setOpenDropdown(null);
      await downloadFile(file.name, file.action, token, user.id);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file. Please try again.");
    } finally {
      setDownloadingFile(null);
    }
  };

  const handleView = async (file: any) => {
    // Open file in new tab for viewing
    if (!token || !user.id) {
      alert("Please log in to view files");
      setOpenDropdown(null);
      return;
    }

    try {
      setOpenDropdown(null);
      const viewUrl = `https://api.pdfezy.com/api/pdf/download`;
      const response = await fetch(viewUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fileName: file.name,
          action: file.action,
          user: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error viewing file:", error);
      alert("Failed to view file. Please try again.");
    }
  };

  const handleDelete = async (file: any) => {
    if (!confirm("Are you sure you want to delete this file?")) {
      setOpenDropdown(null);
      return;
    }

    try {
      setDeletingFile(file.name);
      setOpenDropdown(null);
      await deletePdfByFileName(file.name);
      // Refresh the file list by calling the callback
      if (onFileDeleted) {
        onFileDeleted();
      } else {
        // Fallback: reload the page if no callback provided
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file. Please try again.");
    } finally {
      setDeletingFile(null);
    }
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredFiles.length / ITEMS_PER_PAGE)
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedFiles = filteredFiles.slice(startIndex, endIndex);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
        {paginatedFiles.map((file, idx) => (
          <div
            key={startIndex + idx}
            className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors duration-150 items-center"
          >
            <div className="col-span-5 flex items-center gap-3">
              <div className="flex-shrink-0">
                <Image
                  src={fileImage(file.action)}
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
                ref={(el) => {
                  dropdownRefs.current[idx] = el;
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(idx);
                  }}
                  className="p-2 rounded hover:bg-gray-100 transition-colors duration-200"
                  aria-label="More actions"
                  disabled={
                    deletingFile === file.name || downloadingFile === file.name
                  }
                >
                  {deletingFile === file.name ||
                  downloadingFile === file.name ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <MoreVertical size={18} />
                  )}
                </button>

                {openDropdown === idx && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(file);
                      }}
                      disabled={
                        downloadingFile === file.name ||
                        deletingFile === file.name
                      }
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(file);
                      }}
                      disabled={
                        downloadingFile === file.name ||
                        deletingFile === file.name
                      }
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {downloadingFile === file.name ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download size={16} />
                          Download
                        </>
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(file);
                      }}
                      disabled={
                        downloadingFile === file.name ||
                        deletingFile === file.name
                      }
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingFile === file.name ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 size={16} />
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {/* {totalPages > 1 && ( */}
      <div className="flex items-center justify-center gap-2 p-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 text-sm rounded border ${
              currentPage === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-black border-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      {/* )} */}

      {/* <div className="bg-white rounded-xl p-6  shadow mt-6">
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
      </div> */}
    </div>
  );
}
