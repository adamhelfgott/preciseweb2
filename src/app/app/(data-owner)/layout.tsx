import ProtectedRoute from "@/components/app/ProtectedRoute";
import AppShell from "@/components/app/AppShell";
import PageTransition from "@/components/app/PageTransition";

export default function DataOwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["DATA_OWNER"]}>
      <AppShell>
        <PageTransition>{children}</PageTransition>
      </AppShell>
    </ProtectedRoute>
  );
}