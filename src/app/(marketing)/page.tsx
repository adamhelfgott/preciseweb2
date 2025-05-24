import HeroSection from "@/components/home/HeroSection";
import LogoBar from "@/components/home/LogoBar";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ValuePropsSection from "@/components/home/ValuePropsSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="pt-16 md:pt-20">
      <HeroSection />
      <LogoBar />
      <HowItWorksSection />
      <ValuePropsSection />
      <CTASection />
    </div>
  );
}