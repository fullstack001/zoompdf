'use client';
import Image from 'next/image';

export default function Sidebar() {
  return (
    <div className="w-32 bg-gray-50 border-r overflow-y-auto p-2 space-y-2">
      {[1, 2, 3].map((page, i) => (
        <div
          key={i}
          className="border-2 border-blue-600 rounded-sm overflow-hidden cursor-pointer"
        >
          <Image
            src="/assets/images/proicons_pdf-2.png"
            alt={`Page ${page}`}
            width={80}
            height={100}
            className="mx-auto"
          />
          <div className="text-center text-xs py-1">{page}</div>
        </div>
      ))}
    </div>
  );
}