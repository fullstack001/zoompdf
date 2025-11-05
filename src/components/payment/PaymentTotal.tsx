interface PaymentTotalProps {
  price: number;
  discount?: number;
  finalPrice: number;
}

export default function PaymentTotal({ price, discount = 0, finalPrice }: PaymentTotalProps) {
  return (
    <div className="bg-[#C9D2FF] rounded-xl p-4 shadow">
      {discount > 0 ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-gray-700">
            <p className="font-medium">Subtotal</p>
            <p className="font-medium">$ {price.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center text-green-700">
            <p className="font-medium">Discount</p>
            <p className="font-medium">- $ {discount.toFixed(2)}</p>
          </div>
          <hr className="border-gray-400" />
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg">Total Amount</p>
            <p className="text-xl font-bold">$ {finalPrice.toFixed(2)}</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p className="font-semibold">Total Amount</p>
          <p className="text-lg font-bold">$ {price.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
