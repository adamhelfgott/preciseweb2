import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Icon from '@/components/Icon';

// Define the footer query
const footerQuery = groq`
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

// Define types for the footer data
interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

interface SecurityBadge {
  label: string;
  icon?: string;
}

interface FooterData {
  brandName?: string;
  brandTagline?: string;
  copyrightText?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  securityBadges?: SecurityBadge[];
}

// Default footer data (fallback)
const defaultFooterData: FooterData = {
  brandName: "Precise",
  brandTagline: "Infrastructure for the AI Data Economy",
  sections: [
    {
      title: "Product",
      links: [
        { href: "/how-it-works", label: "How it works" },
        { href: "/data-owners", label: "For data controllers" },
        { href: "/advertisers", label: "For advertisers" },
        { href: "/case-studies", label: "Case studies" },
        { href: "/pricing", label: "Pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/company", label: "About" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/compliance", label: "Compliance" },
      ],
    },
  ],
  socialLinks: [
    { platform: "LinkedIn", url: "https://linkedin.com/company/precise", label: "LinkedIn" },
  ],
  securityBadges: [
    { label: "SOC 2 Type II" },
    { label: "GDPR Compliant" },
    { label: "ISO 27001" },
    { label: "CCPA Compliant" },
  ],
};

// Security badge icons
const getSecurityBadgeIcon = (label: string) => {
  switch (label) {
    case "SOC 2 Type II":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      );
    case "GDPR Compliant":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "ISO 27001":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "CCPA Compliant":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
  }
};

export default async function FooterWithCMS() {
  let footerData: FooterData = defaultFooterData;
  
  // Skip Sanity fetch in mock mode
  if (process.env.NEXT_PUBLIC_MOCK_MODE !== 'true') {
    try {
      const data = await client.fetch<FooterData>(footerQuery);
      if (data) {
        // Merge fetched data with defaults to ensure all fields have values
        footerData = {
          brandName: data.brandName || defaultFooterData.brandName,
          brandTagline: data.brandTagline || defaultFooterData.brandTagline,
          copyrightText: data.copyrightText,
          sections: data.sections?.length ? data.sections : defaultFooterData.sections,
          socialLinks: data.socialLinks?.length ? data.socialLinks : defaultFooterData.socialLinks,
          securityBadges: data.securityBadges?.length ? data.securityBadges : defaultFooterData.securityBadges,
        };
      }
    } catch (error) {
      console.error('Error fetching footer data:', error);
      // Use default data on error
    }
  }

  const currentYear = new Date().getFullYear();
  const copyrightText = footerData.copyrightText || `© ${currentYear} ${footerData.brandName}. All rights reserved.`;

  return (
    <footer className="bg-soft-white border-t border-silk-gray">
      <div className="container py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Brand - Takes more space */}
            <div className="md:col-span-5">
              <Link href="/" className="flex items-center gap-2 group mb-4">
                <Icon size={32} className="transition-transform group-hover:scale-110" />
                <span className="font-semibold text-xl text-dark-gray">{footerData.brandName}</span>
              </Link>
              <p className="text-medium-gray text-sm mb-6 max-w-sm">
                {footerData.brandTagline}
              </p>
              
              {/* Social Links - Moved under brand */}
              {footerData.socialLinks && footerData.socialLinks.length > 0 && (
                <div className="flex items-center gap-4">
                  {footerData.socialLinks.map((social) => (
                    <Link
                      key={social.platform}
                      href={social.url}
                      className="text-medium-gray hover:text-dark-gray transition-colors duration-200 flex items-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span className="text-sm">{social.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Links - Better spacing */}
            <div className="md:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {footerData.sections?.map((section) => (
                  <div key={section.title}>
                    <h3 className="font-semibold text-dark-gray mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          {link.isExternal ? (
                            <a
                              href={link.href}
                              className="text-medium-gray hover:text-dark-gray transition-colors duration-200 text-sm block"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.label}
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              className="text-medium-gray hover:text-dark-gray transition-colors duration-200 text-sm block"
                            >
                              {link.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Security Badges */}
          {footerData.securityBadges && footerData.securityBadges.length > 0 && (
            <div className="mt-12 pt-8 border-t border-silk-gray">
              <div className="text-center mb-6">
                <h4 className="text-sm font-semibold text-dark-gray uppercase tracking-wider">Security & Compliance</h4>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                {footerData.securityBadges.map((badge) => (
                  <div key={badge.label} className="flex items-center gap-2 text-medium-gray hover:text-dark-gray transition-colors group">
                    <span className="group-hover:scale-110 transition-transform">
                      {getSecurityBadgeIcon(badge.label)}
                    </span>
                    <span className="text-sm font-medium">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom */}
          <div className="mt-8 pt-8 border-t border-silk-gray">
            <div className="text-center">
              <p className="text-medium-gray text-sm">
                {copyrightText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}