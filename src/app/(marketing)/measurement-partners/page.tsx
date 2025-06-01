import { Metadata } from "next";
import MeasurementHero from "@/components/measurement/MeasurementHero";
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
      <MeasurementHero />
      <IntegrationBenefits />
      <AttributionFlow />
      <CTASection />
    </div>
  );
}