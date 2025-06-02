import { Metadata } from "next";
import CMSAdminPanel from "@/components/cms/CMSAdminPanel";

export const metadata: Metadata = {
  title: "CMS Admin - Precise.ai",
  description: "Content management system for Precise.ai marketing pages",
};

export default function CMSAdminPage() {
  return <CMSAdminPanel />;
}