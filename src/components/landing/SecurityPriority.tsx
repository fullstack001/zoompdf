"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SecurityPriority() {
  const t = useTranslations();

  return (
    <section
      className="relative flex flex-col items-center justify-center w-full min-h-[240px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[416px] py-10 sm:py-12 md:py-14 bg-[#3758F9]"
      style={{
        backgroundImage: "url('/assets/images/sec_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-[#3758F9] bg-opacity-80" />

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 w-full max-w-6xl mx-auto">
        <div className="w-full max-w-full">
          <Image
            src="/assets/images/security_priority.svg"
            alt={t("securityPriority.title")}
            width={1426}
            height={320}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            style={{ height: "auto", width: "100%" }}
            className="w-full max-w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
