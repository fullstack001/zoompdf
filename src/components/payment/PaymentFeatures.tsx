import Image from "next/image";
const features = [
  {
    label: "Unlimited edits",
    icon: "/assets/images/unlimited-edits.png",
  },
  {
    label: "Unlimited downloads",
    icon: "/assets/images/unlimited-downloads.png",
  },
  {
    label: "Convert to any format (Word, .docx, .doc, jpg, Excel)",
    icon: "/assets/images/convert-to-any-format.png",
  },
  {
    label: "Sign your docs online",
    icon: "/assets/images/sign-your-docs-online.png",
  },
  {
    label: "Create your own forms",
    icon: "/assets/images/create-your-own-forms-1.png",
  },
];

export default function PaymentFeatures() {
  return (
    <div className="bg-white rounded-xl p-4 shadow text-sm">
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <div key={i} className="flex justify-start gap-2 cursor-pointer mb-4">
            <div className="w-[40px]">
              <Image
                src={feature.icon}
                alt={feature.label}
                width={40}
                height={30}
                className="mx-auto "
              />
            </div>

            <div
              style={{ width: "calc(100% - 40px)" }}
              className="font-thin text-[16px] flex items-center"
            >
              {feature.label}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
