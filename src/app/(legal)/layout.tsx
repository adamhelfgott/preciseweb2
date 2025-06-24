import NavigationWithCMS from "@/components/NavigationWithCMS";
import FooterWithCMS from "@/components/home/FooterWithCMS";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationWithCMS />
      <main className="flex-grow">{children}</main>
      <FooterWithCMS />
    </>
  );
}