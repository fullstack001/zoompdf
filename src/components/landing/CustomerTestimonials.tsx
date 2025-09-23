"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Camille D.",
    initials: "CD",
    review:
      "I had to merge pdf files for a project. PDF House made it simple with their drag and drop feature. All my documents combined perfectly and the order was exactly how I wanted it.",
    rating: 5,
  },
  {
    id: 2,
    name: "Patrick C.",
    initials: "PC",
    review:
      "PDF House pdf conversion tools are reliable and fast. I converted a large image file to PDF and the quality remained perfect. The website never crashed even with big files.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma C.",
    initials: "EC",
    review:
      "I needed to convert PDF to Word for a report. PDF House made it super easy. Now I use it all the time.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sarah M.",
    initials: "SM",
    review:
      "The form templates feature is amazing! I can quickly create professional forms without any design skills.",
    rating: 5,
  },
  {
    id: 5,
    name: "Michael R.",
    initials: "MR",
    review:
      "Great tool for compressing PDFs. Saved me a lot of storage space while maintaining quality.",
    rating: 5,
  },
  {
    id: 6,
    name: "Lisa K.",
    initials: "LK",
    review:
      "The OCR feature works perfectly. I can now search through scanned documents easily.",
    rating: 5,
  },
];

export default function CustomerTestimonials() {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonials = () => {
    setCurrentIndex((prev) => (prev + 3) % testimonials.length);
  };

  const prevTestimonials = () => {
    setCurrentIndex(
      (prev) => (prev - 3 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
    ));
  };

  return (
    <section className="py-12 px-6 md:px-12 lg:px-24 bg-white border-t border-b border-blue-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted by 400,000+ users worldwide!
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg font-semibold text-gray-900">
              Excellent
            </span>
            <div className="flex gap-1">{renderStars(5)}</div>
            <span className="text-sm text-gray-600">
              5 on 5 based on 3112 reviews
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {currentTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-100"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-800 font-semibold text-sm">
                    {testimonial.initials}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-center mb-4 leading-relaxed">
                "{testimonial.review}"
              </p>

              {/* Reviewer Name */}
              <p className="text-gray-900 font-semibold text-center mb-3">
                {testimonial.name}
              </p>

              {/* Star Rating */}
              <div className="flex justify-center gap-1">
                {renderStars(testimonial.rating)}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={prevTestimonials}
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonials}
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
