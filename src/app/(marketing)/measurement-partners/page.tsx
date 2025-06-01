import { Metadata } from "next";
import MeasurementHeroWithCMS from "@/components/measurement/MeasurementHeroWithCMS";
import IntegrationBenefits from "@/components/measurement/IntegrationBenefits";
import AttributionFlow from "@/components/measurement/AttributionFlow";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "For Measurement Partners - Precise.ai",
  description: "Enhance your attribution solutions with verified data signals. Provide clients with deeper insights through privacy-preserving data collaboration.",
};

export default function MeasurementPartnersPage() {
  return (
    <div className="pt-16 md:pt-20">
      <MeasurementHeroWithCMS />
      <IntegrationBenefits />
      <AttributionFlow />
      <CTASection />
    </div>
  );
}