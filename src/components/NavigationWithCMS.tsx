"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useSanityData } from "@/hooks/useSanityData";
import { navigationQuery } from "@/sanity/lib/queries";

type NavLink = {
  label: string;
  href: string;
};

export default function NavigationWithCMS() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Fetch navigation from Sanity
  const { data: navLinks, loading } = useSanityData<NavLink[]>(navigationQuery);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fallback to hardcoded links if CMS is not set up
  const links = navLinks || [
    { href: "/how-it-works", label: "How it works" },
    { href: "/data-sellers", label: "For data sellers" },
    { href: "/media-buyers", label: "For media buyers" },
    { href: "/measurement-partners", label: "For measurement" },
    { href: "/platforms", label: "For platforms" },
    { href: "/company", label: "Company" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass-effect shadow-sm"
          : "bg-white/95"
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="group">
            <Logo className="transition-transform group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-medium-gray hover:text-dark-gray transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/signin"
              className="text-dark-gray hover:text-brand-green transition-colors duration-200"
            >
              Sign in
            </Link>
            <Link href="/get-started" className="btn-primary">
              Get started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-dark-gray hover:text-brand-green transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-silk-gray shadow-lg">
            <div className="container py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 text-medium-gray hover:text-dark-gray transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-silk-gray flex flex-col gap-3">
                <Link
                  href="/signin"
                  className="text-center py-3 text-dark-gray hover:text-brand-green transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/get-started"
                  className="btn-primary justify-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}