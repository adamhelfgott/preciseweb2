import Link from "next/link";
import Icon from '@/components/Icon';

export default function Footer() {
  const footerSections = [
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
      title: "Developers",
      links: [
        { href: "/developers", label: "Documentation" },
        { href: "/developers/api", label: "API Reference" },
        { href: "/developers/sdks", label: "SDKs" },
        { href: "/developers/examples", label: "Examples" },
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
        { href: "/security", label: "Security" },
        { href: "/compliance", label: "Compliance" },
      ],
    },
  ];

  return (
    <footer className="bg-soft-white border-t border-silk-gray">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <Icon size={32} className="transition-transform group-hover:scale-110" />
              <span className="font-semibold text-xl text-dark-gray">Precise</span>
            </Link>
            <p className="text-medium-gray text-sm">
              Infrastructure for the AI Data Economy
            </p>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-dark-gray mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-medium-gray hover:text-dark-gray transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Security Badges */}
        <div className="mt-8 pt-8 border-t border-silk-gray">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2 text-medium-gray">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm font-medium">SOC 2 Type II</span>
            </div>
            <div className="flex items-center gap-2 text-medium-gray">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-medium-gray">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium">ISO 27001</span>
            </div>
            <div className="flex items-center gap-2 text-medium-gray">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium">CCPA Compliant</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-silk-gray flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-medium-gray text-sm">
            © {new Date().getFullYear()} Precise. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="https://linkedin.com/company/precise"
              className="text-medium-gray hover:text-dark-gray transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}