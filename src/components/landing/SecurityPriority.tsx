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
      <div className="absolute inset-0 bg-[#3758F9] bg-opacity-80" />

      <div className="relative z-10 mx-auto w-full max-w-[1426px] px-4 sm:px-6">
        <div className="flex min-h-[320px] w-full flex-col items-start gap-8 rounded-[32px] border-2 border-[#CCD4FF] bg-[#0019A1] p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full max-w-[883px] flex-col items-start justify-center gap-4 lg:gap-8">
            <h2 className="text-3xl font-medium leading-[1.4] text-white sm:text-4xl lg:text-[40px] lg:leading-[1.6]">
              Your security is our #1 priority
            </h2>
            <p className="text-lg font-medium leading-[1.6] text-white/95 sm:text-xl lg:text-2xl">
              PDFezy adheres to top industry standards and regulations,
              guaranteeing safety of your files and data.
            </p>
          </div>

          <div className="flex w-full flex-1 items-center justify-start lg:justify-end">
            <div className=" px-2 py-3 lg:px-6">
              <Image
                src="/assets/images/security-icon-group.png"
                alt={t("securityPriority.title")}
                width={326}
                height={90}
                className="h-auto w-[220px] object-contain sm:w-[280px] lg:w-[326px]"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
