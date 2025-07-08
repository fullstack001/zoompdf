import { Check } from 'lucide-react';

const features = [
  'Unlimited downloads',
  'Unlimited downloads',
  'Merge, split, and compress PDFs',
  'Merge, split, and compress PDFs',
  '24/7 customer support',
  '24/7 customer support'
];

export default function PlanFeatures() {
  return (
    <div className="text-sm text-gray-700 space-y-6 mt-8">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {features.map((feature, i) => (
          <label key={i} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="accent-blue-600 w-4 h-4 rounded"
            />
            <span className='font-semibold'>{feature}</span>
          </label>
        ))}
      </div>

      <p className="text-sm font-semibold text-center text-gray-700 mt-8">
        After 7 days, the price is $39 with auto-renewal. Billed every 4 weeks.<br />
        Cancel anytime. 30-day money-back guarantee.
      </p>
    </div>
  );
}