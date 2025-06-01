import { Metadata } from "next";
import NavigationWithCMS from "@/components/NavigationWithCMS";
import ValuePropsSectionWithCMS from "@/components/home/ValuePropsSectionWithCMS";

export const metadata: Metadata = {
  title: "CMS Example - Precise.ai",
  description: "Example page showing CMS integration",
};

export default function CMSExamplePage() {
  return (
    <>
      {/* This navigation pulls from Sanity CMS */}
      <NavigationWithCMS />
      
      <div className="pt-16 md:pt-20">
        <section className="section-padding">
          <div className="container">
            <h1 className="text-display-hero font-bold text-dark-gray mb-6">
              CMS Integration Example
            </h1>
            <p className="text-body-large text-medium-gray mb-8">
              This page demonstrates how content is pulled from Sanity CMS. 
              The navigation above and value props below can be edited in the CMS.
            </p>
            
            <div className="bg-light-gray rounded-xl p-6 mb-12">
              <h2 className="text-heading-large font-semibold text-dark-gray mb-4">
                How to use the CMS:
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-medium-gray">
                <li>Go to <a href="/studio" className="text-brand-green hover:underline">/studio</a></li>
                <li>Log in with your Sanity account</li>
                <li>Edit navigation links, value props, or hero sections</li>
                <li>Changes appear instantly (no deployment needed)</li>
              </ol>
            </div>
          </div>
        </section>
        
        {/* This section pulls value props from Sanity */}
        <ValuePropsSectionWithCMS />
      </div>
    </>
  );
}