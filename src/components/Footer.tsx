import Link from "next/link";

export default function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { href: "/how-it-works", label: "How it works" },
        { href: "/data-owners", label: "For data owners" },
        { href: "/advertisers", label: "For advertisers" },
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
        { href: "/about", label: "About" },
        { href: "/blog", label: "Blog" },
        { href: "/careers", label: "Careers" },
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
              <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-white font-bold text-lg">P</span>
              </div>
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

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-silk-gray flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-medium-gray text-sm">
            © {new Date().getFullYear()} Precise. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="https://twitter.com/precise"
              className="text-medium-gray hover:text-dark-gray transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </Link>
            <Link
              href="https://github.com/precise"
              className="text-medium-gray hover:text-dark-gray transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
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