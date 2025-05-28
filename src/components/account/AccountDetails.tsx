export default function AccountDetails() {
    return (
      <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-1">Account</h2>
        <p className="text-sm text-gray-600 mb-4">
          Have a better experience on PDF House by keeping your information up-to-date.
        </p>
        <label className="block text-sm font-medium mb-1">Email address</label>
        <input
          type="email"
          disabled
          defaultValue="email@domain.com"
          className="w-full p-2 rounded bg-white border text-sm text-gray-500"
        />
        <p className="text-xs text-gray-500 mt-2">
          You will receive important product updates and essential account notifications, including payment receipts.
        </p>
      </div>
    );
  }
  