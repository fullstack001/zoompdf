import "../../app/globals.css";

export default function PlanHero({
  handleGoPayment,
}: {
  handleGoPayment: () => void;
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-20">
      <div className="text-[28px] md:text-[36px] lg:text-[40px] font-medium mb-4 text-center md:text-left">
        Choose a plan to download your file
      </div>
      <div>
        <button
          className="bg-primary-900 text-[20px] md:text-[24px] text-white font-semibold px-8 md:px-16 py-3 md:py-4 rounded-2xl"
          onClick={handleGoPayment}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
