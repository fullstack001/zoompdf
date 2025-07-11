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
    <div className="flex-1 space-y-4 max-w-full  md:max-w-[780px] mb-8">
      {plans.map((plan) => (
        <div
          key={plan.title}
          onClick={() => setSelectedOption(plan.id)}
          className={`rounded-2xl w-full border relative mb-4 overflow-hidden transition-all cursor-pointer ${
            selectedOption === plan.id
              ? "border-blue-500 bg-white shadow-md ring-2 ring-blue-500"
              : "border-gray-200 bg-white"
          }`}
        >
          {plan.popular && (
            <div className="bg-primary-900 text-white text-[14px] md:text-[16px] px-4 py-2 font-semibold flex justify-center gap-4 z-10 text-center">
              <Star size={14} className="fill-white mt-1" /> MOST POPULAR{" "}
              <Star size={14} className="fill-white mt-1" />
            </div>
          )}
          <div className="flex flex-col md:flex-row justify-between items-center m-4 md:m-4">
            <div>
              <p className="font-semibold text-[20px] md:text-[24px] ">
                {plan.title}
              </p>
              <p className="text-xs md:text-sm text-gray-800 font-semibold">
                For occasional users
              </p>
            </div>
            <p className="font-bold text-[28px] md:text-[32px] text-gray-800">
              {plan.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
