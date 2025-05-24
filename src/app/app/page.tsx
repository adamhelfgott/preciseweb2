"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AppPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/app/signin");
      } else if (user.role === "DATA_OWNER") {
        router.push("/app/dashboard");
      } else if (user.role === "MEDIA_BUYER") {
        router.push("/app/campaigns");
      } else {
        router.push("/app/dashboard");
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
    </div>
  );
}