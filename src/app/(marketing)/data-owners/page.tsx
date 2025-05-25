import { Metadata } from "next";
import PageHero from "@/components/data-owners/PageHero";
import BenefitsSection from "@/components/data-owners/BenefitsSection";
import ProcessSection from "@/components/data-owners/ProcessSection";
import TestimonialsSection from "@/components/data-owners/TestimonialsSection";
import CalculatorSection from "@/components/data-owners/CalculatorSection";
import FAQSection from "@/components/data-owners/FAQSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "For Data Controllers - Precise.ai",
  description: "Turn your data into passive income. Start minting verified credentials in 5 minutes. No contracts, no negotiations, no upfront costs.",
};

export default function DataOwnersPage() {
  return (
    <div className="pt-16 md:pt-20">
      <PageHero />
      <BenefitsSection />
      <ProcessSection />
      <TestimonialsSection />
      <CalculatorSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}