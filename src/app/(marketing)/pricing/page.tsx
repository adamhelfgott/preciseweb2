import { Metadata } from "next";
import PricingPageWithCMS from "@/components/pricing/PricingPageWithCMS";

export const metadata: Metadata = {
  title: "Pricing - Precise.ai",
  description: "Enterprise pricing built for scale. Custom pricing based on your data volume and usage.",
};

export default function PricingPage() {
  return <PricingPageWithCMS />;
}