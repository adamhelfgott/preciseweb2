import { Metadata } from "next";
import PlatformsHeroWithCMS from "@/components/platforms/PlatformsHeroWithCMS";
import PlatformTypesWithCMS from "@/components/platforms/PlatformTypesWithCMS";
import IntegrationFeaturesWithCMS from "@/components/platforms/IntegrationFeaturesWithCMS";
import CTASectionWithCMS from "@/components/home/CTASectionWithCMS";

export const metadata: Metadata = {
  title: "For Platforms - Precise.ai",
  description: "Integrate verified audiences and attribution into your DSP, DMP, or CDP. Differentiate with privacy-preserving data collaboration.",
};

export default function PlatformsPage() {
  return (
    <div className="pt-16 md:pt-20">
      <PlatformsHeroWithCMS />
      <PlatformTypesWithCMS />
      <IntegrationFeaturesWithCMS />
      <CTASectionWithCMS />
    </div>
  );
}