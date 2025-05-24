"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Book, Wrench } from "lucide-react";

export default function DocsHero() {
  const [activeTab, setActiveTab] = useState("javascript");

  const codeExamples = {
    javascript: `import { Precise } from '@precise/sdk';

const precise = new Precise('your_api_key');

// Create a verified asset
const asset = await precise.mint({
  data: yourDataSource,
  consent: consentRecords
});

console.log(asset.verificationStatus); // 'verified'`,
    python: `from precise import Precise

precise = Precise('your_api_key')

# Create a verified asset
asset = precise.mint(
    data=your_data_source,
    consent=consent_records
)

print(asset.verification_status)  # 'verified'`,
    go: `package main

import (
    "fmt"
    "github.com/precise/go-sdk"
)

func main() {
    client := precise.New("your_api_key")
    
    // Create a verified asset
    asset, err := client.Mint(precise.MintParams{
        Data: yourDataSource,
        Consent: consentRecords,
    })
    
    fmt.Println(asset.VerificationStatus) // "verified"
}`,
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-soft-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-display-hero font-bold text-dark-gray mb-6 text-center">
            Build with Precise
          </h1>
          
          <p className="text-body-large text-medium-gray mb-12 text-center">
            Everything you need to integrate verified data infrastructure into your applications.
          </p>

          <div className="bg-dark-gray rounded-xl overflow-hidden shadow-2xl mb-12">
            <div className="flex border-b border-medium-gray">
              {Object.keys(codeExamples).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveTab(lang)}
                  className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
                    activeTab === lang
                      ? "bg-brand-green text-white"
                      : "text-medium-gray hover:text-white"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            
            <div className="p-6">
              <pre className="text-white font-mono text-sm overflow-x-auto">
                <code>{codeExamples[activeTab as keyof typeof codeExamples]}</code>
              </pre>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickLink
              href="/developers/quickstart"
              icon={Zap}
              title="Quickstart"
              delay={0}
            />
            <QuickLink
              href="/developers/api"
              icon={Book}
              title="API Reference"
              delay={0.1}
            />
            <QuickLink
              href="/developers/sdks"
              icon={Wrench}
              title="SDKs"
              delay={0.2}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface QuickLinkProps {
  href: string;
  icon: React.ElementType;
  title: string;
  delay: number;
}

function QuickLink({ href, icon: Icon, title, delay }: QuickLinkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <Link
        href={href}
        className="card flex items-center gap-4 hover:border-brand-green transition-colors group"
      >
        <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
          <Icon className="w-6 h-6 text-brand-green" />
        </div>
        <span className="font-medium text-dark-gray">{title}</span>
      </Link>
    </motion.div>
  );
}