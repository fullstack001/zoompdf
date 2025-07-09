import Image from "next/image";
import { Check } from "lucide-react";

export default function PlanPreview() {
  return (
    <div className="flex-1 bg-white max-w-full md:max-w-[648px] rounded-xl shadow-md overflow-hidden">
      {/* Banner */}
      <div className="bg-[#FFE3BB] flex items-center justify-center text-xs md:text-sm py-2">
        <div className="mr-2 rounded-full bg-red-600 text-white p-1">
          <Check size={12} />
        </div>
        Your document is ready!
      </div>

      <div className="bg-[#DBE1FF] px-6 py-6 relative">
        <div className="absolute top-8 left-8 z-10 bg-red-600 text-white text-lg px-5 py-1 rounded font-bold shadow">
          PDF
        </div>
        <Image
          src="/assets/images/sample-pdf.png"
          alt="Document Preview"
          layout="responsive"
          width={100}
          height={100}
          className="mx-auto rounded-lg shadow-sm"
        />
      </div>

      {/* Review rating */}
      <div className="bg-gray-50 py-3 text-center border-t border-gray-200">
        <p className="text-sm text-gray-800 font-medium">
          <span className="font-medium">Excellent</span>{" "}
          <span className="text-green-500 text-lg">★★★★★</span>{" "}
          <span className="">based on 3,112 reviews</span>
        </p>
      </div>
    </div>
  );
}
