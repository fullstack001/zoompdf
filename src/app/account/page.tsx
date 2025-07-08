"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SettingsSidebar from "@/components/account/SettingsSidebar";
import AccountDetails from "@/components/account/AccountDetails";
import PaymentMethod from "@/components/account/PaymentMethod";
import MembershipCard from "@/components/account/MembershipCard";

export default function AccountPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login());
  }, [dispatch]);

  return (
    <div className="bg-[#EDF0FF] min-h-screen">
      <Navbar />
      <div className="flex max-w-7xl mx-auto mt-8 gap-6 px-4 py-12">
        <SettingsSidebar />
        <div className="space-y-6 flex-1">
          <AccountDetails />
          <PaymentMethod />
          <MembershipCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}
