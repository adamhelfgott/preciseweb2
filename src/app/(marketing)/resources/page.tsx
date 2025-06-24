import { Metadata } from "next";
import ResourcesSection from "@/components/resources/ResourcesSection";

export const metadata: Metadata = {
  title: "Resources | Precise",
  description: "Explore our resources to learn more about privacy-preserving data collaboration and the AI data economy.",
};

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-soft-white">
      <ResourcesSection />
    </main>
  );
}