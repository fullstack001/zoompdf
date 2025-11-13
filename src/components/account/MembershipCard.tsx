"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Loader2, CheckCircle2, Calendar, CreditCard } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function MembershipCard() {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const subscription = useSelector(
    (state: RootState) => state.user.subscription
  );
  const isSubscriptionValid =
    subscription && new Date(subscription.expiryDate) > new Date();

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      // Add your subscription logic here
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 mb-3 sm:mb-4 lg:mb-6">
        {t("account.membership")}
      </h2>

      {isSubscriptionValid ? (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 sm:p-6 lg:p-8 rounded-xl border border-green-200">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle2
                className="text-green-600 mt-1 flex-shrink-0"
                size={24}
              />
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                  {t("account.activeSubscription")}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  {t("account.subscriptionActive")}
                </p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 bg-white/60 rounded-lg p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <CreditCard className="text-gray-500 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">
                    {t("account.plan")}
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-gray-800">
                    {subscription.plan}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="text-gray-500 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">
                    {t("account.expiryDate")}
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-gray-800">
                    {formatDate(subscription.expiryDate)}
                  </p>
                </div>
              </div>

              {subscription.subscriptionType && (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">
                      {t("account.subscriptionType")}
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-gray-800">
                      {subscription.subscriptionType}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
            {t("account.noSubscription")}
          </p>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 rounded-xl border border-blue-200 text-center">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
              {t("account.unlockAllTools")}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              {t("account.fullAccess")} <br className="hidden sm:block" />
              <span className="sm:inline block mt-1 sm:mt-0">
                {t("account.subscribeNow")}
              </span>
            </p>
            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  {t("common.loading")}
                </>
              ) : (
                t("account.subscribe")
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
