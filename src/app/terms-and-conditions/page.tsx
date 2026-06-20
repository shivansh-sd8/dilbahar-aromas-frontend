import React from "react";
import type { Metadata } from "next";
import LegalContent from "@/components/content/LegalContent";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "The terms governing your use of dilbahararomas.com and purchases made through it.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <LegalContent
      title="Terms & Conditions"
      sections={[
        { heading: "Acceptance", body: "By using this website and placing orders, you agree to these terms." },
        { heading: "Products", body: "We aim to describe products accurately. Natural oils may vary slightly batch to batch; each batch is GC-MS verified." },
        { heading: "Pricing & payment", body: "Prices are in INR unless stated otherwise. We accept UPI, cards, net banking, EMI and Cash on Delivery (up to ₹10,000)." },
        { heading: "Liability", body: "Essential oils are concentrated. Always dilute and patch-test. We are not liable for misuse contrary to safety guidance." },
        { heading: "Governing law", body: "These terms are governed by the laws of India, with jurisdiction in Uttar Pradesh." },
      ]}
    />
  );
}
