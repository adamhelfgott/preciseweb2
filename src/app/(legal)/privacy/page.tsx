import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Precise.ai",
  description: "Privacy Policy for Precise.ai's federated intelligence platform",
};

export default function PrivacyPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-white">
      <div className="container max-w-4xl py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-dark-gray mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-medium-gray">
          <p className="text-sm text-medium-gray mb-8">Effective Date: January 25, 2025</p>

          <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">1. Introduction</h2>
          <p>
            Precise.ai ("Precise," "we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use our federated intelligence platform.
          </p>
          <p className="font-semibold mt-4">
            Key Principle: We are a privacy-preserving infrastructure provider. We do not collect, store, or have access to the underlying data that flows through our federated queries.
          </p>

          <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">2. Our Role in Data Processing</h2>
          <p className="font-semibold">
            Precise acts as a data processor, not a data controller or data broker.
          </p>
          <p>
            This means:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We process data only on behalf of and under the instructions of data controllers</li>
            <li>We do not determine the purposes or means of data processing</li>
            <li>We do not sell, rent, or trade any data</li>
            <li>We enable privacy-preserving queries without accessing raw data</li>
          </ul>

          <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">3. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-dark-gray mt-8 mb-3">3.1 Account Information</h3>
          <p>When you create an account, we collect:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and email address</li>
            <li>Company information</li>
            <li>Billing details (processed by our payment provider)</li>
            <li>Authentication credentials</li>
          </ul>

          <h3 className="text-xl font-semibold text-dark-gray mt-8 mb-3">3.2 Usage Information</h3>
          <p>We collect metadata about platform usage:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Query volumes and types (not content)</li>
            <li>API usage statistics</li>
            <li>Performance metrics</li>
            <li>Error logs (sanitized of any personal data)</li>
          </ul>

          <h3 className="text-xl font-semibold text-dark-gray mt-8 mb-3">3.3 What We Do NOT Collect</h3>
          <p className="font-semibold">We explicitly do not collect or have access to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Raw data from data controllers' databases</li>
            <li>Individual user records or personal information from federated queries</li>
            <li>Unencrypted query results</li>
            <li>Any data that would make us a data broker</li>
          </ul>

          <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">4. How Federated Intelligence Works</h2>
          <p>
            Our privacy-preserving architecture ensures:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Data Never Moves:</strong> All data remains in the data controller's infrastructure</li>
            <li><strong>Secure Enclaves:</strong> Queries execute in isolated, encrypted environments</li>
            <li><strong>Differential Privacy:</strong> All outputs include mathematical noise to prevent individual identification</li>
            <li><strong>Zero-Knowledge Proofs:</strong> We verify query compliance without seeing the data</li>
            <li><strong>Aggregation Only:</strong> Only statistical aggregates are returned, never individual records</li>
          </ul>

          <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">5. Consent and Legal Basis</h2>
          
          <h3 className="text-xl font-semibold text-dark-gray mt-8 mb-3">5.1 Opt-In by Default</h3>
          <p>
            All data processing through our platform requires explicit opt-in consent:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Data controllers must have valid consent from their users</li>
            <li>No data is processed without explicit permission</li>
            <li>Users can withdraw consent at any time through their data controller</li>
          </ul>

          <h3 className="text-xl font-semibold text-dark-gray mt-8 mb-3">5.2 Legal Basis for Processing</h3>
          <p>We process information based on:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Legitimate interests in providing our Services</li>
            <li>Contractual necessity to deliver the Services</li>
            <li>Compliance with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">6. Data Security</h2>
          <p>
            We implement industry-leading security measures:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>SOC2 Type II certified infrastructure</li>
            <li>End-to-end encryption for all data transmissions</li>
            <li>Regular security audits and penetration testing</li>
            <li>Secure enclave technology for query processing</li>
            <li>Multi-factor authentication for all accounts</li>
            <li>Regular security training for all employees</li>
          </ul>

          <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">7. Data Retention</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Account information: Retained while account is active plus 30 days</li>
            <li>Usage logs: Retained for 90 days for debugging and optimization</li>
            <li>Billing records: Retained as required by law (typically 7 years)</li>
            <li>Query results: Never stored; computed and delivered in real-time</li>
          </ul>

          <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">8. Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your account information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your account</li>
            <li>Export your account data</li>
            <li>Object to certain processing</li>
            <li>Lodge a complaint with supervisory authorities</li>
          </ul>
          <p className="mt-4">
            For data processed through federated queries, exercise your rights through the relevant data controller.
          </p>

          <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">9. International Data Transfers</h2>
          <p>
            Our infrastructure ensures data sovereignty:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Data never leaves the data controller's jurisdiction</li>
            <li>Only encrypted query instructions cross borders</li>
            <li>We comply with all applicable data transfer regulations</li>
          </ul>

          <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">10. Children's Privacy</h2>
          <p>
            Our Services are not directed to individuals under 18. We do not knowingly collect information from children.
          </p>

          <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">11. Cookie Policy</h2>
          <p>
            We use only essential cookies required for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Authentication and security</li>
            <li>Session management</li>
            <li>Preference storage</li>
          </ul>
          <p className="mt-4">
            We do not use tracking or advertising cookies.
          </p>

          <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material changes via email and provide at least 30 days notice before changes take effect.
          </p>

          <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">13. Contact Us</h2>
          <p>
            For privacy-related questions or to exercise your rights:
          </p>
          <p className="mt-4">
            Privacy Team<br />
            Precise.ai<br />
            Email: privacy@precise.ai<br />
            Address: San Francisco, CA
          </p>
          <p className="mt-4">
            EU Representative:<br />
            [To be appointed before EU operations commence]
          </p>

          <h2 className="text-2xl font-semibold text-dark-gray mt-12 mb-4">14. Data Protection Officer</h2>
          <p>
            Our Data Protection Officer can be reached at: dpo@precise.ai
          </p>
        </div>
      </div>
    </div>
  );
}