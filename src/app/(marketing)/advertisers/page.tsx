import { Metadata } from "next";
import PageHero from "@/components/advertisers/PageHero";
import BenefitsSection from "@/components/advertisers/BenefitsSection";
import IntegrationSection from "@/components/advertisers/IntegrationSection";
import HowItWorksSection from "@/components/advertisers/HowItWorksSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "For Advertisers - Precise.ai",
  description: "Access verified audiences through your existing DSP. As platforms commoditize, data quality becomes the key differentiator.",
};

export default function AdvertisersPage() {
  return (
    <div className="pt-16 md:pt-20">
      <PageHero />
      <BenefitsSection />
      <IntegrationSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
}