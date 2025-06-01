import { Metadata } from "next";
import MediaBuyersHeroWithCMS from "@/components/media-buyers/MediaBuyersHeroWithCMS";
import OutcomesSection from "@/components/media-buyers/OutcomesSection";
import BuyerTypeSelection from "@/components/media-buyers/BuyerTypeSelection";
import VerificationFlow from "@/components/media-buyers/VerificationFlow";
import CTASectionWithCMS from "@/components/home/CTASectionWithCMS";

export const metadata: Metadata = {
  title: "For Media Buyers - Precise.ai",
  description: "Access verified audiences with transparent attribution. Drive better outcomes across the entire marketing funnel with data you can trust.",
};

export default function MediaBuyersPage() {
  return (
    <div className="pt-16 md:pt-20">
      <MediaBuyersHeroWithCMS />
      <OutcomesSection />
      <BuyerTypeSelection />
      <VerificationFlow />
      <CTASectionWithCMS />
    </div>
  );
}