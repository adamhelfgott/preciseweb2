import ProtectedRoute from "@/components/app/ProtectedRoute";
import AppShell from "@/components/app/AppShell";
import PageTransition from "@/components/app/PageTransition";

export default function MediaBuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["MEDIA_BUYER"]}>
      <AppShell>
        <PageTransition>{children}</PageTransition>
      </AppShell>
    </ProtectedRoute>
  );
}