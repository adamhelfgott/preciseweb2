import { Metadata } from "next";
import CompanyPageWithCMS from "@/components/company/CompanyPageWithCMS";

export const metadata: Metadata = {
  title: "Company - Precise.ai",
  description: "Meet the leadership team building the infrastructure for the AI data economy.",
};

export default function CompanyPage() {
  return <CompanyPageWithCMS />;
}