"use client";
import "../../app/globals.css";

export default function HowItWorks() {
  const steps = [
    "Log into TheBestPDF and go to the Compress PDF tool",
    "Upload or drag & drop your PDF into the interface",
    `That’s it! Your newly compressed file is ready for download and can be found in your team’s account`,
  ];

  return (
    <section className="bg-white p-8 md:p-24">
      <h2 className="text-[28px] md:text-[40px] text-[#212121] font-medium text-center mb-8 md:mb-12">
        How to compress PDF
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8">
        {steps.map((step, i) => (
          <div
            key={i}
            className="p-4 md:p-6 w-full flex flex-col md:flex-row gap-4"
          >
            <div className="bg-primary-900 text-white rounded-full px-6 md:px-8 py-2 font-bold text-[24px] md:text-[32px] w-[60px] md:w-[78px] h-[60px] md:h-[78px] flex items-center justify-center">
              {i + 1}
            </div>
            <div className="text-[18px] md:text-[24px] text-[#616161] font-medium">
              {step}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
