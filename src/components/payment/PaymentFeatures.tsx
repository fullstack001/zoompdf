import { Check } from "lucide-react";

const features = [
  "Unlimited downloads",
  "Convert and export PDFs",
  "Merge, split, and compress PDFs",
  "Unlimited cloud storage",
  "24/7 customer support",
];

export default function PaymentFeatures() {
  return (
    <div className="bg-white rounded-xl p-4 shadow text-sm">
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <label key={i} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              readOnly
              checked
              className="accent-blue-600 w-4 h-4 rounded"
            />
            <span className="font-semibold">{feature}</span>
          </label>
        ))}
      </ul>
    </div>
  );
}
