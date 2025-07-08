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
    <section className="bg-gray-100 py-16 px-4 text-center">
      <h2 className="text-2xl font-bold mb-8">Core values behind TheBestPDF</h2>
      <div className="flex flex-wrap justify-center gap-12">
        {values.map((val) => (
          <div
            key={val.title}
            className="bg-white shadow-md px-6 py-4 rounded w-60 text-left"
          >
            <p className="font-medium text-xl mb-4">{val.title}</p>
            <p>
              {val.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
