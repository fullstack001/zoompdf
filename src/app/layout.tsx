"use client";
import "./globals.css";
import { Providers } from "./providers"; // Import client wrapper
import { Provider } from "react-redux"; // Import Redux Provider
import { store } from "../store/store"; // Import the Redux store
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice"; // Import your Redux action
import { login } from "@/store/slices/authSlice";
import axios from "axios"; // Import axios for HTTP requests
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// export const metadata: Metadata = {
//   title: "ZoomPDF | Online PDF Tools",
//   description: "Convert and manage your PDFs in seconds.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Provider store={store}>
          <Providers>
            <PersistLogin />
            {children}
          </Providers>
        </Provider>
      </body>
    </html>
  );
}

// Component to persist login state
function PersistLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    const oldToken = localStorage.getItem("authToken");

    if (oldToken) {
      axios
        .get("https://api.pdfezy.com/api/auth/validate-token", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${oldToken}`,
          },
        }) // Send token to backend for validation
        .then((response) => {
          const { token, user, subscription } = response.data; // Extract user and subscription from response
          localStorage.setItem("authToken", token); // Store the new token in localStorage
          dispatch(setUser({ ...user, subscription })); // Dispatch action with user and subscription
          dispatch(login()); // Dispatch login action to update auth state
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
          localStorage.removeItem("authToken"); // Remove invalid token
        });
    }
  }, [dispatch]);

  return null; // This component doesn't render anything
}
