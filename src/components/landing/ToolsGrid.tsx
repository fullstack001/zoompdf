'use client';
import Image from 'next/image';
import tools from '@/data/tools';

export default function ToolsGrid() {
  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-2xl font-bold mb-10">Choose the best tool for your business needs</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {tools.map((tool) => (
          <div
            key={tool.label}
            className="p-6 bg-white rounded-lg shadow hover:shadow-md cursor-pointer"
          >
            <Image src={tool.icon} alt={tool.label} width={40} height={40} className="mx-auto mb-2" />
            <p className="text-sm font-medium">{tool.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}