import Image from "next/image";

export default function ProgressModal({
  progress,
  status,
}: {
  progress: number;
  status: string[];
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md text-center">
        <Image
          src="/assets/loading-conversion.svg"
          alt="Converting"
          width={290}
          height={80}
          className="mx-auto mb-4"
        />
        <h1 className="text-xl font-bold mb-2">Conversion in progress...</h1>
        <p className="text-lg text-gray-500 mb-2">{progress}%</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <ul className="mt-2 text-lg text-gray-700 text-left">
          {status.map((step, index) => (
            <li key={index} className="flex items-center gap-2 mb-3">
              <span className="text-green-500">✔</span> {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
