import { Metadata } from "next";
import MeasurementHeroWithCMS from "@/components/measurement/MeasurementHeroWithCMS";
import IntegrationBenefitsWithCMS from "@/components/measurement/IntegrationBenefitsWithCMS";
import AttributionFlowWithCMS from "@/components/measurement/AttributionFlowWithCMS";
import CTASectionWithCMS from "@/components/home/CTASectionWithCMS";

export const metadata: Metadata = {
  title: "For Measurement Partners - Precise.ai",
  description: "Enhance your attribution solutions with verified data signals. Provide clients with deeper insights through privacy-preserving data collaboration.",
};

export default function MeasurementPartnersPage() {
  return (
    <div className="pt-16 md:pt-20">
      <MeasurementHeroWithCMS />
      <IntegrationBenefitsWithCMS />
      <AttributionFlowWithCMS />
      <CTASectionWithCMS />
    </div>
  );
}