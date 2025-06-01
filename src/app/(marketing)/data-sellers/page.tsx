import { Metadata } from "next";
import DataSellersHeroWithCMS from "@/components/data-sellers/DataSellersHeroWithCMS";
import PathSelection from "@/components/data-sellers/PathSelection";
import RevenueComparison from "@/components/data-sellers/RevenueComparison";
import UnifiedBenefits from "@/components/data-sellers/UnifiedBenefits";
import CTASectionWithCMS from "@/components/home/CTASectionWithCMS";

export const metadata: Metadata = {
  title: "For Data Sellers - Precise.ai",
  description: "Monetize your data with performance-based pricing. Whether you're a brand with first-party data or a data broker with third-party segments, prove value and command premium prices.",
};

export default function DataSellersPage() {
  return (
    <div className="pt-16 md:pt-20">
      <DataSellersHeroWithCMS />
      <PathSelection />
      <RevenueComparison />
      <UnifiedBenefits />
      <CTASectionWithCMS />
    </div>
  );
}