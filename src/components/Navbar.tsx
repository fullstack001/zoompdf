"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  ChevronDownIcon,
  LockIcon,
  MenuIcon,
  UserIcon,
  XIcon,
  InfoIcon,
  ArrowRightSquare,
  SquarePen,
  SlidersHorizontal,
  SettingsIcon,
} from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/slices/authSlice";

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.user);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const toggleDropdown = (label: string) =>
    setOpenDropdown(openDropdown === label ? null : label);

  return (
    <header className="bg-[#edf0ff] sticky rounded-xl  top-0 z-50 p-4">
      <div className="mx-auto flex bg-gray-50 sticky rounded-xl items-center justify-between px-8 py-3">
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image
            src="/assets/images/logo.svg"
            alt="ZoomPDF"
            width={170}
            height={56}
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex gap-6 text-sm font-medium">
          <Dropdown
            label="PDF CONVERTER"
            icon={<ArrowRightSquare size={24} className="mr-2" />}
          >
            <MenuCategory
              title="Convert from PDF"
              items={[
                { label: "PDF to Word", route: "/pdf-to-word" },
                { label: "PDF to PPTX", route: "/pdf-to-pptx" },
                { label: "PDF to Excel", route: "/pdf-to-excel" },
                { label: "PDF to JPG", route: "/pdf-to-jpg" },
                { label: "PDF to PNG", route: "/pdf-to-png" },
              ]}
            />
            <MenuCategory
              title="Convert to PDF"
              items={[
                { label: "Word to PDF", route: "/word-to-pdf" },
                { label: "PPTX to PDF", route: "/pptx-to-pdf" },
                { label: "Excel to PDF", route: "/excel-to-pdf" },
                { label: "JPG to PDF", route: "/jpg-to-pdf" },
                { label: "PNG to PDF", route: "/png-to-pdf" },
              ]}
            />
          </Dropdown>

          <Dropdown
            label="PDF EDITOR"
            icon={<SquarePen size={24} className="mr-2" />}
          >
            <MenuCategory
              title="Editing Tools"
              items={[
                { label: "Edit PDF", route: "/edit-pdf" },
                { label: "Merge PDF", route: "/merge-pdf" },
                { label: "Split PDF", route: "/split-pdf" },
                { label: "Compress PDF", route: "/compress-pdf" },
              ]}
            />
          </Dropdown>

          <Dropdown
            label="FORMS"
            icon={<SlidersHorizontal size={24} className="mr-2" />}
          >
            <MenuCategory
              title="Form Tools"
              items={[
                { label: "Sign PDF", route: "/sign-pdf" },
                { label: "Fill PDF", route: "/fill-pdf" },
                { label: "Create Form", route: "/create-form" },
              ]}
            />
          </Dropdown>
        </nav>

        {/* Desktop Log in */}
        <div className="relative hidden xl:flex items-center">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="bg-blue-600 text-white rounded-full p-2"
              >
                <UserIcon size={18} />
              </button>
              {userDropdownOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-64 bg-white shadow-xl rounded-xl p-4 z-50"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src={user.avatar || "/assets/images/profile.jpg"}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {user.email || "Profile Details"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.subscription?.plan || "No subscription"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push("/upgrade-plan")}
                    className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-semibold mb-4"
                  >
                    Upgrade Plan
                  </button>

                  <ul className="space-y-3 text-sm text-gray-700">
                    <li
                      onClick={() => router.push("/files")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <MenuIcon size={16} /> My Documents
                    </li>
                    <li
                      onClick={() => router.push("/my-account")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <UserIcon size={16} /> My Account
                    </li>
                    <li
                      onClick={() => router.push("/help")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <LockIcon size={16} /> Help
                    </li>
                    <li
                      onClick={() => router.push("/terms")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <InfoIcon size={16} /> Terms & Conditions
                    </li>
                    <li
                      onClick={() => router.push("/settings")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <SettingsIcon size={16} /> Settings
                    </li>
                    <li
                      onClick={() => dispatch(logout())}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <XIcon size={16} /> Log Out
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-3 text-2xl bg-white border-2 text-[#3758F9] border-[#3758F9] rounded-xl flex items-center"
            >
              <LockIcon size={14} />
              <span className="ml-1  font-medium">Log in</span>
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:block xl:hidden ">
          <button onClick={toggleMobile} className="xl:hidden">
            {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
          {mobileOpen && (
            <div className="bg-white px-6 py-4 shadow-inner absolute top-20 left-0 w-full">
              <MobileMenuItem
                label="PDF EDITOR"
                items={[
                  { label: "Edit PDF", route: "/edit-pdf" },
                  { label: "Sign PDF", route: "/sign-pdf" },
                  { label: "Add watermark", route: "/add-watermark" },
                  { label: "Rotate PDF", route: "/rotate-pdf" },
                  { label: "Merge PDF", route: "/merge-pdf" },
                  { label: "Split PDF", route: "/split-pdf" },
                  { label: "Delete pages", route: "/delete-pages" },
                  { label: "Compress PDF", route: "/compress-pdf" },
                  { label: "Crop PDF", route: "/crop-pdf" },
                ]}
                open={openDropdown === "PDF EDITOR"}
                onToggle={() => toggleDropdown("PDF EDITOR")}
              />
              <MobileMenuItem
                label="PDF CONVERTER"
                items={[
                  { label: "PDF to Word", route: "/pdf-to-word" },
                  { label: "Word to PDF", route: "/word-to-pdf" },
                ]}
                open={openDropdown === "PDF CONVERTER"}
                onToggle={() => toggleDropdown("PDF CONVERTER")}
              />
              <MobileMenuItem
                label="FORMS"
                items={[
                  { label: "Sign PDF", route: "/sign-pdf" },
                  { label: "Fill Form", route: "/fill-form" },
                ]}
                open={openDropdown === "FORMS"}
                onToggle={() => toggleDropdown("FORMS")}
              />
              <hr className="my-4" />
              {isLoggedIn ? (
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src={user.avatar || "/assets/images/profile.jpg"}
                      alt="User"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {user.email || "Profile Details"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.subscription?.plan || "No subscription"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push("/upgrade-plan")}
                    className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-semibold"
                  >
                    Upgrade Plan
                  </button>

                  <ul className="space-y-3 mt-3">
                    <li
                      onClick={() => router.push("/files")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <MenuIcon size={16} /> My Documents
                    </li>
                    <li
                      onClick={() => router.push("/my-account")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <UserIcon size={16} /> My Account
                    </li>
                    <li
                      onClick={() => router.push("/help")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <LockIcon size={16} /> Help
                    </li>
                    <li
                      onClick={() => router.push("/terms")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <InfoIcon size={16} /> Terms & Conditions
                    </li>
                    <li
                      onClick={() => router.push("/settings")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <SettingsIcon size={16} /> Settings
                    </li>
                    <li
                      onClick={() => dispatch(logout())}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <XIcon size={16} /> Log Out
                    </li>
                  </ul>
                </div>
              ):
               (
                <button
                  onClick={() => router.push("/login")}
                  className="px-4 py-2 text-md bg-white border-2 text-[#3758F9] border-[#3758F9] rounded-xl flex items-center"
                >
                  <LockIcon size={14} />
                  <span className="ml-1  font-medium">Log in</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// Dropdown component
function Dropdown({
  label,
  icon,
  children,
}: {
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setOpen(!open);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative mr-6" ref={dropdownRef}>
      <button
        className="flex items-center text-2xl font-semibold gap-1 hover:text-blue-600"
        onClick={handleToggle}
      >
        {icon}
        {label} <ChevronDownIcon size={14} />
      </button>
      {open && (
        <div
          className={`absolute top-full mt-2 ${
            React.Children.count(children) === 2
              ? "min-w-[430px] -left-20"
              : "min-w-[200px]"
          } bg-white shadow-lg rounded-xl p-8 grid grid-cols-2 gap-8`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// Menu category for dropdown
function MenuCategory({
  title,
  items,
}: {
  title: string;
  items: { label: string; route: string }[]; 
}) {
  const router = useRouter();
  return (
    <div className="gap-8 w-max">
      <p className="font-medium text-[20px] mb-4 text-gray-700">{title}</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.route}
            onClick={() => router.push(item.route)}
            className="text-[16px] text-gray-600 pb-4 hover:text-blue-600 cursor-pointer"
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Mobile menu item
function MobileMenuItem({
  label,
  items,
  open,
  onToggle,
}: {
  label: string;
  items: { label: string; route: string }[];
  open: boolean;
  onToggle: () => void;
}) {
  const router = useRouter();
  return (
    <div className="mb-3">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full text-left text-sm font-semibold text-gray-800"
      >
        {label}
        <ChevronDownIcon
          className={`transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
          size={16}
        />
      </button>
      {open && (
        <ul className="mt-2 pl-4 space-y-1">
          {items.map((item) => (
            <li
              key={item.route}
              onClick={() => router.push(item.route)}
              className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
