import { Metadata } from "next";
import DocsHero from "@/components/developers/DocsHero";
import GettingStarted from "@/components/developers/GettingStarted";

export const metadata: Metadata = {
  title: "Developer Documentation - Precise.ai",
  description: "Everything you need to integrate verified data infrastructure into your applications.",
};

export default function DevelopersPage() {
  return (
    <div className="pt-16 md:pt-20">
      <DocsHero />
      <GettingStarted />
    </div>
  );
}