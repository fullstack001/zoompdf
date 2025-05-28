import Image from "next/image";

export default function PaymentForm() {
    const handleFileList = () => {
        window.location.href = "/files";
      };
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-xl">Total Due Amount</h2>
        <span className="font-semibold">$1.95</span>
      </div>

      <hr className="mb-4" />

      <div className="mb-4">
        <p className="font-semibold mb-2">Express checkout</p>
        <div className="flex gap-2">
          <button className="rounded">
            <Image
              src="/assets/images/paypal.png"
              width={200}
              height={80}
              alt="paypal"
            ></Image>
          </button>
          <button className="rounded">
            <Image
              src="/assets/images/apple-pay.png"
              width={200}
              height={80}
              alt="apple-pay"
            ></Image>
          </button>
          <button className=" rounded ">
            <Image
              src="/assets/images/gpay.png"
              width={200}
              height={80}
              alt="gpay"
            ></Image>
          </button>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-semibold mb-4">Pay with card</p>
        <div className="flex justify-between gap-2 mb-2">
          <p className="text-sm ">Card Number</p>
        </div>
        <input
          placeholder="0000 0000 0000 0000"
          className="w-full border px-4 py-2 rounded-lg mb-2"
        />

        <div className="flex gap-2 mt-6">
          <div className="w-1/2 mb-2">
            <p className="text-sm  mb-2">Expiry Date</p>
            <input
              placeholder="MM/YY"
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>
          <div className=" w-1/2 mb-2">
            <p className="text-sm  mb-2">Security Code</p>
            <input
              placeholder="••••"
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>
        </div>
        <div className="mt-6">
          <p className="text-sm  mb-2">Cardholder's name</p>
          <input
            placeholder="Full name as on card"
            className="w-full border px-4 py-2 rounded-lg mb-4"
          />
        </div>

        <button className="bg-[#4B68FF] text-white w-full py-2 rounded-lg font-semibold" onClick={handleFileList}>
          Pay and Download The File
        </button>
      </div>
    </div>
  );
}
