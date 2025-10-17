"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Eye, Plus, Loader2 } from "lucide-react";

// Sample form templates data
const formTemplates = [
  {
    id: 1,
    title: "Form VA 10-2850C",
    description: "Fill out Form VA 10-2850C Online in 2024",
    image: "/assets/images/form_image.png",
  },
  {
    id: 2,
    title: "Form VA 10-2850C",
    description: "Fill out Form VA 10-2850C Online in 2024",
    image: "/assets/images/form_image.png",
  },
  {
    id: 3,
    title: "Form VA 10-2850C",
    description: "Fill out Form VA 10-2850C Online in 2024",
    image: "/assets/images/form_image.png",
  },
  {
    id: 4,
    title: "Form VA 10-2850C",
    description: "Fill out Form VA 10-2850C Online in 2024",
    image: "/assets/images/form_image.png",
  },
  {
    id: 5,
    title: "Form VA 10-2850C",
    description: "Fill out Form VA 10-2850C Online in 2024",
    image: "/assets/images/form_image.png",
  },
  {
    id: 6,
    title: "Form VA 10-2850C",
    description: "Fill out Form VA 10-2850C Online in 2024",
    image: "/assets/images/form_image.png",
  },
  {
    id: 7,
    title: "Form VA 10-2850C",
    description: "Fill out Form VA 10-2850C Online in 2024",
    image: "/assets/images/form_image.png",
  },
  {
    id: 8,
    title: "Form VA 10-2850C",
    description: "Fill out Form VA 10-2850C Online in 2024",
    image: "/assets/images/form_image.png",
  },
];

export default function FormTemplates() {
  const t = useTranslations();
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingFormId, setLoadingFormId] = useState<number | null>(null);
  const [isViewingAll, setIsViewingAll] = useState(false);
  const formsPerPage = 8;
  const totalPages = Math.ceil(formTemplates.length / formsPerPage);

  const currentForms = formTemplates.slice(
    currentPage * formsPerPage,
    (currentPage + 1) * formsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleViewForm = async (formId: number) => {
    setLoadingFormId(formId);
    try {
      // Add your form viewing logic here
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setLoadingFormId(null);
    }
  };

  const handleViewAllForms = async () => {
    setIsViewingAll(true);
    try {
      // Add your view all forms logic here
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setIsViewingAll(false);
    }
  };

  return (
    <>
      <section className="py-12 px-6 md:px-12 lg:px-24 bg-[#EDF0FF]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t("formTemplates.title")}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t("formTemplates.subtitle")}
            </p>
          </div>

          {/* Forms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 grid-row-1 md:grid-row-2 gap-6 mb-8">
            {currentForms.map((form) => (
              <div
                key={form.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Form Preview */}
                <div className="aspect-[3/4] flex items-center justify-center p-4">
                  <div className="w-full h-full bg-white border border-gray-300 rounded flex items-center justify-center text-gray-500 text-sm">
                    Form Preview
                  </div>
                </div>

                {/* Form Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {form.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {form.description}
                  </p>
                  <button
                    onClick={() => handleViewForm(form.id)}
                    disabled={loadingFormId === form.id}
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loadingFormId === form.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-1" />
                        {t("formTemplates.viewForm")}
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mb-8 md:hidden">
            <button
              onClick={prevPage}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextPage}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={handleViewAllForms}
              disabled={isViewingAll}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center mx-auto transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isViewingAll ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Loading...
                  <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  {t("formTemplates.viewAllForms")}
                  <Plus className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
