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
  Globe,
} from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/slices/authSlice";
import { useTranslations } from "next-intl";
import { useLocalizedNavigation } from "../utils/navigation";
import { locales } from "../i18n/config";

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.user);
  const t = useTranslations();
  const { navigate, switchLocale, currentLocale } = useLocalizedNavigation();

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const toggleDropdown = (label: string) =>
    setOpenDropdown(openDropdown === label ? null : label);

  return (
    <header className="bg-[#edf0ff] sticky rounded-xl  top-0 z-50 p-4">
      <div className="mx-auto flex bg-gray-50 sticky rounded-xl items-center justify-between px-8 py-3">
        <div
          onClick={() => navigate("/")}
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
            label={t("navigation.pdfConverter")}
            icon={<ArrowRightSquare size={24} className="mr-2" />}
          >
            <MenuCategory
              title={t("navbar.convertFromPdf")}
              items={[
                { label: t("tools.pdfToWord"), route: "/pdf-to-word" },
                { label: t("tools.pdfToPptx"), route: "/pdf-to-pptx" },
                { label: t("tools.pdfToExcel"), route: "/pdf-to-excel" },
                { label: t("tools.pdfToJpg"), route: "/pdf-to-jpg" },
                { label: t("tools.pdfToPng"), route: "/pdf-to-png" },
              ]}
            />
            <MenuCategory
              title={t("navbar.convertToPdf")}
              items={[
                { label: t("tools.wordToPdf"), route: "/word-to-pdf" },
                { label: t("tools.pptxToPdf"), route: "/pptx-to-pdf" },
                { label: t("tools.excelToPdf"), route: "/excel-to-pdf" },
                { label: t("tools.jpgToPdf"), route: "/jpg-to-pdf" },
                { label: t("tools.pngToPdf"), route: "/png-to-pdf" },
              ]}
            />
          </Dropdown>

          <Dropdown
            label={t("navigation.pdfEditor")}
            icon={<SquarePen size={24} className="mr-2" />}
          >
            <MenuCategory
              title={t("navbar.editingTools")}
              items={[
                { label: t("tools.editPdf"), route: "/edit-pdf" },
                { label: t("tools.mergePdf"), route: "/merge-pdf" },
                { label: t("tools.splitPdf"), route: "/split-pdf" },
                { label: t("tools.compressPdf"), route: "/compress-pdf" },
              ]}
            />
          </Dropdown>

          <Dropdown
            label={t("navigation.forms")}
            icon={<SlidersHorizontal size={24} className="mr-2" />}
          >
            <MenuCategory
              title={t("navbar.formTools")}
              items={[
                { label: t("tools.signPdf"), route: "/sign-pdf" },
                { label: t("tools.fillPdf"), route: "/fill-pdf" },
                { label: t("tools.createForm"), route: "/create-form" },
              ]}
            />
          </Dropdown>
        </nav>

        {/* Desktop Log in and Language Switcher */}
        <div className="relative hidden xl:flex items-center gap-4">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-blue-600 rounded-lg hover:bg-gray-100"
            >
              <Globe size={16} />
              <span className="uppercase">{currentLocale}</span>
              <ChevronDownIcon size={14} />
            </button>
            {languageDropdownOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-32 bg-white shadow-xl rounded-xl p-2 z-50"
                onMouseLeave={() => setLanguageDropdownOpen(false)}
              >
                {locales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => {
                      switchLocale(locale);
                      setLanguageDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 ${
                      locale === currentLocale
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {t(`languages.${locale}`)}
                  </button>
                ))}
              </div>
            )}
          </div>

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
                        {user.email || t("navbar.profileDetails")}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.subscription?.plan || t("navbar.noSubscription")}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/upgrade-plan")}
                    className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-semibold mb-4"
                  >
                    {t("navbar.upgradePlan")}
                  </button>

                  <ul className="space-y-3 text-sm text-gray-700">
                    <li
                      onClick={() => navigate("/files")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <MenuIcon size={16} /> {t("navbar.myDocuments")}
                    </li>
                    <li
                      onClick={() => navigate("/my-account")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <UserIcon size={16} /> {t("navbar.myAccount")}
                    </li>
                    <li
                      onClick={() => navigate("/help")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <LockIcon size={16} /> {t("navbar.help")}
                    </li>
                    <li
                      onClick={() => navigate("/terms")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <InfoIcon size={16} /> {t("navbar.termsConditions")}
                    </li>
                    <li
                      onClick={() => navigate("/settings")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <SettingsIcon size={16} /> {t("navbar.settings")}
                    </li>
                    <li
                      onClick={() => {
                        dispatch(logout());
                        navigate("/");
                      }}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <XIcon size={16} /> {t("navbar.logOut")}
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-3 text-2xl bg-white border-2 text-[#3758F9] border-[#3758F9] rounded-xl flex items-center"
            >
              <LockIcon size={14} />
              <span className="ml-1  font-medium">{t("auth.signIn")}</span>
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
                label={t("navigation.pdfEditor")}
                items={[
                  { label: t("tools.editPdf"), route: "/edit-pdf" },
                  { label: t("tools.signPdf"), route: "/sign-pdf" },
                  { label: t("tools.addWatermark"), route: "/add-watermark" },
                  { label: t("tools.rotatePdf"), route: "/rotate-pdf" },
                  { label: t("tools.mergePdf"), route: "/merge-pdf" },
                  { label: t("tools.splitPdf"), route: "/split-pdf" },
                  { label: t("tools.deletePages"), route: "/delete-pages" },
                  { label: t("tools.compressPdf"), route: "/compress-pdf" },
                  { label: t("tools.cropPdf"), route: "/crop-pdf" },
                ]}
                open={openDropdown === t("navigation.pdfEditor")}
                onToggle={() => toggleDropdown(t("navigation.pdfEditor"))}
              />
              <MobileMenuItem
                label={t("navigation.pdfConverter")}
                items={[
                  { label: t("tools.pdfToWord"), route: "/pdf-to-word" },
                  { label: t("tools.wordToPdf"), route: "/word-to-pdf" },
                ]}
                open={openDropdown === t("navigation.pdfConverter")}
                onToggle={() => toggleDropdown(t("navigation.pdfConverter"))}
              />
              <MobileMenuItem
                label={t("navigation.forms")}
                items={[
                  { label: t("tools.signPdf"), route: "/sign-pdf" },
                  { label: t("tools.fillForm"), route: "/fill-form" },
                ]}
                open={openDropdown === t("navigation.forms")}
                onToggle={() => toggleDropdown(t("navigation.forms"))}
              />
              {/* Language Switcher for Mobile */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  {t("navigation.language")}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {locales.map((locale) => (
                    <button
                      key={locale}
                      onClick={() => {
                        switchLocale(locale);
                        setMobileOpen(false);
                      }}
                      className={`px-3 py-2 text-sm rounded-lg border ${
                        locale === currentLocale
                          ? "bg-blue-50 text-blue-600 border-blue-200"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {t(`languages.${locale}`)}
                    </button>
                  ))}
                </div>
              </div>

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
                        {user.email || t("navbar.profileDetails")}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.subscription?.plan || t("navbar.noSubscription")}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/upgrade-plan")}
                    className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-semibold"
                  >
                    {t("navbar.upgradePlan")}
                  </button>

                  <ul className="space-y-3 mt-3">
                    <li
                      onClick={() => navigate("/files")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <MenuIcon size={16} /> {t("navbar.myDocuments")}
                    </li>
                    <li
                      onClick={() => navigate("/my-account")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <UserIcon size={16} /> {t("navbar.myAccount")}
                    </li>
                    <li
                      onClick={() => navigate("/help")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <LockIcon size={16} /> {t("navbar.help")}
                    </li>
                    <li
                      onClick={() => navigate("/terms")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <InfoIcon size={16} /> {t("navbar.termsConditions")}
                    </li>
                    <li
                      onClick={() => navigate("/settings")}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <SettingsIcon size={16} /> {t("navbar.settings")}
                    </li>
                    <li
                      onClick={() => {
                        dispatch(logout());
                        navigate("/");
                      }}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <XIcon size={16} /> {t("navbar.logOut")}
                    </li>
                  </ul>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-md bg-white border-2 text-[#3758F9] border-[#3758F9] rounded-xl flex items-center"
                >
                  <LockIcon size={14} />
                  <span className="ml-1  font-medium">{t("auth.signIn")}</span>
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
  const { navigate } = useLocalizedNavigation();
  return (
    <div className="gap-8 w-max">
      <p className="font-medium text-[20px] mb-4 text-gray-700">{title}</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.route}
            onClick={() => navigate(item.route)}
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
  const { navigate } = useLocalizedNavigation();
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
              onClick={() => navigate(item.route)}
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
