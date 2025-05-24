import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company - Precise.ai",
  description: "Learn about Precise and our mission to enable the AI-orchestrated ad economy.",
};

export default function CompanyPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="container section-padding">
        <h1 className="text-display-large font-bold text-dark-gray mb-8">Company</h1>
        <p className="text-body-large text-medium-gray">
          This page is under construction. Check back soon!
        </p>
      </div>
    </div>
  );
}