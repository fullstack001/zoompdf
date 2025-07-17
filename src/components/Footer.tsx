"use client";
import {
  CompanyInfo,
  Newsletter,
  SocialMedia,
  LanguageSelector,
  FooterLinks,
  ContactInfo,
  FooterBottom,
} from "./Footer/";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12 lg:py-16">
          {/* Unified Layout - All devices with responsive grid */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Company Info & Newsletter - Takes 2 columns on desktop */}
            <div className="lg:col-span-2 text-center sm:text-left lg:text-left space-y-6">
              {/* Logo & Company Description */}
              <CompanyInfo />

              {/* Newsletter Signup */}
              <Newsletter />

              {/* Social Media Links */}
              <SocialMedia />

              {/* Language Selector Button */}
              <LanguageSelector />
            </div>

            {/* Footer Links with Dropdowns - All devices */}
            <FooterLinks />
          </div>
        </div>

        {/* Contact Information */}
        <ContactInfo />

        {/* Bottom Section */}
        <FooterBottom />
      </div>
    </footer>
  );
}
