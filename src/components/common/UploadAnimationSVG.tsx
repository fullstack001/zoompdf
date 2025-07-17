"use client";
import React, { useId } from "react";

interface UploadAnimationSVGProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function UploadAnimationSVG({
  className = "inline-block h-full align-top fill-current",
  width = 154,
  height = 105,
}: UploadAnimationSVGProps) {
  // Generate stable unique IDs to avoid conflicts and hydration mismatches
  const uniqueId = useId();

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 154 105"
    >
      <g clipPath={`url(#a-${uniqueId})`}>
        <circle
          cx="20"
          cy="57"
          fill="#FFC5A8"
          r="14"
          className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-5"
        />
        <circle
          cx="122"
          cy="25"
          fill="#ABB3F6"
          r="9"
          className="transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-4"
        />
        <circle
          cx="120"
          cy="77"
          fill="#8A8CEF"
          r="19"
          className="transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-2"
        />
        <g filter={`url(#b-${uniqueId})`}>
          <rect
            fill="rgba(203, 209, 250, 0.1)"
            height="86.498"
            rx="8"
            stroke="rgba(203, 209, 250, 0.3)"
            strokeWidth="1"
            className="transition-transform duration-300"
            style={{
              transform: "rotate(-11.133deg) translate(0, 0)",
            }}
            width="104.004"
            x="12"
            y="20.082"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "rotate(0deg) translate(8px, -12px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "rotate(-11.133deg) translate(0, 0)";
            }}
          />
          <rect
            fill="rgba(203, 209, 250, 0.1)"
            height="85.498"
            rx="7.5"
            stroke="rgba(203, 209, 250, 0.3)"
            strokeWidth="1"
            style={{
              transition: "transform 0.3s ease",
              transform: "rotate(-11.133deg) translate(0, 0)",
            }}
            width="103.004"
            x="12.587"
            y="20.476"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "rotate(0deg) translate(8px, -12px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "rotate(-11.133deg) translate(0, 0)";
            }}
          />
        </g>
        <g clipPath={`url(#c-${uniqueId})`}>
          <path
            d="M60.632 16.299h48.733c3.499 0 6.336 2.821 6.336 6.301v5.265H48.832l3.135-6.239a9.694 9.694 0 0 1 8.665-5.327Z"
            fill="#fff"
          />
          <path
            d="M115.7 28.163H48.832a.298.298 0 0 1-.269-.432l3.134-6.239a9.949 9.949 0 0 1 3.682-4.008A10.027 10.027 0 0 1 60.632 16h48.732c3.66 0 6.636 2.96 6.636 6.6v5.265a.3.3 0 0 1-.3.298Zm-66.383-.597H115.4V22.6c0-3.31-2.707-6.003-6.036-6.003H60.632c-3.58 0-6.797 1.977-8.397 5.162l-2.918 5.807Z"
            fill="#3C347B"
          />
          <path
            d="M33.514 27.864H115.7v53.657c0 3.41-2.784 6.18-6.213 6.18H33.514c-3.429 0-6.213-2.77-6.213-6.18V34.045c0-3.41 2.784-6.18 6.213-6.18Z"
            fill="#fff"
          />
          <path
            d="M109.486 88H33.514C29.922 88 27 85.094 27 81.521V34.045c0-3.572 2.922-6.479 6.514-6.479H115.7a.3.3 0 0 1 .3.299V81.52c0 3.573-2.922 6.48-6.514 6.48ZM33.514 28.163c-3.261 0-5.913 2.639-5.913 5.881v47.477c0 3.244 2.653 5.882 5.913 5.882h75.973c3.261 0 5.913-2.639 5.913-5.882V28.163H33.514Z"
            fill="#3C347B"
          />
          <path
            d="M95.604 58.61v-.033c0-4.98-4.06-9.018-9.068-9.018a9.054 9.054 0 0 0-5.492 1.844c-1.462-7.032-7.722-12.317-15.225-12.317a15.547 15.547 0 0 0-14.726 10.493c-5.401.317-9.681 4.779-9.667 10.233.014 5.653 4.693 10.199 10.377 10.199h4.854a3.498 3.498 0 0 0 3.507-3.489v-5.455h-4.41l9.444-11.718 9.444 11.718h-4.41v5.455a3.498 3.498 0 0 0 3.508 3.489h21.182c3.18 0 5.837-2.587 5.819-5.75-.017-2.938-2.26-5.35-5.138-5.651Z"
            fill="#8A8CEF"
          />
          <path
            d="M115.701 22.778H57.529a.3.3 0 0 1-.3-.298.3.3 0 0 1 .3-.298H115.7a.3.3 0 0 1 .3.298.3.3 0 0 1-.3.298h.001Z"
            fill="#3C347B"
          />
        </g>
      </g>
      <defs>
        <clipPath id={`a-${uniqueId}`}>
          <path d="M0 0h154v105H0z" fill="#fff" />
        </clipPath>
        <clipPath id={`c-${uniqueId}`}>
          <path d="M27 16h89v72H27z" fill="#fff" />
        </clipPath>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="134.167"
          id={`b-${uniqueId}`}
          width="147.963"
          x="-2.607"
          y="-14.607"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="8" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_6408_39643"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur_6408_39643"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
