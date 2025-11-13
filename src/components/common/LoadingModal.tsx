import { Loader2 } from "lucide-react";

export default function LoadingModal({
  title,
  message,
}: {
  title: string;
  message?: string;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Loader2 className="animate-spin text-blue-600" size={64} />
        </div>
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        {message && <p className="text-lg text-gray-500">{message}</p>}
      </div>
    </div>
  );
}

