import { Metadata } from "next";
import PageHeroWithCMS from "@/components/advertisers/PageHeroWithCMS";
import BenefitsSectionWithCMS from "@/components/advertisers/BenefitsSectionWithCMS";
import IntegrationSectionWithCMS from "@/components/advertisers/IntegrationSectionWithCMS";
import HowItWorksSectionWithCMS from "@/components/advertisers/HowItWorksSectionWithCMS";
import CTASectionWithCMS from "@/components/home/CTASectionWithCMS";

export const metadata: Metadata = {
  title: "For Advertisers - Precise.ai",
  description: "Access verified audiences through your existing DSP. As platforms commoditize, data quality becomes the key differentiator.",
};

export default function AdvertisersPage() {
  return (
    <div className="pt-16 md:pt-20">
      <PageHeroWithCMS />
      <BenefitsSectionWithCMS />
      <IntegrationSectionWithCMS />
      <HowItWorksSectionWithCMS />
      <CTASectionWithCMS />
    </div>
  );
}