import { Metadata } from "next";
import DataSellersHero from "@/components/data-sellers/DataSellersHero";
import PathSelection from "@/components/data-sellers/PathSelection";
import RevenueComparison from "@/components/data-sellers/RevenueComparison";
import UnifiedBenefits from "@/components/data-sellers/UnifiedBenefits";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "For Data Sellers - Precise.ai",
  description: "Monetize your data with performance-based pricing. Whether you're a brand with first-party data or a data broker with third-party segments, prove value and command premium prices.",
};

export default function DataSellersPage() {
  return (
    <div className="pt-16 md:pt-20">
      <DataSellersHero />
      <PathSelection />
      <RevenueComparison />
      <UnifiedBenefits />
      <CTASection />
    </div>
  );
}