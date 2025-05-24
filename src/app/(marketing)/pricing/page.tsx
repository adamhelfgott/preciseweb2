import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Precise.ai",
  description: "Simple, transparent pricing. Start free with 1M events per month.",
};

export default function PricingPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="container section-padding">
        <h1 className="text-display-large font-bold text-dark-gray mb-8">Pricing</h1>
        <p className="text-body-large text-medium-gray">
          This page is under construction. Check back soon!
        </p>
      </div>
    </div>
  );
}