import HeroSection from "@/components/home/HeroSection";
import LogoBar from "@/components/home/LogoBar";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ValuePropsSection from "@/components/home/ValuePropsSection";
import TeamSection from "@/components/home/TeamSection";
import CTASection from "@/components/home/CTASection";
import BetaAccessModal from "@/components/home/BetaAccessModal";

export default function HomePage() {
  return (
    <div className="pt-16 md:pt-20">
      <HeroSection />
      <LogoBar />
      <HowItWorksSection />
      <ValuePropsSection />
      <TeamSection />
      <CTASection />
      <BetaAccessModal />
    </div>
  );
}