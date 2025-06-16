import { Metadata } from "next";
import TermsPageWithCMS from "@/components/legal/TermsPageWithCMS";

export const metadata: Metadata = {
  title: "Terms of Service | Precise.ai",
  description: "Terms of Service for Precise.ai's federated intelligence platform",
};

export default function TermsPage() {
  return <TermsPageWithCMS />;
}