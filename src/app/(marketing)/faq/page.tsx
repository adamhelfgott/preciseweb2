import { Metadata } from "next";
import FAQPageContent from "@/components/faq/FAQPageContent";

export const metadata: Metadata = {
  title: "Common Questions - Precise.ai",
  description: "Find answers to frequently asked questions about Precise's privacy-preserving data collaboration platform for advertising.",
};

export default function FAQPage() {
  return (
    <div className="pt-16 md:pt-20">
      <FAQPageContent />
    </div>
  );
}