"use client";
import React from "react";

export type CompressionLevel = 300 | 200 | 100;

interface CompressionLevelModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCompress: (level: CompressionLevel) => void;
  fileName: string;
  fileSize: string;
}

const compressionOptions = [
  {
    level: 300 as CompressionLevel,
    title: "HIGH",
    description: "Standard quality, smaller size",
    sizeReduction: "~40% smaller",
  },
  {
    level: 200 as CompressionLevel,
    title: "BASIC",
    description: "Better quality, medium size",
    sizeReduction: "~20% smaller",
  },
  {
    level: 100 as CompressionLevel,
    title: "LOW",
    description: "Highest quality, larger size",
    sizeReduction: "~10% smaller",
  },
];

export default function CompressionLevelModal({
  isVisible,
  onClose,
  onCompress,
  fileName,
  fileSize,
}: CompressionLevelModalProps) {
  const [selectedLevel, setSelectedLevel] = React.useState<CompressionLevel>(200);

  if (!isVisible) return null;

  const handleCompress = () => {
    onCompress(selectedLevel);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Compress file</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light"
          >
            ×
          </button>
        </div>

        {/* File Info */}
        <div className="flex items-center mb-6 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-10 bg-red-500 rounded mr-3 flex-shrink-0"></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{fileName}</p>
            <p className="text-sm text-gray-500">{fileSize}</p>
          </div>
        </div>

        {/* Compression Level Selection */}
        <div className="mb-6">
          <p className="text-sm text-gray-700 mb-4">Select a compression level to continue:</p>
          
          <div className="space-y-3">
            {compressionOptions.map((option) => (
              <div
                key={option.level}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedLevel === option.level
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedLevel(option.level)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedLevel === option.level
                            ? "border-purple-500 bg-purple-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedLevel === option.level && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{option.title}</h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {option.sizeReduction}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compress Button */}
        <button
          onClick={handleCompress}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          COMPRESS FILE
        </button>
      </div>
    </div>
  );
} 