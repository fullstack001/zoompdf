"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getPaymentHistory, PaymentHistoryItem } from "@/utils/apiUtils";

interface PaymentMethodProps {
  cardnumber: string;
}

export default function PaymentMethod({ cardnumber }: PaymentMethodProps) {
  const t = useTranslations();
  const [payments, setPayments] = useState<PaymentHistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState("");

  useEffect(() => {
    const loadHistory = async () => {
      setIsLoadingHistory(true);
      setHistoryError("");
      try {
        const paymentHistory = await getPaymentHistory();
        setPayments(paymentHistory);
      } catch (error) {
        setHistoryError(
          error instanceof Error ? error.message : "Failed to load history."
        );
      } finally {
        setIsLoadingHistory(false);
      }
    };

    loadHistory();
  }, []);

  // Format card number for display (e.g., "1234" -> "**** **** **** 1234")
  const formatCardNumber = (cardNumber: string | undefined): string => {
    if (!cardNumber) {
      return t("account.notSpecified");
    }
    // If it's already formatted, return as is
    if (cardNumber.includes("*")) {
      return cardNumber;
    }
    // If it's just the last 4 digits, format it
    if (cardNumber.length === 4) {
      return `**** **** **** ${cardNumber}`;
    }
    // Otherwise return as is
    return cardNumber;
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 mb-3 sm:mb-4 lg:mb-6">
        {t("account.paymentMethod")}
      </h2>
      <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
        {t("account.saveTime")}
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            {t("account.cardNumber")}
          </label>
          <input
            type="text"
            disabled
            value={formatCardNumber(cardnumber)}
            className="w-full p-3 sm:p-4 rounded-lg bg-gray-50 border border-gray-300 text-sm sm:text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="mt-6 sm:mt-8">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
            Payment History
          </h3>
          {isLoadingHistory && (
            <p className="text-sm text-gray-600 mb-3">Loading payment history...</p>
          )}
          {historyError && (
            <p className="text-sm text-red-600 mb-3">{historyError}</p>
          )}
          {!isLoadingHistory && !historyError && payments.length === 0 && (
            <p className="text-sm text-gray-600 mb-3">No payment history yet.</p>
          )}
          {!isLoadingHistory && !historyError && payments.length > 0 && (
            <div className="space-y-2 mb-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="p-3 rounded-lg border border-gray-200 bg-gray-50"
                >
                  <p className="text-sm font-medium text-gray-800">
                    {new Date(payment.date * 1000).toLocaleDateString()} -{" "}
                    {(payment.amount / 100).toFixed(2)}{" "}
                    {payment.currency.toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-600">{payment.description}</p>
                  <p className="text-xs text-gray-600">Status: {payment.status}</p>
                  {payment.hostedInvoiceUrl && (
                    <a
                      href={payment.hostedInvoiceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-600 underline"
                    >
                      View invoice
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
            {t("account.importantUpdates")}
          </p>
        </div>
      </div>
    </div>
  );
}
