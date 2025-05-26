"use client";
import Image from "next/image";

const features = [
  {
    title: "Safe",
    desc: "Keep your business data safe with HTTPS encryption, ensuring every file creation is secure.",
    icon: "/assets/images/activity.png",
  },
  {
    title: "Business-oriented",
    desc: "Redact, insert objects, and sign PDFs easily, making document management smooth for your organization.",
    icon: "/assets/images/graph.png",
  },
  {
    title: "Quick",
    desc: "Our PDF converter makes document conversion fast, perfect for busy teams.",
    icon: "/assets/images/time-circle.png",
  },
  {
    title: "Easy to use",
    desc: "Set up your company's document workflows easily with our user-friendly editor interface.",
    icon: "/assets/images/heart.png",
  },
];

export default function WhyUs() {
  return (
    <section className="py-16 px-4 bg-primary-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-bold">
            Why TheBestPDF is the top choice for your team
          </h2>
          {features.map((f) => (
            <div key={f.title} className="flex items-center space-x-2 gap-3">
              <div>
                <Image
                  src={f.icon}
                  alt={f.title}
                  width={25}
                  height={25}
                  className="mx-auto mb-2"
                />
              </div>
              <div>
                <p className="font-semibold text-xl text-gray-600">{f.title}</p>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            </div>
          ))}
          <button className="bg-primary-900 text-white px-6 py-2 rounded-lg font-bold">
            Get Started
          </button>
        </div>
        <Image
          src="/assets/images/why-us.png"
          alt="Why Us"
          width={400}
          height={300}
        />
      </div>
    </section>
  );
}
