import NavigationWithCMS from "@/components/NavigationWithCMS";
import FooterWithCMS from "@/components/home/FooterWithCMS";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexClientProvider>
      <NavigationWithCMS />
      <main className="flex-grow">{children}</main>
      <FooterWithCMS />
    </ConvexClientProvider>
  );
}