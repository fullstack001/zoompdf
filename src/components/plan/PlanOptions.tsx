import { Star } from "lucide-react";

const plans = [
  { id: "7_free", title: "7-Day Basic Access", price: "$0.95", popular: false },
  { id: "7_full", title: "7-Day Full Access", price: "$1.95", popular: true },
  {
    id: "annual",
    title: "Annual Plan",
    price: "$16.58 /month",
    popular: false,
  },
];

interface PlanOptionsProps {
  selectedOption: string | null;
  setSelectedOption: (option: string) => void;
}

export default function PlanOptions({
  selectedOption,
  setSelectedOption,
}: PlanOptionsProps) {
  return (
    <div className="flex-1 space-y-4">
      {plans.map((plan) => (
        <div
          key={plan.title}
          onClick={() => setSelectedOption(plan.id)}
          className={`rounded-xl border relative overflow-hidden transition-all cursor-pointer ${
            selectedOption === plan.id
              ? "border-blue-500 bg-white shadow-md ring-2 ring-blue-500"
              : "border-gray-200 bg-white"
          }`}
        >
          {plan.popular && (
            <div className="bg-primary-900 text-white text-xs px-4 py-1 font-semibold flex justify-center gap-4 z-10 text-center">
              <Star size={12} className="fill-white" /> MOST POPULAR{" "}
              <Star size={12} className="fill-white" />
            </div>
          )}
          <div className="flex justify-between items-center mt-2 p-4 ">
            <div>
              <p className="font-semibold text-base md:text-lg">{plan.title}</p>
              <p className="text-sm text-gray-800 font-semibold">
                For occasional users
              </p>
            </div>
            <p className="font-bold text-xl text-gray-800">{plan.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
