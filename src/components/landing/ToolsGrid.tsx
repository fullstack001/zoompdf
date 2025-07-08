"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import tools from "@/data/tools";

export default function ToolsGrid() {
  const router = useRouter();

  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-2xl font-bold mb-10">
        Choose the best tool for your business needs
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mx-auto px-16 md:px-4">
        {tools.map((tool) => (
          <div
            key={tool.label}
            onClick={() => router.push(tool.href)}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-lg cursor-pointer"
          >
            <Image
              src={tool.icon}
              alt={tool.label}
              width={40}
              height={40}
              className="mx-auto mb-2"
            />
            <p className="text-sm font-medium">{tool.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
