"use client";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import "../../app/globals.css";

export default function FeatureCTA() {
  return (
    <section className="py-6 md:py-12 bg-primary-900 px-6 md:px-24 text-center">
      <div className="mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12 lg:gap-24">
        <div className="p-6 md:p-12">
          <Image
            src="/assets/images/feature-cta.png"
            alt="PDFDen illustration"
            width={508}
            height={476}
            className="w-full h-auto"
          />
        </div>
        <div className="text-left text-white flex-1 px-6 md:px-12 py-2">
          <h2 className="font-sans font-medium text-[24px] md:text-[32px] lg:text-[40px] leading-[1.6] tracking-normal align-middle mb-6 md:mb-8">
            PDFDen delivers top‑tier file management solutions for teams of all
            sizes.
          </h2>
          <p className="mb-6 md:mb-8 text-lg md:text-xl lg:text-2xl font-medium">
            Welcome to our cutting-edge SaaS platform for online document
            editing and conversion. Designed to meet the needs of businesses and
            entrepreneurs.
          </p>
          <button className="bg-primary-50 text-primary-900 px-4 md:px-6 py-3 md:py-5 text-lg md:text-xl lg:text-[24px] rounded-xl md:rounded-2xl font-bold">
            Get Started
            <ChevronRight className="inline w-5 md:w-6 h-5 md:h-6 ml-1 mb-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
