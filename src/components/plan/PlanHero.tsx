import '../../app/globals.css';

export default function PlanHero() {
  return (
    <div className="flex items-center justify-center gap-20">

      <div className="text-2xl md:text-3xl font-bold mb-4">Choose a plan to download your file</div>
      <div>
      <button className="bg-primary-900 text-white font-semibold px-16 py-2 rounded-lg ">Continue →</button>
      </div>
      
    </div>
  );
}