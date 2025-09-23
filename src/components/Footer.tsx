"use client";
import {
  PaymentIcons,
  PolicyLinks,
  LanguageSelector,
  Copyright,
} from "./Footer/";

export default function Footer() {
  return (
    <footer className="bg-[#241F47] text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4">
          <div className="text-center space-y-3">
            <PolicyLinks />
            <LanguageSelector />
            <PaymentIcons />
            <Copyright />
          </div>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="hidden md:block items-center">
          <div className="flex items-center justify-between space-x-4">
            <Copyright />
            <PolicyLinks />
          </div>

          <div className="flex items-center justify-between space-x-6 mt-4">
            <PaymentIcons />
            <LanguageSelector />
          </div>
        </div>

       
      </div>
    </footer>
  );
}
