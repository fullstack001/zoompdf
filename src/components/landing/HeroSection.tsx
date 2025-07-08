"use client";
import { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Simulate upload progress
    let loaded = 0;
    const interval = setInterval(() => {
      loaded += 10;
      setProgress(loaded);
      if (loaded >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          router.push('/editor');
        }, 500);
      }
    }, 150);
  };

  return (
    <section className="bg-blue-50 text-center py-16 px-4">
      <h1 className="text-4xl font-bold mb-4">Online PDF to Word Converter</h1>
      <p className="mb-6">Change file formats in seconds</p>
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-3xl mx-auto">
        <div className="bg-white border-dashed border-2 border-gray-300 rounded-lg p-12 max-w-3xl mx-auto">
          <label className="cursor-pointer bg-primary-900 text-white rounded-full px-4 py-2 text-xl shadow-lg">
            +
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <p className="mt-2">Drag & drop your file here</p>
          <p className="text-sm text-gray-500 mt-2">Size up to 100MB</p>
        </div>
      </div>

      <div className="mt-8 flex justify-center flex-wrap gap-6">
        <FeatureItem
          icon="/assets/images/activity.png"
          text="Comprehensive Suite"
          description="Comprehensive suite of PDF management tools"
        />
        <FeatureItem
          icon="/assets/images/shield-done.png"
          text="Simple and safe"
          description="Simple and safe for use across all devices"
        />
        <FeatureItem
          icon="/assets/images/graph.png"
          text="Unlimited documents"
          description="No limits on the number of documents you can work with."
        />
      </div>
      {uploading && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50 rounded-lg">
          <h2 className="text-lg font-bold mb-2">File Uploading</h2>
          <p className="text-xs text-gray-500 mb-2">{progress} MB / 100 MB</p>
          <div className="w-64 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </section>
  );
}

function FeatureItem({
  icon,
  text,
  description,
}: {
  icon: string;
  text: string;
  description: string;
}) {
  return (
    <div className="flex items-center space-x-2 gap-3">
      <Image
        src={icon}
        alt={text}
        width={25}
        height={25}
        className="mx-auto mb-2"
      />
      <div className="text-left">
        <div className="text-gray-700 text-xl font-bold">{text}</div>
        <div>{description}</div>
      </div>
    </div>
  );
}
