"use client";
import React from "react";
import { useTranslations } from "next-intl";

export type CompressionLevel = 100 | 200 | 300;

interface CompressionLevelModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCompress: (level: CompressionLevel) => void;
  fileName: string;
  fileSize: string;
}

export default function CompressionLevelModal({
  isVisible,
  onClose,
  onCompress,
  fileName,
  fileSize,
}: CompressionLevelModalProps) {
  const [selectedLevel, setSelectedLevel] =
    React.useState<CompressionLevel>(200);
  const t = useTranslations();

  const compressionOptions = [
    {
      level: 300 as CompressionLevel,
      titleKey: "compression.high",
      descriptionKey: "compression.highDesc",
      sizeReductionKey: "compression.highReduction",
    },
    {
      level: 200 as CompressionLevel,
      titleKey: "compression.basic",
      descriptionKey: "compression.basicDesc",
      sizeReductionKey: "compression.basicReduction",
    },
    {
      level: 100 as CompressionLevel,
      titleKey: "compression.low",
      descriptionKey: "compression.lowDesc",
      sizeReductionKey: "compression.lowReduction",
    },
  ];

  if (!isVisible) return null;

  const handleCompress = () => {
    onCompress(selectedLevel);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {t("compression.compressFile")}
          </h2>
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
            <p className="text-sm font-medium text-gray-900 truncate">
              {fileName}
            </p>
            <p className="text-sm text-gray-500">{fileSize}</p>
          </div>
        </div>

        {/* Compression Level Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("compression.compressionLevel")}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {t("compression.selectLevel")}
          </p>
          <div className="space-y-3">
            {compressionOptions.map((option) => (
              <label
                key={option.level}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedLevel === option.level
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="compression"
                  value={option.level}
                  checked={selectedLevel === option.level}
                  onChange={() => setSelectedLevel(option.level)}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-900">
                      {t(option.titleKey)}
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      {t(option.sizeReductionKey)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {t(option.descriptionKey)}
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 ml-3 ${
                    selectedLevel === option.level
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedLevel === option.level && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={handleCompress}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {t("compression.compress")}
          </button>
        </div>
      </div>
    </div>
  );
} 