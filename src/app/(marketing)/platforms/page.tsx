import { Metadata } from "next";
import PlatformsHeroWithCMS from "@/components/platforms/PlatformsHeroWithCMS";
import PlatformTypes from "@/components/platforms/PlatformTypes";
import IntegrationFeatures from "@/components/platforms/IntegrationFeatures";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "For Platforms - Precise.ai",
  description: "Integrate verified audiences and attribution into your DSP, DMP, or CDP. Differentiate with privacy-preserving data collaboration.",
};

export default function PlatformsPage() {
  return (
    <div className="pt-16 md:pt-20">
      <PlatformsHeroWithCMS />
      <PlatformTypes />
      <IntegrationFeatures />
      <CTASection />
    </div>
  );
}