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
    <div className="flex items-center space-x-2 gap-3">
      <Image
        src={icon}
        alt={text}
        width={25}
        height={25}
        className="mx-auto mb-2"
      />
      <div className="text-left">
        <div className="text-gray-700 text-xl font-bold">{text}</div>
        <div>{description}</div>
      </div>
    </div>
  );
}

export default function FeatureItems() {
  return (
    <div className="mt-8 flex justify-center flex-wrap gap-6">
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
