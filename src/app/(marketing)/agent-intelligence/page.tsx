import { Metadata } from "next";
import AgentIntelligencePageWithCMS from "@/components/agent-intelligence/AgentIntelligencePageWithCMS";

export const metadata: Metadata = {
  title: "Agent Intelligence - Precise.ai",
  description: "Transform your DSP into a self-optimizing system with Precise.ai's cross-platform intelligence.",
};

export default function AgentIntelligencePage() {
  return <AgentIntelligencePageWithCMS />;
}