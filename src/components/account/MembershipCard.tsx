export default function MembershipCard() {
    return (
      <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-1">Membership</h2>
        <p className="text-sm text-gray-600 mb-4">You do not have a subscription.</p>
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-bold mb-2">Unlock all PDF tools!</h3>
          <p className="text-sm mb-4">
            Get full access to our advanced editing and converting features. <br />
            Subscribe now to streamline your document tasks
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </div>
    );
  }
  