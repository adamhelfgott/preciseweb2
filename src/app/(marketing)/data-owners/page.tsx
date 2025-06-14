import { Metadata } from "next";
import PageHeroWithCMS from "@/components/data-owners/PageHeroWithCMS";
import BenefitsSectionWithCMS from "@/components/data-owners/BenefitsSectionWithCMS";
import ProcessSectionWithCMS from "@/components/data-owners/ProcessSectionWithCMS";
import TestimonialsSectionWithCMS from "@/components/data-owners/TestimonialsSectionWithCMS";
import CalculatorSection from "@/components/data-owners/CalculatorSection";
import FAQSectionWithCMS from "@/components/data-owners/FAQSectionWithCMS";
import CTASectionWithCMS from "@/components/home/CTASectionWithCMS";

export const metadata: Metadata = {
  title: "For Data Controllers - Precise.ai",
  description: "Turn your data into passive income. Start minting verified credentials in 5 minutes. No contracts, no negotiations, no upfront costs.",
};

export default function DataOwnersPage() {
  return (
    <div className="pt-16 md:pt-20">
      <PageHeroWithCMS />
      <BenefitsSectionWithCMS />
      <ProcessSectionWithCMS />
      <TestimonialsSectionWithCMS />
      <CalculatorSection />
      <FAQSectionWithCMS />
      <CTASectionWithCMS />
    </div>
  );
}