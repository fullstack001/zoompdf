"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Newsletter() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Newsletter subscription logic would go here
      console.log("Newsletter signup:", email);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmail("");
      // Add success message or toast notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="text-lg font-semibold text-gray-900">
        {t("footer.stayUpdated")}
      </h4>
      <p className="text-sm text-gray-600 max-w-md mx-auto sm:mx-0 lg:mx-0">
        {t("footer.newsletterDescription")}
      </p>
      <form
        onSubmit={handleNewsletterSubmit}
        className="space-y-3 max-w-md mx-auto sm:mx-0 lg:mx-0"
      >
        <div className="flex flex-col lg:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("footer.emailPlaceholder")}
            className="flex-1 px-4 py-2 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full lg:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium lg:whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                {t("common.loading")}
              </>
            ) : (
              t("footer.subscribe")
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
