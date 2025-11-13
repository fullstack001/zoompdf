import { Loader2 } from "lucide-react";

export default function DownloadModal({
  isVisible,
}: {
  isVisible: boolean;
  progress?: number;
}) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Loader2 className="animate-spin text-blue-600" size={64} />
        </div>
        <h1 className="text-xl font-bold mb-2">Downloading your file...</h1>
        <p className="text-sm text-gray-500">Please wait...</p>
      </div>
    </div>
  );
}
