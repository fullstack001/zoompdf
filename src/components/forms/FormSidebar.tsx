"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

const categories = [
  {
    title: "Tax Forms",
    sub: ["Form 1040", "Form W-2", "Form 1099"],
  },
  {
    title: "Legal Forms",
    sub: ["Power of Attorney", "Non-Disclosure Agreement"],
  },
  {
    title: "Healthcare Forms",
    sub: ["HIPAA Release Form", "Medical History Form"],
  },
  {
    title: "Employment & HR Forms",
    sub: ["Job Application Form", "Employee Evaluation Form"],
  },
  {
    title: "Military Forms",
    sub: ["DD Form 214", "VA Form 10-2850C"],
  },
  {
    title: "Education Forms",
    sub: ["Transcript Request", "School Registration Form"],
  },
  {
    title: "Business Forms",
    sub: ["Invoice Template", "Business Agreement"],
  },
  {
    title: "Financial Forms",
    sub: ["Expense Report", "Budget Planner"],
  },
  {
    title: "Real Estate Forms",
    sub: ["Rental Agreement", "Purchase Agreement"],
  },
  {
    title: "Insurance Forms",
    sub: ["Claim Form", "Policy Application"],
  },
  {
    title: "Travel & Immigration Forms",
    sub: ["Visa Application", "Customs Declaration"],
  },
  {
    title: "IT & Digital Forms",
    sub: ["Bug Report", "Software Installation Request"],
  },
  {
    title: "Other Forms",
    sub: ["Feedback Form", "Miscellaneous Document"],
  },
];

export default function FormSidebar() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <aside className="w-64 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-sm font-semibold mb-4 text-blue-600">All Forms</h2>
      <ul className="space-y-2">
        {categories.map(({ title, sub }) => (
          <li key={title}>
            <div
              className="flex items-center text-sm font-medium text-gray-800 cursor-pointer hover:text-blue-600 border-b-2 mb-2 py-2"
              onClick={() => setExpanded(title === expanded ? null : title)}
            >
              <ChevronRight
                size={16}
                className={`transition mr-2 ${
                  expanded === title ? "rotate-90" : ""
                }`}
              />
              {title}{" "}
            </div>
            {expanded === title && (
              <ul className="ml-4 mt-1 space-y-1">
                {sub.map((subItem) => (
                  <li
                    key={subItem}
                    className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
                  >
                    {subItem}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
