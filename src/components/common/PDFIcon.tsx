"use client";
import React from "react";

interface PDFIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function PDFIcon({
  width = 60,
  height = 60,
  className = "",
}: PDFIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      fill="none"
      className={className}
    >
      <rect
        x="10"
        y="5"
        width="40"
        height="50"
        rx="4"
        fill="#f3f4f6"
        stroke="#d1d5db"
      />
      <rect x="15" y="15" width="30" height="4" fill="#ef4444" />
      <text
        x="30"
        y="27"
        textAnchor="middle"
        fontSize="8"
        fill="white"
        fontWeight="bold"
      >
        PDF
      </text>
      <rect x="15" y="30" width="20" height="2" fill="#d1d5db" />
      <rect x="15" y="35" width="25" height="2" fill="#d1d5db" />
      <rect x="15" y="40" width="15" height="2" fill="#d1d5db" />
    </svg>
  );
}
