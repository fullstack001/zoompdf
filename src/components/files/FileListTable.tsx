import { Eye, Pencil, Download, ArrowUpDown, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">My Files</h2>
        <input
          placeholder="Search Files"
          className="border rounded-md px-3 py-1 w-72"
        />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="p-4">
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Date</th>
            <th>File Size</th>
            <th className="text-right p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, idx) => (
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
                  height={20}
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
