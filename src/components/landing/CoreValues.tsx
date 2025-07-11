"use client";
const values = [
  {
    title: "Openness",
    desc: "Striving for long-term partnerships, we ensure 24/7 availability for customer support.",
  },
  {
    title: "Expertise",
    desc: "We unite creative minds to deliver integrated solutions that cover your business challenges.",
  },
  {
    title: "Growth",
    desc: "We empower organizations by keeping abreast of the latest tech advancements, aiming for excellence in our field.",
  },
  {
    title: "Diversity",
    desc: "Healthcare, Legal, Finance, Education — whatever your industry is, our tool can streamline your workflows.",
  },
];

export default function CoreValues() {
  return (
    <section className="bg-gray-100 py-12 md:py-16 lg:py-24 px-6 md:px-12 lg:px-36 text-center">
      <h2 className="text-[24px] md:text-[28px] lg:text-[40px] font-medium text-gray-900 mb-6 md:mb-8">
        Core values behind TheBestPDF
      </h2>
      <div className="flex flex-wrap justify-center xl:justify-between gap-4 md:gap-6 xl:gap-8">
        {values.map((val) => (
          <div
            key={val.title}
            className="bg-white shadow-md rounded-2xl p-6 md:p-8 gap-4 md:gap-6 w-full sm:w-[300px] md:w-[348px] text-left"
          >
            <p className="font-semibold text-[20px] md:text-[24px] mb-4">
              {val.title}
            </p>
            <p className="text-[14px] md:text-[16px] text-gray-600">
              {val.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
