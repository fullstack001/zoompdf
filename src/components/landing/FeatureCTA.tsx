'use client';
import Image from 'next/image';
import '../../app/globals.css';

export default function FeatureCTA() {
  return (

    <section className="py-16 bg-primary-900 px-4 text-center">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">       
          <div className='space-y-6'>
            <Image src="/assets/images/feature-cta.png" alt="PDFDen illustration" width={400} height={300} />
          </div>          
          <div className="text-left text-white flex-1 space-y-6">
            <h2 className="text-2xl font-bold mb-4">PDFDen delivers top‑tier file management solutions for teams of all sizes.</h2>
            <p className="mb-6">
            Welcome to our cutting-edge SaaS platform for online document editing and conversion. Designed to meet the needs of businesses and entrepreneurs.
            </p>
            <button className="bg-primary-50 text-primary-50 px-6 py-2 rounded-lg font-bold">Get Started</button>
          </div>
        </div>
      
    </section>
  );
}