import Image from "next/image";

function FeatureItem({
  icon,
  text,
  description,
}: {
  icon: string;
  text: string;
  description: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:space-x-2 gap-3">
      <Image
        src={icon}
        alt={text}
        width={54}
        height={54}
        className="mx-auto mb-2 sm:mb-0 sm:w-[54px] sm:h-[54px]"
      />
      <div className="text-center sm:text-left">
        <div className="text-gray-700 sm:text-[18px] lg:text-[24px] font-semibold">
          {text}
        </div>
        <div className="text-gray-700 sm:text-[14px] lg:text-[18px] font-semibold">
          {description}
        </div>
      </div>
    </div>
  );
}

export default function FeatureItems() {
  return (
    <div className="mt-8 sm:mt-16 flex flex-col sm:flex-row justify-center sm:justify-start xl:justify-center flex-wrap gap-6">
      <FeatureItem
        icon="/assets/images/activity.png"
        text="Comprehensive Suite"
        description="Comprehensive suite of PDF management tools"
      />
      <FeatureItem
        icon="/assets/images/shield-done.png"
        text="Simple and safe"
        description="Simple and safe for use across all devices"
      />
      <FeatureItem
        icon="/assets/images/graph.png"
        text="Unlimited documents"
        description="No limits on the number of documents you can work with."
      />
    </div>
  );
}
