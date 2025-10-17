import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function FileUpgradeCard() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="bg-white rounded-xl p-6  shadow">
      <div className="border-[#757575] border-[1px] border-dashed flex justify-between items-center p-6 rounded-xl ">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Experience the best of PDF Guru — go premium!
          </h3>
          <Link href="/plan" onClick={() => setIsLoading(true)}>
            <button
              disabled={isLoading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg mt-2 font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Loading...
                </>
              ) : (
                "Upgrade Plan"
              )}
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
