import { groq } from 'next-sanity';

// Navigation Query - fetch all navigationLink documents
export const navigationQuery = groq`
  *[_type == "navigationLink" && isActive != false] | order(order asc) {
    label,
    href,
    order
  }
`;

// Homepage Queries
export const heroSectionQuery = groq`
  *[_type == "heroSection" && page == "Home"][0] {
    headline,
    "subheadline": description,
    "primaryButtonText": primaryCTA.text,
    "primaryButtonHref": primaryCTA.href,
    "secondaryButtonText": secondaryCTA.text,
    "secondaryButtonHref": secondaryCTA.href
  }
`;

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

export const howItWorksQuery = groq`
  *[_type == "pageContent" && page == "how-it-works" && section == "hero"][0] {
    "headline": content.headline,
    "subheadline": content.description,
    "steps": content.steps[] {
      title,
      description,
      number,
      icon
    }
  }
`;

export const logoBarQuery = groq`
  *[_type == "pageContent" && page == "home" && section == "logos"][0] {
    "headline": content.headline,
    "logos": content.logos[] {
      name,
      "imageUrl": logo
    }
  }
`;

export const teamSectionQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    name,
    role,
    bio,
    "imageUrl": image,
    linkedin,
    twitter
  }
`;

export const ctaSectionQuery = groq`
  *[_type == "pageContent" && page == "home" && section == "cta"][0] {
    "headline": content.headline,
    "subheadline": content.description,
    "buttonText": content.primaryCTA.text,
    "buttonHref": content.primaryCTA.href,
    "stats": content.stats
  }
`;

// Data Owners Page Queries
export const dataOwnersHeroQuery = groq`
  *[_type == "heroSection" && page == "Data Owners"][0] {
    headline,
    "subheadline": description,
    "primaryButtonText": primaryCTA.text,
    "primaryButtonHref": primaryCTA.href,
    "secondaryButtonText": secondaryCTA.text,
    "secondaryButtonHref": secondaryCTA.href
  }
`;

export const dataOwnersBenefitsQuery = groq`
  *[_type == "valueProposition" && section == "data-seller"][0] {
    headline,
    subheadline,
    "items": props[] {
      title,
      description,
      icon,
      "highlight": gradient
    }
  }
`;

export const dataOwnersProcessQuery = groq`
  *[_type == "pageContent" && page == "data-owners" && section == "process"][0] {
    "headline": content.headline,
    "subheadline": content.subheadline,
    "steps": content.steps[] {
      title,
      description,
      duration
    }
  }
`;

export const dataOwnersTestimonialsQuery = groq`
  *[_type == "pageContent" && page == "data-owners" && section == "testimonials"][0] {
    "headline": content.headline,
    "subheadline": content.subheadline,
    "items": content.items[] {
      quote,
      author,
      role,
      company,
      metric,
      "imageUrl": photo
    }
  }
`;

export const dataOwnersFAQQuery = groq`
  *[_type == "pageContent" && page == "data-owners" && section == "faq"][0] {
    "headline": content.headline,
    "subheadline": content.subheadline,
    "items": content.items[] {
      question,
      answer
    }
  }
`;

// Advertisers Page Queries
export const advertisersHeroQuery = groq`
  *[_type == "heroSection" && page == "Advertisers"][0] {
    headline,
    "subheadline": description,
    "primaryButtonText": primaryCTA.text,
    "primaryButtonHref": primaryCTA.href,
    "animationTerms": []
  }
`;

export const advertisersBenefitsQuery = groq`
  *[_type == "valueProposition" && section == "media-buyer"][0] {
    headline,
    subheadline,
    "items": props[] {
      title,
      description,
      icon,
      "stats": []
    }
  }
`;

export const advertisersIntegrationQuery = groq`
  *[_type == "pageContent" && page == "advertisers" && section == "integration"][0] {
    "headline": content.headline,
    "subheadline": content.subheadline,
    "platforms": content.platforms[] {
      name,
      description,
      "logoUrl": logo,
      features
    }
  }
`;

export const advertisersHowItWorksQuery = groq`
  *[_type == "pageContent" && page == "advertisers" && section == "how-it-works"][0] {
    "headline": content.headline,
    "subheadline": content.subheadline,
    "steps": content.steps[] {
      number,
      title,
      description,
      icon
    }
  }
`;

// Measurement Partners Page Queries
export const measurementHeroQuery = groq`
  *[_type == "pageContent" && page == "measurement-partners" && section == "hero"][0] {
    "headline": content.headline,
    "subheadline": content.subheadline,
    "primaryButtonText": content.primaryCTA.text,
    "primaryButtonHref": content.primaryCTA.href
  }
`;

export const measurementBenefitsQuery = groq`
  *[_type == "pageContent" && page == "measurement-partners" && section == "benefits"][0] {
    "headline": content.headline,
    "subheadline": content.subheadline,
    "items": content.items[] {
      title,
      description,
      icon,
      features
    }
  }
`;

export const measurementAttributionFlowQuery = groq`
  *[_type == "pageContent" && page == "measurement-partners" && section == "attribution-flow"][0] {
    "headline": content.headline,
    "subheadline": content.subheadline,
    "steps": content.steps[] {
      title,
      description,
      metrics
    }
  }
`;

// Platforms Page Queries
export const platformsHeroQuery = groq`
  *[_type == "pageContent" && page == "platforms" && section == "hero"][0] {
    "headline": content.headline,
    "subheadline": content.subheadline,
    "primaryButtonText": content.primaryCTA.text,
    "primaryButtonHref": content.primaryCTA.href
  }
`;

export const platformTypesQuery = groq`
  *[_type == "pageContent" && page == "platforms" && section == "platform-types"][0] {
    "headline": content.headline,
    "subheadline": content.subheadline,
    "types": content.types[] {
      name,
      description,
      icon,
      benefits,
      integration {
        time,
        method
      }
    }
  }
`;

export const platformFeaturesQuery = groq`
  *[_type == "pageContent" && page == "platforms" && section == "features"][0] {
    "headline": content.headline,
    "subheadline": content.subheadline,
    "items": content.items[] {
      title,
      description,
      icon,
      code
    }
  }
`;

// Data Sellers Page Queries
export const dataSellersHeroQuery = groq`
  *[_type == "pageContent" && page == "data-sellers" && section == "hero"][0] {
    "headline": content.headline,
    "subheadline": content.subheadline,
    "primaryButtonText": content.primaryCTA.text,
    "primaryButtonHref": content.primaryCTA.href,
    "secondaryButtonText": content.secondaryCTA.text,
    "secondaryButtonHref": content.secondaryCTA.href
  }
`;

// Media Buyers Page Queries  
export const mediaBuyersHeroQuery = groq`
  *[_type == "pageContent" && page == "media-buyers" && section == "hero"][0] {
    "headline": content.headline,
    "subheadline": content.subheadline,
    "primaryButtonText": content.primaryCTA.text,
    "primaryButtonHref": content.primaryCTA.href,
    "secondaryButtonText": content.secondaryCTA.text,
    "secondaryButtonHref": content.secondaryCTA.href
  }
`;

// Footer Query
export const footerQuery = groq`
  *[_type == "footer"][0] {
    brandName,
    brandTagline,
    copyrightText,
    sections[] {
      title,
      links[] {
        label,
        href,
        isExternal
      }
    },
    socialLinks[] {
      platform,
      url,
      label
    },
    securityBadges[] {
      label,
      icon
    }
  }
`;

// Case Studies Page Queries
export const caseStudiesQuery = groq`
  *[_type == "caseStudy" && isActive != false] | order(order asc) {
    _id,
    title,
    slug,
    client,
    industry,
    challenge,
    solution,
    results[] {
      metric,
      value,
      description
    },
    testimonial {
      quote,
      author,
      title
    },
    image
  }
`;

export const caseStudiesHeroQuery = groq`
  *[_type == "caseStudiesHero"][0] {
    headline,
    subheadline,
    ctaSection {
      headline,
      subheadline,
      primaryButton {
        text,
        href
      },
      secondaryButton {
        text,
        href
      }
    }
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