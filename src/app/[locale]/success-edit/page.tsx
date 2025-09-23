"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "@/store/slices/userSlice";
import { login, logout } from "@/store/slices/authSlice";
import { setAction, setFileName } from "@/store/slices/flowSlice";
import { useLocalizedNavigation } from "@/utils/navigation";
import { downloadFile } from "@/utils/apiUtils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmailModal from "@/components/common/EmailModal";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { RootState } from "@/store/store";

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
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Redux selectors
  const subscription = useSelector(
    (state: RootState) => state.user.subscription
  );
  const auth = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.user);

  // Function to fetch file data from backend
  const fetchFileData = async (processingId: string) => {
    try {
      const response = await fetch(
        `https://api.pdfezy.com/api/pdf/get-processing-file/${processingId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch file data: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      console.error("Error fetching file data:", error);
      setError("Failed to load file information");
      return null;
    }
  };

  useEffect(() => {
    // Get file ID from URL parameters
    const file = searchParams.get("file");
    if (file) {
      setFileId(file);
    }

    // Restore user state from localStorage
    const restoreUserState = async () => {
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

        // Fetch file data if we have a file ID
        if (file) {
          const data = await fetchFileData(file);
          if (data && data.completedFile) {
            handleAutoFlow(data);
          } else {
            setError("No completed file found");
          }
        } else {
          setError("No file ID provided");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error restoring user state:", error);
        setIsLoading(false);
      }
    };

    restoreUserState();
  }, [dispatch, searchParams]);

  // Auto-handle the flow based on authentication status
  const handleAutoFlow = async (data: any) => {
    dispatch(setFileName(data.completedFile));
    dispatch(setAction(data.action || "edit"));
    console.log("data", data);
    console.log("handleAutoFlow called with data:", data);
    console.log("Auth status:", auth);
    console.log("User:", user);
    console.log("Subscription:", subscription);

    if (!data?.completedFile) {
      console.log("No completed file found in data");
      setError("No completed file available");
      return;
    }

    // Flow state is already updated in the useEffect above
    // This ensures Redux store always has the file information
    console.log(
      "Flow state updated with file:",
      data.completedFile,
      "action:",
      data.action || "edit"
    );

    try {
      if (!auth) {
        console.log("User not authenticated, showing email modal");
        // User not signed in - show email modal
        // Flow state is already set, so user can proceed after authentication
        setEmailModalVisible(true);
        return;
      }

      const token = localStorage.getItem("authToken");
      if (!token) {
        console.log("No auth token found, showing email modal");
        setEmailModalVisible(true);
        return;
      }

      if (
        subscription &&
        new Date(subscription.expiryDate) > new Date() &&
        token
      ) {
        console.log("User has valid subscription, downloading file");
        // User has valid subscription - download and go to files
        try {
          await downloadFile(
            data.completedFile,
            data.action || "edit",
            token,
            user.id
          );
          console.log("File downloaded successfully, navigating to files");
          navigate("/files");
        } catch (err) {
          console.error("Error downloading file:", err);
          setError("Failed to download file. Please try again.");
        }
      } else {
        console.log("User doesn't have valid subscription, navigating to plan");
        // User doesn't have subscription - go to plan
        navigate("/plan");
      }
    } catch (error) {
      console.error("Error handling auto flow:", error);
      setError("An error occurred while processing your request.");
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Processing your file...</p>
            </>
          ) : error ? (
            <>
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Try Again
              </button>
            </>
          ) : (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Redirecting...</p>
            </>
          )}
        </div>
      </div>

      {/* Email Modal */}
      <EmailModal
        isVisible={isEmailModalVisible}
        email={email}
        onEmailChange={setEmail}
        onClose={() => setEmailModalVisible(false)}
      />

      <Footer />
    </main>
  );
}
