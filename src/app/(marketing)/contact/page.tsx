import { Metadata } from "next";
import ContactPageWithCMS from "@/components/contact/ContactPageWithCMS";

export const metadata: Metadata = {
  title: "Contact - Precise.ai",
  description: "Get in touch with our team. We're here to help transform your advertising performance.",
};

export default function ContactPage() {
  return <ContactPageWithCMS />;
}