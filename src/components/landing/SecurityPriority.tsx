"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SecurityPriority() {
  const t = useTranslations();

  return (
    <section 
      className="relative flex flex-col items-center justify-center w-full h-[416px] bg-[#3758F9]"
      style={{
        backgroundImage: "url('/assets/images/sec_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-[#3758F9] bg-opacity-80"></div>
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        {/* Security Priority SVG Icon */}
        <div className="mb-6">
          <Image
            src="/assets/images/security_priority.svg"
            alt="Security Priority"
            width={1426}
            height={320}
            style={{ height: "auto" }}
            className="w-full h-full"
          />
        </div>
        
      </div>
    </section>
  );
}
