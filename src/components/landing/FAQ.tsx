"use client";
import { useState } from "react";
import { ChevronDownIcon, ChevronRight, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import "../../app/globals.css";

export default function FAQ() {
  const t = useTranslations("faq");
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState(false);

  const faqData = [
    {
      question: t("multipleUsers"),
      answer: t("multipleUsersAnswer"),
    },
    {
      question: t("customerSupport"),
      answer: t("customerSupportAnswer"),
    },
    {
      question: t("processingSpeed"),
      answer: t("processingSpeedAnswer"),
    },
    {
      question: t("moneyBack"),
      answer: t("moneyBackAnswer"),
    },
  ];

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleCTAClick = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      document
        .getElementById("tools-grid-section")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-6 md:py-8 lg:py-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 bg-blue-50 mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 items-stretch lg:items-center justify-between w-full max-w-[100vw] overflow-x-hidden">
      {/* Accordion */}
      <div className="flex-1 min-w-0 w-full p-4 sm:p-6 md:p-8 lg:p-12">
        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-[40px] font-medium text-gray-900 mb-4 sm:mb-6 md:mb-8 break-words">
          {t("title")}
        </h2>
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow mb-2"
          >
            <button
              type="button"
              className="w-full text-left text-sm sm:text-base md:text-[18px] py-3 sm:py-4 font-semibold text-gray-800 flex justify-between items-start gap-3 min-h-[44px] sm:min-h-0"
              onClick={() => toggle(index)}
            >
              {faq.question}
              <ChevronDownIcon
                className={`transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                size={20}
              />
            </button>
            {activeIndex === index && (
              <div className="py-3 sm:py-4 text-sm sm:text-base border-t text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="flex-1 min-w-0 w-full lg:max-w-xl bg-primary-900 text-white rounded-2xl p-5 sm:p-8 md:p-12 flex flex-col justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-medium mb-4 sm:mb-6 md:mb-8 break-words">
            {t("ctaTitle")}
          </h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed">
            {t("ctaDescription")}
          </p>
        </div>
        <div className="mt-6 sm:mt-8">
          <button
            type="button"
            onClick={handleCTAClick}
            disabled={isLoading}
            className="bg-[#4B68FF] text-white px-4 py-3 rounded-2xl text-sm sm:text-base md:text-xl lg:text-2xl font-bold shadow-md inline-flex items-center justify-center w-full sm:w-auto min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                {t("loading")}
              </>
            ) : (
              <>
                {t("ctaButton")}
                <ChevronRight className="inline w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 ml-1 mb-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
