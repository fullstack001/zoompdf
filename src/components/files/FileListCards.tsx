import Image from "next/image";
import Link from "next/link";
import { Eye, Pencil, Download, ArrowUpDown, MoreVertical } from "lucide-react";

export default function FileListCards({
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
        <h2 className="text-lg font-semibold md:text-[32px]">My Files</h2>
        <input
          placeholder="Search Files"
          className="border rounded-md px-3 py-1 w-72"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 p-4 ">
        <div className="bg-gray-50 text-left rounded-xl shadow p-4 flex flex-col justify-between md:flex-row gap-4">
          <div className="text-left ">Name</div>
          <div className="text-left ">Date</div>
          <div className="text-left ">File Size</div>
          <div className="text-left ">Action</div>
        </div>

        {files.map((file, idx) => (
          <div
            key={idx}
            className="bg-gray-50 text-left rounded-xl shadow p-4 flex flex-col justify-between md:flex-row gap-4"
          >
            <div className="flex items-center gap-2 w-32">
              <Image
                src={fileImage(file.action) || "/assets/images/pdf-example.png"}
                alt="File Icon"
                width={40}
                height={40}
              />
              <div>
                <h3 className="text-base font-semibold">
                  {file.name.replace(/_\d+/, "")}
                </h3>
              </div>
            </div>
            <div className="text-lg font-semibold">
              {file.uploadTime.split("T")[0]}
            </div>
            <p className="text-sm text-gray-700"> {file.size}</p>
            <div className="flex justify-end gap-2">
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
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-6 shadow mt-6">
        <div className="border-[#757575] border-[1px] border-dashed flex justify-between items-center p-6 rounded-xl">
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
