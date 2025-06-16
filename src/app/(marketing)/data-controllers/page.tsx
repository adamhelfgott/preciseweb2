import { Metadata } from "next";
import DataControllersHeroWithCMS from "@/components/data-controllers/DataControllersHeroWithCMS";
import PathSelection from "@/components/data-controllers/PathSelection";
import RevenueComparison from "@/components/data-controllers/RevenueComparison";
import UnifiedBenefits from "@/components/data-controllers/UnifiedBenefits";
import CTASectionWithCMS from "@/components/home/CTASectionWithCMS";

export const metadata: Metadata = {
  title: "For Data Controllers - Precise.ai",
  description: "Monetize your data with performance-based pricing. Whether you're a brand with first-party data or a data broker with third-party segments, prove value and command premium prices.",
};

export default function DataControllersPage() {
  return (
    <div className="pt-16 md:pt-20">
      <DataControllersHeroWithCMS />
      <PathSelection />
      <RevenueComparison />
      <UnifiedBenefits />
      <CTASectionWithCMS />
    </div>
  );
}