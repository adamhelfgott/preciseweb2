"use client";

import { useSanityData } from "@/hooks/useSanityData";
import { termsOfServiceQuery } from "@/lib/sanity/queries/legal";
import LegalPageWithCMS from "@/components/legal/LegalPageWithCMS";

export default function TermsPageWithCMS() {
  const { data, loading, error } = useSanityData(termsOfServiceQuery);

  if (loading) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen bg-white">
        <div className="container max-w-4xl py-12 md:py-20">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Use CMS data if available, otherwise use existing static content
  if (!data || error) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen bg-white">
        <div className="container max-w-4xl py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-gray mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-medium-gray">
            <p className="text-sm text-medium-gray mb-8">Effective Date: January 25, 2025</p>

            <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">1. Introduction</h2>
            <p>
              Welcome to Precise.ai ("Precise," "we," "our," or "us"). These Terms of Service ("Terms") govern your use of our federated intelligence platform and related services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
            </p>

            <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">2. Service Description</h2>
            <p>
              Precise provides privacy-preserving infrastructure that enables federated intelligence and data collaboration. Our platform allows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Media buyers to query aggregated insights without accessing raw data</li>
              <li>Data controllers to enable intelligence queries while maintaining full control of their data</li>
              <li>Privacy-preserving computation through secure enclaves and federated learning</li>
            </ul>

            <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">3. Data Controller Status</h2>
            <p className="font-semibold">
              Important: You remain a data controller, not a data broker, when using Precise.
            </p>
            <p>
              Our infrastructure is specifically designed to ensure that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your data never leaves your infrastructure</li>
              <li>You maintain full control over query permissions</li>
              <li>You only process first-party data from your own users</li>
              <li>You retain your GDPR/CCPA controller status</li>
            </ul>

            <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">4. User Responsibilities</h2>
            <h3 className="text-xl font-semibold text-dark-gray mt-8 mb-3">4.1 For Data Controllers</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ensure you have proper consent from your users for data processing</li>
              <li>Implement appropriate security measures for your infrastructure</li>
              <li>Configure query governance rules according to your privacy policies</li>
              <li>Maintain accurate records of query permissions and usage</li>
            </ul>

            <h3 className="text-xl font-semibold text-dark-gray mt-8 mb-3">4.2 For Media Buyers</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use aggregated insights only for legitimate advertising purposes</li>
              <li>Respect query limitations and privacy constraints</li>
              <li>Maintain confidentiality of any insights received</li>
              <li>Comply with all applicable advertising laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">5. Privacy and Security</h2>
            <p>
              Our platform implements industry-leading security measures:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SOC2 Type II compliant infrastructure</li>
              <li>Zero-knowledge proofs for query verification</li>
              <li>Differential privacy on all query outputs</li>
              <li>End-to-end encryption for all communications</li>
              <li>Regular security audits and penetration testing</li>
            </ul>

            <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">6. Federated Learning Principles</h2>
            <p>
              When using our federated learning capabilities:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Algorithms move to data, not vice versa</li>
              <li>Only aggregated model updates are shared</li>
              <li>Individual data points are never exposed</li>
              <li>All computations occur within secure enclaves</li>
            </ul>

            <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">7. Prohibited Uses</h2>
            <p>
              You may not use our Services to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Attempt to extract or reverse-engineer individual data</li>
              <li>Circumvent privacy protections or query limitations</li>
              <li>Process data without proper legal basis or consent</li>
              <li>Engage in discriminatory or harmful targeting practices</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">8. Fees and Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Media Buyers: Pay based on query volume and data sources accessed</li>
              <li>Data Controllers: Receive payments based on Valence Enhanced Shapley attribution</li>
              <li>Payments processed weekly via ACH or wire transfer</li>
              <li>Transparent pricing with no hidden fees</li>
            </ul>

            <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">9. Intellectual Property</h2>
            <p>
              All rights in the Precise platform, including our federated learning technology, secure enclave implementations, and attribution algorithms, remain with Precise. You retain all rights to your data.
            </p>

            <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">10. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, PRECISE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
            </p>

            <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">11. Indemnification</h2>
            <p>
              You agree to indemnify and hold Precise harmless from any claims arising from your breach of these Terms or misuse of the Services.
            </p>

            <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">12. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of material changes via email or through the Services.
            </p>

            <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">13. Contact Information</h2>
            <p>
              For questions about these Terms, please contact us at:
            </p>
            <p className="mt-4">
              Precise.ai<br />
              Email: legal@precise.ai<br />
              Address: San Francisco, CA
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20">
      <LegalPageWithCMS data={data} />
    </div>
  );
}