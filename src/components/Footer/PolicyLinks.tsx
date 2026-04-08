"use client";

import { useLocalizedNavigation } from "@/utils/navigation";

export default function PolicyLinks() {
  const { navigate } = useLocalizedNavigation();

  const links = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Subscription Terms", href: "/subscription-policy" },
  ];

  return (
    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-4 gap-y-2 text-sm">
      {links.map((link, index) => (
        <div key={link.href} className="flex items-center">
          <button
            type="button"
            onClick={() => navigate(link.href)}
            className="hover:text-gray-300 transition-colors"
          >
            {link.label}
          </button>
          {index < links.length - 1 && (
            <span className="ml-4 text-gray-400">|</span>
          )}
        </div>
      ))}
    </div>
  );
}