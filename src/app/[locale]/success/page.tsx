"use client";

import { useEffect } from "react";
import { useLocalizedNavigation } from "@/utils/navigation";

export default function SuccessRedirectPage() {
  const { navigate } = useLocalizedNavigation();

  useEffect(() => {
    navigate("/files");
  }, [navigate]);

  return <main />;
}
