"use client";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const features = [
  {
    title: "Safe",
    desc: "Keep your business data safe with HTTPS encryption, ensuring every file creation is secure.",
    icon: "/assets/images/activity1.png",
  },
  {
    title: "Business-oriented",
    desc: "Redact, insert objects, and sign PDFs easily, making document management smooth for your organization.",
    icon: "/assets/images/graph.png",
  },
  {
    title: "Quick",
    desc: "Our PDF converter makes document conversion fast, perfect for busy teams.",
    icon: "/assets/images/time-circle.png",
  },
  {
    title: "Easy to use",
    desc: "Set up your company's document workflows easily with our user-friendly editor interface.",
    icon: "/assets/images/heart.png",
  },
];

export default function WhyUs() {
  return (
    <section className="py-12 px-6 md:px-12 lg:px-24 bg-primary-50">
      <div className="mx-auto flex flex-col xl:flex-row items-center justify-between gap-12 lg:gap-24">
        <div className="flex-1 p-6 md:p-12 max-w-full lg:max-w-[816px] gap-8">
          <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-middle text-gray-900 mb-6 md:mb-8">
            Why TheBestPDF is the top choice for your team
          </h2>
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6 md:mb-8 border-b border-gray-300 pb-4"
            >
              <div className="flex-shrink-0">
                <Image
                  src={f.icon}
                  alt={f.title}
                  width={48}
                  height={54}
                  className="mx-auto mb-2 md:mr-6"
                />
              </div>
              <div>
                <p className="font-semibold text-[20px] md:text-[24px] text-gray-900">
                  {f.title}
                </p>
                <p className="text-[14px] md:text-[16px] text-gray-600">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
          <button className="bg-primary-900 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl text-[18px] md:text-[24px] font-bold">
            Get Started
            <ChevronRight className="inline w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6 ml-1 mb-1" />
          </button>
        </div>
        <Image
          src="/assets/images/why-us.png"
          alt="Why Us"
          width={408}
          height={372}
          className="w-full max-w-[408px] md:max-w-[612px] lg:max-w-[816px] p-6 md:p-12"
        />
      </div>
    </section>
  );
}
