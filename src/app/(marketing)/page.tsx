import HeroSectionWithCMS from "@/components/home/HeroSectionWithCMS";
import LogoBarWithCMS from "@/components/home/LogoBarWithCMS";
import HowItWorksSectionWithCMS from "@/components/home/HowItWorksSectionWithCMS";
import ProofInfrastructureSection from "@/components/home/ProofInfrastructureSection";
import ValuePropsSectionWithCMS from "@/components/home/ValuePropsSectionWithCMS";
import CTASectionWithCMS from "@/components/home/CTASectionWithCMS";
import BetaAccessModal from "@/components/home/BetaAccessModal";

export default function HomePage() {
  return (
    <div className="pt-16 md:pt-20">
      <HeroSectionWithCMS />
      <LogoBarWithCMS />
      <ProofInfrastructureSection />
      <HowItWorksSectionWithCMS />
      <ValuePropsSectionWithCMS />
      <CTASectionWithCMS />
      <BetaAccessModal />
    </div>
  );
}