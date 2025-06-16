import { Metadata } from "next";
import PrivacyPageWithCMS from "@/components/legal/PrivacyPageWithCMS";

export const metadata: Metadata = {
  title: "Privacy Policy | Precise.ai",
  description: "Privacy Policy for Precise.ai's federated intelligence platform",
};

export default function PrivacyPage() {
  return <PrivacyPageWithCMS />;
}