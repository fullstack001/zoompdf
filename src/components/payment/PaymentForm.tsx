"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { setUser } from "../../store/slices/userSlice";
import { login } from "../../store/slices/authSlice";
import { RootState } from "../../store/store"; // Import RootState
import { downloadFile } from "../../utils/apiUtils"; // Import downloadFile utility

import CheckoutForm from "./CheckoutForm";

interface SubscriptionData {
  email: string;
  plan: string;
  subscriptionId: string;
  subscriptionType: string;
}

interface ApiResponse {
  token: string;
  user: Record<string, unknown>;
  subscription: Record<string, unknown>;
}

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export default function PaymentForm({
  plan,
  email,
}: {
  plan: { id: string; price: number; priceId: string };
  email: string;
}) {
  const dispatch = useDispatch();

  // Retrieve fileName and action from Redux store
  const fileName = useSelector((state: RootState) => state.flow.fileName);
  const action = useSelector((state: RootState) => state.flow.action);
  const router = useRouter();
  const handlePurchaseSubscription = (
    subscriptionType: string,
    subscriptionId: string
  ): void => {
    const subscriptionData: SubscriptionData = {
      email: email,
      plan: plan.id,
      subscriptionId,
      subscriptionType,
    };

    fetch(`https://api.pdfezy.com/api/subscription/add-subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriptionData),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: ApiResponse = await response.json();
        const { token, user, subscription } = data;
        dispatch(
          setUser({
            name: user.name as string,
            email: user.email as string,
            subscription: subscription
              ? {
                  subscriptionId: subscription.subscriptionId as string,
                  plan: subscription.plan as string,
                  subscriptionType: subscription.subscriptionType as string,
                  subscribedDate: subscription.subscribedDate as string,
                  expiryDate: subscription.expiryDate as string,
                }
              : null,
            id: user.id as string,
            avatar: user.avatar as string,
            isAdmin: user.isAdmin as boolean,
          })
        );
        dispatch(login());
        localStorage.setItem("authToken", token as string);

        // Use downloadFile utility function
        if (fileName && action) {
          downloadFile(fileName, action, token, router);
        } else {
          console.error("fileName or action is null");
        }
      })
      .catch(() => {
        console.log("network error");
      });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-xl">Total Due Amount</h2>
        <span className="font-semibold">$ {plan.price}</span>
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
        <Elements stripe={stripePromise}>
          <CheckoutForm
            priceId={plan.priceId}
            callBack={handlePurchaseSubscription}
          />
        </Elements>
      </div>
    </div>
  );
}
