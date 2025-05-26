'use client';
import '../../app/globals.css';

export default function HowItWorks() {
  const steps = [
    'Log into TheBestPDF and go to the Compress PDF tool',
    'Upload or drag & drop your PDF into the interface',
    `That’s it! Your newly compressed file is ready for download and can be found in your team’s account`
  ];

  return (
    <section className="py-16 bg-white px-4">
      <h2 className="text-2xl font-bold text-center mb-12">How to compress PDF</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {steps.map((step, i) => (
          <div key={i} className=" p-6 w-full max-w-sm flex flex-col md:flex-row items-center gap-4">
            <div className=" bg-primary-900 text-white rounded-full px-4 py-2 font-bold text-xl mb-2">{i + 1}</div>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}