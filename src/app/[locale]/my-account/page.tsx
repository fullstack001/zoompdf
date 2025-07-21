"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import { Menu, X } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SettingsSidebar from "@/components/account/SettingsSidebar";
import AccountDetails from "@/components/account/AccountDetails";
import PaymentMethod from "@/components/account/PaymentMethod";
import MembershipCard from "@/components/account/MembershipCard";

export default function AccountPage() {
  const dispatch = useDispatch();
  const { email, cardnumber } = useSelector((state: RootState) => state.user);
  const contentRef = useRef<HTMLDivElement>(null);
  const membershipRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(login());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (membershipRef.current) {
        const membershipRect = membershipRef.current.getBoundingClientRect();
        const membershipTop = membershipRect.top;
        const membershipBottom = membershipRect.bottom;

        // Check if we're scrolling over the membership component
        // Remove fixed when the membership component enters the viewport from top
        // Add fixed when scrolling back up past the membership component
        if (membershipTop <= 120 && membershipBottom > 120) {
          // We're over the membership component
          setIsFixed(false);
        } else if (membershipTop > 120) {
          // We're above the membership component
          setIsFixed(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar");
      const toggle = document.getElementById("sidebar-toggle");

      if (
        isSidebarOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        toggle &&
        !toggle.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      // Responsive offset based on screen size
      const offset = window.innerWidth >= 1024 ? 130 : 100;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Close mobile sidebar after navigation
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-[#EDF0FF] min-h-screen">
      <Navbar />

      {/* Mobile Header with Menu Toggle */}
      <div className="lg:hidden sticky top-0 bg-white shadow-sm z-30 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">My Account</h1>
          <button
            id="sidebar-toggle"
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" />
      )}

      <div className="relative mx-auto px-4 lg:px-4 pt-6 pb-6">
        {/* Desktop Sidebar - Fixed/Absolute positioning */}
        <div
          className={`hidden lg:block left-4 xl:left-6 top-24 z-10 transition-all duration-200 ${
            isFixed ? "fixed" : "absolute"
          }`}
        >
          <SettingsSidebar onItemClick={scrollToSection} />
        </div>

        {/* Mobile Sidebar - Slide in from left */}
        <div
          id="mobile-sidebar"
          className={`lg:hidden fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 pt-20">
            <SettingsSidebar onItemClick={scrollToSection} />
          </div>
        </div>

        {/* Content with responsive margins */}
        <div className="lg:ml-72 xl:ml-80 lg:pl-8 space-y-4 sm:space-y-6">
          {/* Desktop Title */}
          <div className="hidden lg:block">
            <h1 className="text-2xl xl:text-3xl font-bold text-gray-800 mb-6">
              Account Settings
            </h1>
          </div>

          {/* Account Details Section */}
          <div id="account" className="scroll-mt-6">
            <AccountDetails email={email} />
          </div>

          {/* Payment Section */}
          <div id="payment" className="scroll-mt-6">
            <PaymentMethod cardnumber={cardnumber} />
          </div>

          {/* Membership Section */}
          <div id="membership" className="scroll-mt-6" ref={membershipRef}>
            <MembershipCard />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
