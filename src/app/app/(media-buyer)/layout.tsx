import ProtectedRoute from "@/components/app/ProtectedRoute";
import AppShell from "@/components/app/AppShell";
import PageTransition from "@/components/app/PageTransition";
import AIAssistant from "@/components/app/campaigns/AIAssistant";

export default function MediaBuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["MEDIA_BUYER"]}>
      <AppShell>
        <PageTransition>{children}</PageTransition>
        <AIAssistant />
      </AppShell>
    </ProtectedRoute>
  );
}