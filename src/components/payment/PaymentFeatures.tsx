import Image from "next/image";

const features = [
  "Unlimited downloads",
  "Convert and export PDFs",
  "Merge, split, and compress PDFs",
  "Unlimited cloud storage",
  "24/7 customer support",
];

const featureLeft = [
  {
    label: "Fill in, edit & Dave your PDFs",
    icon: "/assets/images/fill-in-edit-save-pdfs.png",
  },
  {
    label: "Comment, highlight & underline text",
    icon: "/assets/images/comment-highlight-underline-text.png",
  },
  {
    label: "Access your documents from any device",
    icon: "/assets/images/document-from-any-device.png",
  },
];

const featureRight = [
  {
    label: "Sign your docs online",
    icon: "/assets/images/sign-docs-online.png",
  },
  {
    label: "Use form templates",
    icon: "/assets/images/use-form-templates.png",
  },
  {
    label: "Add new fillable fields",
    icon: "/assets/images/add-new-fillable-fields.png",
  },
  {
    label: "Create your own forms",
    icon: "/assets/images/create-your-own-forms.png",
  },
];

export default function PaymentFeatures({
  selectedPlan,
}: {
  selectedPlan: string | null;
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow text-sm">
      <div className="flex flex-col justify-start ">
        {featureLeft.map((feature, i) => (
          <div
            key={i}
            className="flex justify-start items-center  cursor-pointer"
          >
            <div>
              <Image
                src={feature.icon}
                alt={feature.label}
                width={50}
                height={50}
                className="mx-auto "
              />
            </div>

            <div className="font-light text-[18px]">{feature.label}</div>
          </div>
        ))}
      </div>
      {selectedPlan !== "7_free" && (
        <div className="flex flex-col justify-start">
          {featureRight.map((feature, i) => (
            <div
              key={i}
              className={`flex justify-start items-center gap-2  cursor-pointer`}
            >
              <div>
                <Image
                  src={feature.icon}
                  alt={feature.label}
                  width={40}
                  height={30}
                  className={`mx-auto  ${
                    selectedPlan === "7_free" ? "opacity-30" : ""
                  }`}
                />
              </div>

              <div
                className={`font-light text-[18px] ${
                  selectedPlan === "7_free" ? "opacity-30 line-through" : ""
                }`}
              >
                {feature.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
