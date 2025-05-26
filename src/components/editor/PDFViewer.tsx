'use client';
import Image from 'next/image';

export default function PDFViewer() {
  return (
    <div className="flex-1 overflow-auto flex justify-center items-start bg-white py-6">
      <iframe
        src="/assets/pdfs/sample.pdf"
        
        height="1000"
        className=" w-full shadow-xl border"
        title="PDF Viewer"
      ></iframe>
    </div>
  );
}