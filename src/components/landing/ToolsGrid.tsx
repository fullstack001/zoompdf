"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import tools from "@/data/tools";

export default function ToolsGrid() {
  const router = useRouter();

  return (
    <section className=" p-8 md:p-24 text-center">
      <h2 className="text-[28px] md:text-[40px] text-[#212121] font-medium text-center mb-8 md:mb-12">
        Choose the best tool for your business needs
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mx-auto px-2 md:px-4">
        {tools.map((tool) => (
          <div
            key={tool.label}
            onClick={() => router.push(tool.href)}
            className="p-2 md:p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer"
          >
            <Image
              src={tool.icon}
              alt={tool.label}
              width={56}
              height={65}
              className="mx-auto mb-4"
            />
            <p className="text-[14px] md:text-[20px] font-semibold text-[#212121]">
              {tool.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
