import Image from "next/image";
import Link from "next/link";

export default function FileUpgradeCard() {
  return (
    <div className="bg-white rounded-xl p-6  shadow">
      <div className="border-[#757575] border-[1px] border-dashed flex justify-between items-center p-6 rounded-xl ">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Experience the best of PDF Guru — go premium!
          </h3>
          <Link href="/plan">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg mt-2 font-semibold text-sm">
              Upgrade Plan
            </button>
          </Link>
        </div>
        <Image
          src="/assets/images/feature-cta.png"
          width={160}
          height={0}
          style={{ height: "auto" }}
          alt="Upgrade"
        />
      </div>
    </div>
  );
}
