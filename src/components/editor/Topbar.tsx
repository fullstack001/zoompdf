"use client";
import Image from "next/image";
import {
  Search,
  Printer,
  Download,
  CheckSquare,
  X,
  ArrowDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const formats = [
  { label: "PDF", icon: "/assets/images/pdf.png" },
  { label: "PNG", icon: "/assets/images/png.png" },
  { label: "Word", icon: "/assets/images/list.png" },
  { label: "JPG", icon: "/assets/images/png.png" },
  { label: "Excel", icon: "/assets/images/excel.png" },
  { label: "PPT", icon: "/assets/images/ppt.png" },
];

export default function Topbar() {
  const [showModal, setShowModal] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState("PDF");
  const [filename, setFilename] = useState("sangam_2024-25_rules_for_viii-ix");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (showProgress) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setShowProgress(false);
            // setShowModal(false);
            setTimeout(() => {
              setShowProgress(false);
              setShowEmailModal(true);
            }, 300);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
    }
  }, [showProgress]);

  //I want to redirect to '/plan' page when click download button in showEmailModal. how to do this?
  const handleDownload = () => {
    // Simulate download action
    setTimeout(() => {
      setShowEmailModal(false);
      // Redirect to plan page
      window.location.href = "/plan";
    }, 500);
  };

  return (
    <>
      <header className="bg-white border-b px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              alt="ZoomPDF"
              width={128}
              height={28}
            />
          </Link>

          <input
            type="text"
            defaultValue="Filename.pdf"
            className="border border-blue-300 px-4 py-1 rounded-lg text-sm outline-none w-64 bg-blue-50"
          />
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-700">
          <div className="text-center hover:text-blue-600 cursor-pointer">
            <div className="text-center flex items-center justify-center mb-1">
              <Search size={16} />
            </div>
            <div className="font-semibold">Search</div>
          </div>
          <div className="text-center hover:text-blue-600 cursor-pointer">
            <div className="text-center flex items-center justify-center mb-1">
              <Printer size={16} />
            </div>
            <div className="font-semibold">Print</div>
          </div>
          <div className="text-center hover:text-blue-600 cursor-pointer">
            <div className="text-center flex items-center justify-center mb-1">
              <Download size={16} />
            </div>
            <div className="font-semibold">Download</div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-1.5 rounded-lg font-medium"
          >
            <CheckSquare size={16} /> Done
          </button>
        </div>
      </header>

      {showModal && !showProgress && !showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={18} />
            </button>
            <h2 className="text-xl font-bold text-center mb-1">Great Job!</h2>
            <p className="text-center text-sm text-gray-600 mb-6">
              Select the format to download your file.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {formats.map(({ label, icon }) => (
                <button
                  key={label}
                  onClick={() => setSelected(label)}
                  className={`flex items-center gap-2 justify-start border rounded-md px-3 py-2 text-sm ${
                    selected === label
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  <div className="border border-md border-blue-500 p-2 rounded-lg">
                    <Image src={icon} alt={label} width={20} height={20} />
                  </div>

                  <input type="radio" checked={selected === label} readOnly />

                  {label}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label
                htmlFor="filename"
                className="block text-xs text-gray-500 mb-1"
              >
                File Name
              </label>
              <input
                id="filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="w-full border px-4 py-2 rounded-md text-sm"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 px-6 py-2 rounded-lg text-sm hover:bg-gray-300 flex items-center gap-2 font-semibold"
              >
                Cancel
                <div className="border border-md border-gray-950 p-1 rounded-md">
                  <X size={10} />
                </div>
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setShowProgress(true);
                  setProgress(0);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2 font-semibold"
              >
                Download
                <div className="border border-md border-white p-1 rounded-md">
                  <ArrowDown size={10} />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Processing modal */}
      {showProgress && (
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
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-full max-w-md p-8 text-center shadow-xl relative">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4">Enter your Email address</h3>
            <div className="text-left w-full mb-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email Address"
                className="w-full mt-1 px-4 py-3 rounded-md bg-gray-100 text-sm"
              />
            </div>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold mt-4 flex justify-center items-center gap-2"
              onClick={handleDownload}
            >
              Download <ArrowDown size={16} />
            </button>
            <p className="text-xs text-gray-500 mt-4">
              By clicking 'Download File,' you agree to our{" "}
              <a href="#" className="underline">
                Terms and conditions
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy policy
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </>
  );
}
