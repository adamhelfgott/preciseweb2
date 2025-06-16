import { groq } from 'next-sanity';

export const legalPageQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0] {
    _id,
    title,
    pageType,
    effectiveDate,
    lastUpdated,
    sections[] {
      title,
      content
    },
    contactInfo {
      email,
      address,
      phone
    }
  }
`;

export const privacyPolicyQuery = groq`
  *[_type == "legalPage" && pageType == "privacy"][0] {
    _id,
    title,
    effectiveDate,
    lastUpdated,
    sections[] {
      title,
      content
    },
    contactInfo {
      email,
      address,
      phone
    }
  }
`;

export const termsOfServiceQuery = groq`
  *[_type == "legalPage" && pageType == "terms"][0] {
    _id,
    title,
    effectiveDate,
    lastUpdated,
    sections[] {
      title,
      content
    },
    contactInfo {
      email,
      address,
      phone
    }
  }
`;