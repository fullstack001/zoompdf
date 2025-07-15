"use client";
import Image from "next/image";

interface ProgressModalProps {
  isVisible: boolean;
  progress: number;
}

export default function ProgressModal({ isVisible, progress }: ProgressModalProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl w-full max-w-md p-8 text-center shadow-xl">
        <h3 className="text-xl font-bold mb-6">
          We are processing your file
        </h3>
        <Image
          src="/assets/images/processing.png"
          alt="Processing"
          width={160}
          height={160}
          className="mx-auto mb-4"
        />
        <div className="text-gray-700 font-semibold mb-2">{progress}%</div>
        <div className="w-full h-2 rounded-full bg-gray-200">
          <div
            className="h-2 bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
} 