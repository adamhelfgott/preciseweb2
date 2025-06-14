import { client } from "@/sanity/lib/client";
import { compliancePageQuery } from "@/sanity/lib/queries";
import CompliancePageWithCMS from "@/components/compliance/CompliancePageWithCMS";

// Fallback data in case CMS content is not available
const fallbackData = {
  heroTitle: "Compliance Through Architecture",
  heroDescription: "Stay compliant by design, not policy. Our federated infrastructure ensures you never become a data broker while enabling valuable collaboration.",
  keyBenefits: [
    {
      title: "Maintain Controller Status",
      description: "Never classified as a data broker",
      iconType: "shield" as const,
      colorScheme: "green" as const
    },
    {
      title: "Zero Data Movement",
      description: "Data never leaves your infrastructure",
      iconType: "lock" as const,
      colorScheme: "blue" as const
    },
    {
      title: "Built-in Audit Trail",
      description: "Every query tracked and verified",
      iconType: "fileCheck" as const,
      colorScheme: "purple" as const
    }
  ],
  dataBrokerSection: {
    title: "Why You Won't Be Classified as a Data Broker",
    description: "Data brokers sell or license data to third parties. With Precise, you never do either.",
    traditionalBroker: {
      title: "Traditional Data Broker",
      points: [
        "Collects and aggregates data from multiple sources",
        "Sells or licenses raw data to third parties",
        "Data physically moves between parties",
        "Subject to strict broker regulations"
      ]
    },
    withPrecise: {
      title: "With Precise",
      points: [
        "Your data stays in your infrastructure",
        "Only approved queries are executed",
        "Results are aggregated and privacy-preserved",
        "Maintain full data controller status"
      ]
    }
  },
  architectureSection: {
    title: "Privacy-Preserving Architecture",
    description: "Our federated learning infrastructure ensures compliance through technical design.",
    features: [
      {
        title: "Secure Enclaves",
        description: "Computation happens in trusted execution environments (TEEs) within your infrastructure. Even Precise cannot see your raw data.",
        codeExample: "Query → Secure Enclave → Aggregated Result",
        iconType: "database" as const,
        colorScheme: "blue" as const
      },
      {
        title: "Differential Privacy",
        description: "Mathematical guarantees ensure individual records cannot be reverse-engineered from query results. Privacy is provable, not promised.",
        codeExample: "Result = True Value + Calibrated Noise",
        iconType: "lock" as const,
        colorScheme: "green" as const
      },
      {
        title: "Query Governance",
        description: "Define exactly what types of queries are allowed. Set thresholds, limit frequencies, and require minimum aggregation levels.",
        codeExample: "if (query.type in approved_types) execute()",
        iconType: "eye" as const,
        colorScheme: "purple" as const
      }
    ]
  },
  standardsSection: {
    title: "Compliance Standards We Support",
    description: "Our architecture is designed to meet the strictest global privacy regulations.",
    standards: [
      {
        name: "GDPR",
        description: "Maintain data controller status. Support right to erasure, data minimization, and purpose limitation.",
        colorScheme: "blue" as const
      },
      {
        name: "CCPA/CPRA",
        description: "No sale of personal information. Full audit trail for consumer rights requests.",
        colorScheme: "green" as const
      },
      {
        name: "SOC 2 Type II",
        description: "Annual audits of security, availability, processing integrity, and confidentiality.",
        colorScheme: "purple" as const
      }
    ]
  },
  ctaSection: {
    title: "Ready to Enable Compliant Collaboration?",
    description: "Join leading brands who collaborate without compromising compliance.",
    primaryButtonText: "Get Started",
    primaryButtonLink: "/get-started",
    secondaryButtonText: "Talk to Compliance Team",
    secondaryButtonLink: "/contact"
  }
};

export default async function CompliancePage() {
  let pageData = fallbackData;

  try {
    const cmsData = await client.fetch(compliancePageQuery);
    if (cmsData) {
      pageData = cmsData;
    }
  } catch (error) {
    console.error("Failed to fetch compliance page data from CMS:", error);
    // Use fallback data
  }

  return <CompliancePageWithCMS data={pageData} />;
}