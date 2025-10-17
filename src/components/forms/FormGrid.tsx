import Image from "next/image";
import { Eye, Loader2 } from "lucide-react";
import { useState } from "react";

const forms = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: "Fill out Form VA 10-2850C Online in 2024",
  thumbnail: "/assets/images/form_image.png",
}));

export default function FormGrid() {
  const [loadingFormId, setLoadingFormId] = useState<number | null>(null);

  const handleViewForm = async (formId: number) => {
    setLoadingFormId(formId);
    try {
      // Add your form viewing logic here
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setLoadingFormId(null);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {forms.map((form) => (
        <div
          key={form.id}
          className="bg-white rounded-lg shadow-md p-4 text-sm text-center"
        >
          <Image
            src={form.thumbnail}
            alt={form.title}
            width={200}
            height={0}
            style={{ height: "auto" }}
            className="mx-auto rounded"
          />
          <p className="mt-2 mb-4 text-xs">{form.title}</p>
          <button
            onClick={() => handleViewForm(form.id)}
            disabled={loadingFormId === form.id}
            className="bg-[#4B68FF] text-white w-full py-1.5 rounded-md text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loadingFormId === form.id ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Eye size={16} />
                View Form
              </>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
