"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/store/slices/userSlice";
import { login, logout } from "@/store/slices/authSlice";
import { useLocalizedNavigation } from "@/utils/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface UserState {
  id: string;
  name: string;
  email: string;
  cardnumber: string;
  avatar: string;
  isAdmin: boolean;
  subscription: {
    subscriptionId: string;
    plan: string;
    subscriptionType: string;
    subscribedDate: string;
    expiryDate: string;
  } | null;
}

export default function SuccessEditPage() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { navigate } = useLocalizedNavigation();
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(true);
  const [fileId, setFileId] = useState<string | null>(null);

  useEffect(() => {
    // Get file ID from URL parameters
    const file = searchParams.get("file");
    if (file) {
      setFileId(file);
    }

    // Restore user state from localStorage
    const restoreUserState = () => {
      try {
        // Restore auth state
        const authToken = localStorage.getItem("authToken");
        const isLoggedIn = !!authToken;

        if (isLoggedIn) {
          dispatch(login());
        } else {
          dispatch(logout());
        }

        // Restore user data from temporary storage first, then from regular storage
        const tempUserData = localStorage.getItem("tempUserData");
        const savedUserData = localStorage.getItem("userData");

        if (tempUserData) {
          const userData: UserState = JSON.parse(tempUserData);
          dispatch(setUser(userData));
          // Also save to regular storage for future use
          localStorage.setItem("userData", tempUserData);
        } else if (savedUserData) {
          const userData: UserState = JSON.parse(savedUserData);
          dispatch(setUser(userData));
        }

        // Clean up temporary storage
        localStorage.removeItem("tempUserData");
        localStorage.removeItem("tempAuthState");
        localStorage.removeItem("tempAuthToken");

        setIsLoading(false);
      } catch (error) {
        console.error("Error restoring user state:", error);
        setIsLoading(false);
      }
    };

    restoreUserState();
  }, [dispatch, searchParams]);

  const handleDownload = () => {
    if (fileId) {
      // Redirect to download the edited file
      window.open(
        `https://api.pdfezy.com/api/pdf/download/${fileId}`,
        "_blank"
      );
    }
  };

  const handleNewEdit = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Restoring your session...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <section className="py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <Image
              src="/assets/images/shield-done.png"
              alt="Success"
              width={120}
              height={120}
              className="mx-auto mb-6"
            />
            <h1 className="text-4xl lg:text-5xl font-bold text-green-600 mb-4">
              {t("common.editSuccess")}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t("common.editSuccessMessage")}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {t("common.whatsNext")}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700 font-medium">
                  {t("common.downloadEditedFile")}
                </span>
                <button
                  onClick={handleDownload}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {t("common.download")}
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700 font-medium">
                  {t("common.editAnotherFile")}
                </span>
                <button
                  onClick={handleNewEdit}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  {t("common.startNew")}
                </button>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>
              {t("common.fileId")}: {fileId}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
