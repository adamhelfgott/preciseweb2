import { groq } from 'next-sanity';

// Hero Section Queries
export const heroSectionQuery = groq`
  *[_type == "heroSection" && page == $page][0] {
    eyebrow,
    headline,
    headlineHighlight,
    subheadline,
    primaryCta,
    secondaryCta,
    trustItems
  }
`;

// Navigation Query
export const navigationQuery = groq`
  *[_type == "navigationLink" && isActive == true] | order(order asc) {
    label,
    href
  }
`;

// Value Props Query
export const valuePropsQuery = groq`
  *[_type == "valueProposition" && section == $section][0] {
    headline,
    subheadline,
    props[] {
      title,
      description,
      icon,
      gradient
    }
  }
`;

// Page Content Query
export const pageContentQuery = groq`
  *[_type == "pageContent" && page == $page][0] {
    title,
    metaDescription,
    sections
  }
`;

// Buyer Personas Query
export const buyerPersonasQuery = groq`
  *[_type == "buyerPersona" && type in $types] | order(type) {
    type,
    title,
    description,
    features,
    ctaText,
    ctaLink,
    icon,
    color
  }
`;

// Outcome Metrics Query
export const outcomeMetricsQuery = groq`
  *[_type == "outcomeMetric"] | order(category) {
    category,
    metrics,
    icon,
    color
  }
`;

// Features/Benefits Query
export const featuresQuery = groq`
  *[_type == "featureBenefit" && page == $page] | order(order asc) {
    title,
    description,
    icon,
    gradient
  }
`;

// Case Studies Queries
export const caseStudiesQuery = groq`
  *[_type == "caseStudy" && isActive == true] | order(order asc) {
    _id,
    title,
    slug,
    client,
    industry,
    challenge,
    solution,
    results,
    testimonial,
    image
  }
`;

export const caseStudiesHeroQuery = groq`
  *[_type == "caseStudiesHero"][0] {
    headline,
    subheadline,
    ctaSection
  }
`;

// Compliance Page Query
export const compliancePageQuery = groq`
  *[_type == "compliancePage"][0] {
    heroTitle,
    heroDescription,
    keyBenefits[] {
      title,
      description,
      iconType,
      colorScheme
    },
    dataBrokerSection {
      title,
      description,
      traditionalBroker {
        title,
        points
      },
      withPrecise {
        title,
        points
      }
    },
    architectureSection {
      title,
      description,
      features[] {
        title,
        description,
        codeExample,
        iconType,
        colorScheme
      }
    },
    standardsSection {
      title,
      description,
      standards[] {
        name,
        description,
        colorScheme
      }
    },
    ctaSection {
      title,
      description,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink
    }
  }
`;