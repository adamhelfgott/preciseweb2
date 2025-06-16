'use client';

import { PortableText } from '@portabletext/react';
import { format } from 'date-fns';
import Link from 'next/link';

interface LegalSection {
  title: string;
  content: any[];
}

interface LegalPageData {
  _id: string;
  title: string;
  pageType: 'privacy' | 'terms';
  effectiveDate: string;
  lastUpdated: string;
  sections: LegalSection[];
  contactInfo?: {
    email?: string;
    address?: string;
    phone?: string;
  };
}

interface LegalPageWithCMSProps {
  data: LegalPageData;
}

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="mb-4 text-gray-600">{children}</p>,
    h3: ({ children }: any) => <h3 className="text-xl font-semibold text-gray-900 mb-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-medium text-gray-800 mb-2">{children}</h4>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-gray-600">{children}</li>,
    number: ({ children }: any) => <li className="text-gray-600">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a 
          href={value?.href} 
          target={target} 
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-[#0984E3] hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};

export default function LegalPageWithCMS({ data }: LegalPageWithCMSProps) {
  if (!data) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Page Not Found</h1>
          <p className="text-gray-600">The requested legal page could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-8">
          <Link href="/" className="text-[#0984E3] hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h1>
          <div className="text-sm text-gray-500">
            <p>Effective Date: {format(new Date(data.effectiveDate), 'MMMM d, yyyy')}</p>
            <p>Last Updated: {format(new Date(data.lastUpdated), 'MMMM d, yyyy')}</p>
          </div>
        </div>

        <div className="prose prose-gray max-w-none">
          {data.sections.map((section, index) => (
            <section key={index} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <PortableText value={section.content} components={portableTextComponents} />
            </section>
          ))}
        </div>

        {data.contactInfo && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="text-gray-600 space-y-2">
              {data.contactInfo.email && (
                <p>
                  Email: <a href={`mailto:${data.contactInfo.email}`} className="text-[#0984E3] hover:underline">
                    {data.contactInfo.email}
                  </a>
                </p>
              )}
              {data.contactInfo.phone && (
                <p>Phone: {data.contactInfo.phone}</p>
              )}
              {data.contactInfo.address && (
                <p className="whitespace-pre-line">{data.contactInfo.address}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}