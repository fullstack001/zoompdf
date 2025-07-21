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
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12 lg:py-16">
          {/* Mobile Layout - Stacked vertically */}
          <div className="lg:hidden space-y-8">
            {/* Company Info & Newsletter on mobile */}
            <div className="text-center space-y-6">
              <CompanyInfo />
              <Newsletter />
              <SocialMedia />
              <LanguageSelector />
            </div>

            {/* Footer Links on mobile */}
            <div>
              <FooterLinks />
            </div>
          </div>

          {/* Desktop Layout - FooterLinks first, then inline components */}
          <div className="hidden lg:block">
            {/* Footer Links - Full width on desktop */}
            <div className="mb-12">
              <FooterLinks />
            </div>

            {/* Inline components below FooterLinks on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <CompanyInfo />
              </div>

              {/* Newsletter */}
              <div className="space-y-4">
                <Newsletter />
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <SocialMedia />
              </div>

              {/* Language Selector */}
              <div className="space-y-4">
                <LanguageSelector />
              </div>
            </div>
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
