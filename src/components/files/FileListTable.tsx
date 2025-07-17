import {
  Eye,
  Pencil,
  Download,
  ArrowUpDown,
  MoreVertical,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

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
  const t = useTranslations();

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

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
      <div className="flex items-center justify-between p-4 border-b">
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
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left">
              <input type="checkbox" />
            </th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">File Size</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.map((file, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <input type="checkbox" />
              </td>
              <td className="flex items-center gap-2 p-4">
                <Image
                  src={
                    fileImage(file.action) || "/assets/images/pdf-example.png"
                  }
                  alt="File Icon"
                  width={20}
                  height={0}
                  style={{ height: "auto" }}
                />
                {file.name.replace(/_\d+/, "")}
              </td>
              <td>{file.uploadTime.split("T")[0]}</td>
              <td>{file.size}</td>
              <td className="flex justify-end gap-2 p-4">
                <button className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1 text-sm">
                  <Download size={14} /> Download
                </button>
                <button className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1 text-sm">
                  <Pencil size={14} /> Edit
                </button>
                <button className="bg-gray-100 p-2 rounded">
                  <Eye size={14} />
                </button>
                <button className="bg-gray-100 p-2 rounded">
                  <ArrowUpDown size={14} />
                </button>
                <button className="bg-gray-100 p-2 rounded">
                  <MoreVertical size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-white rounded-xl p-6  shadow mt-6">
        <div className="border-[#757575] border-[1px] border-dashed flex justify-between items-center p-6 rounded-xl ">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Experience the best of PDF Guru — go premium!
            </h3>
            <Link href="/plan">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg mt-2 font-semibold text-sm">
                Upgrade Plan
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
