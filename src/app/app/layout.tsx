import { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";

export const metadata: Metadata = {
  title: "Precise App - Data Monetization Platform",
  description: "Turn your data into verified credentials and earn automatic royalties",
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexClientProvider>
      <AuthProvider>
        <div className="min-h-screen bg-light-gray">
          {children}
        </div>
      </AuthProvider>
    </ConvexClientProvider>
  );
}