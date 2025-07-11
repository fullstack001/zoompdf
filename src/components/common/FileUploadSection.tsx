"use client";
import React from "react";
import { CirclePlus } from "lucide-react";

export default function FileUploadSection({
  acceptType,
  handleFileChange,
}: {
  acceptType?: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-6 w-full max-w-[90%] sm:max-w-[1142px] aspect-[1142/348] mx-auto hover:shadow-2xl transition-shadow duration-300">
      <div className="bg-white border-dashed border-2 border-gray-300 rounded-lg p-8 sm:p-8 md:p-8 w-full h-auto mx-auto group hover:border-gray-400 ">
        <div className="w-[154px] h-[105px] mx-auto cursor-pointer relative">
          <input
            type="file"
            accept={acceptType ? acceptType : "application/pdf"}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
          <svg
            className="inline-block h-full align-top fill-current"
            viewBox="0 0 154 105"
          >
            <g clip-path="url(#a)">
              <circle
                cx="20"
                cy="57"
                fill="#FFC5A8"
                r="14"
                className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-5"
              ></circle>
              <circle
                cx="122"
                cy="25"
                fill="#ABB3F6"
                r="9"
                className="transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-4"
              ></circle>
              <circle
                cx="120"
                cy="77"
                fill="#8A8CEF"
                r="19"
                className="transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-2"
              ></circle>
              <g filter="url(#b)">
                <rect
                  fill="rgba(203, 209, 250, 0.1)"
                  height="86.498"
                  rx="8"
                  stroke="rgba(203, 209, 250, 0.3)"
                  stroke-width="1"
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
                ></rect>
                <rect
                  fill="rgba(203, 209, 250, 0.1)"
                  height="85.498"
                  rx="7.5"
                  stroke="rgba(203, 209, 250, 0.3)"
                  stroke-width="1"
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
                ></rect>
              </g>
              <g clip-path="url(#c)">
                <path
                  d="M60.632 16.299h48.733c3.499 0 6.336 2.821 6.336 6.301v5.265H48.832l3.135-6.239a9.694 9.694 0 0 1 8.665-5.327Z"
                  fill="#fff"
                ></path>
                <path
                  d="M115.7 28.163H48.832a.298.298 0 0 1-.269-.432l3.134-6.239a9.949 9.949 0 0 1 3.682-4.008A10.027 10.027 0 0 1 60.632 16h48.732c3.66 0 6.636 2.96 6.636 6.6v5.265a.3.3 0 0 1-.3.298Zm-66.383-.597H115.4V22.6c0-3.31-2.707-6.003-6.036-6.003H60.632c-3.58 0-6.797 1.977-8.397 5.162l-2.918 5.807Z"
                  fill="#3C347B"
                ></path>
                <path
                  d="M33.514 27.864H115.7v53.657c0 3.41-2.784 6.18-6.213 6.18H33.514c-3.429 0-6.213-2.77-6.213-6.18V34.045c0-3.41 2.784-6.18 6.213-6.18Z"
                  fill="#fff"
                ></path>
                <path
                  d="M109.486 88H33.514C29.922 88 27 85.094 27 81.521V34.045c0-3.572 2.922-6.479 6.514-6.479H115.7a.3.3 0 0 1 .3.299V81.52c0 3.573-2.922 6.48-6.514 6.48ZM33.514 28.163c-3.261 0-5.913 2.639-5.913 5.881v47.477c0 3.244 2.653 5.882 5.913 5.882h75.973c3.261 0 5.913-2.639 5.913-5.882V28.163H33.514Z"
                  fill="#3C347B"
                ></path>
                <path
                  d="M95.604 58.61v-.033c0-4.98-4.06-9.018-9.068-9.018a9.054 9.054 0 0 0-5.492 1.844c-1.462-7.032-7.722-12.317-15.225-12.317a15.547 15.547 0 0 0-14.726 10.493c-5.401.317-9.681 4.779-9.667 10.233.014 5.653 4.693 10.199 10.377 10.199h4.854a3.498 3.498 0 0 0 3.507-3.489v-5.455h-4.41l9.444-11.718 9.444 11.718h-4.41v5.455a3.498 3.498 0 0 0 3.508 3.489h21.182c3.18 0 5.837-2.587 5.819-5.75-.017-2.938-2.26-5.35-5.138-5.651Z"
                  fill="#8A8CEF"
                ></path>
                <path
                  d="M115.701 22.778H57.529a.3.3 0 0 1-.3-.298.3.3 0 0 1 .3-.298H115.7a.3.3 0 0 1 .3.298.3.3 0 0 1-.3.298h.001Z"
                  fill="#3C347B"
                ></path>
              </g>
            </g>
            <defs>
              <clipPath id="a">
                <path d="M0 0h154v105H0z" fill="#fff"></path>
              </clipPath>
              <clipPath id="c">
                <path d="M27 16h89v72H27z" fill="#fff"></path>
              </clipPath>
              <filter
                color-interpolation-filters="sRGB"
                filterUnits="userSpaceOnUse"
                height="134.167"
                id="b"
                width="147.963"
                x="-2.607"
                y="-14.607"
              >
                <feFlood
                  flood-opacity="0"
                  result="BackgroundImageFix"
                ></feFlood>
                <feGaussianBlur
                  in="BackgroundImageFix"
                  stdDeviation="8"
                ></feGaussianBlur>
                <feComposite
                  in2="SourceAlpha"
                  operator="in"
                  result="effect1_backgroundBlur_6408_39643"
                ></feComposite>
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_backgroundBlur_6408_39643"
                  result="shape"
                ></feBlend>
              </filter>
            </defs>
          </svg>
        </div>
        <div className="mt-8 sm:mt-4 md:mt-8 text-sm sm:text-base md:text-lg mx-auto text-center bg-primary-900 text-white w-fit py-3 px-8 rounded-lg cursor-pointer hover:bg-primary-800 transition-colors duration-300 uppercase">
          <div className="flex items-center justify-center">
            <CirclePlus className="mr-4" size={14} />
            <div>Upload Your File</div>
            <CirclePlus className="ml-4" size={14} />
          </div>
        </div>
        <p className="text-sm sm:text-sm md:text-base text-gray-500 mt-4 sm:mt-4 md:mt-4">
          or drop your file here
        </p>
        <p className="text-[16px] sm:text-sm md:text-[12px] text-gray-400 ">
          Size up to 100MB
        </p>
      </div>
    </div>
  );
}
