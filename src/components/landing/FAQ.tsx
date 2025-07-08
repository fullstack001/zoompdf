'use client';
import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import '../../app/globals.css';

const faqData = [
  {
    question: 'Can multiple users from our company use the service simultaneously?',
    answer:
      'Easy! Create one account and the whole team will be able to use our tool. To get started with a subscription, simply register, make some file adjustments, click "Download," and then pick the plan that suits you best.'
  },
  {
    question: 'Do you offer customer support for technical issues?',
    answer: 'Yes, our support team is available 24/7 to assist with any technical issues you encounter.'
  },
  {
    question: 'How quickly are documents processed on your platform?',
    answer: 'Documents are typically processed within seconds, even for large files.'
  },
  {
    question: 'Do you have a money-back guarantee?',
    answer: 'Yes, we offer a 14-day money-back guarantee if you are not satisfied with our service.'
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-blue-50">
      <h2 className="text-3xl font-bold text-center mb-12">Do you have any Question?</h2>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Accordion */}
        <div className="flex-1 space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow">
              <button
                className="w-full text-left px-6 py-4 font-medium text-gray-800 flex justify-between items-center"
                onClick={() => toggle(index)}
              >
                {faq.question}
                <ChevronDownIcon
                  className={`transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                  size={20}
                />
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-4 text-sm text-gray-600 border-t">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="flex-1 bg-primary-900 text-white rounded-xl p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-4">Looking to elevate your business operations?</h3>
            <p className="text-sm leading-relaxed">
              Reach out to us at <a href="mailto:sales@thebestpdf.com">sales@thebestpdf.com</a>, and
              let’s explore how our product can revolutionize your corporate paperwork. Join the growing
              community of successful businesses leveraging TheBestPDF to stay ahead!
            </p>
          </div>
          <div className="mt-6">
            <button className="bg-primary-50 px-6 py-2 rounded-lg font-semibold text-sm shadow-md">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
