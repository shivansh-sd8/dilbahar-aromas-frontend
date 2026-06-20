import React from "react";
import type { Metadata } from "next";
import LegalContent from "@/components/content/LegalContent";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Refund & Returns Policy",
  description: "Our returns, refunds and damage-replacement policy for essential oil orders.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <LegalContent
      title="Refund & Returns Policy"
      sections={[
        { heading: "Damaged in transit", body: "If your order arrives damaged or leaking, contact us within 48 hours with photos for a free replacement." },
        { heading: "Sealed products", body: "For hygiene and purity reasons, opened oils cannot be returned unless defective." },
        { heading: "Refund timeline", body: "Approved refunds are processed to the original payment method within 5–7 business days." },
        { heading: "Wrong item", body: "If you receive the wrong product, we arrange a free pickup and reship at no cost." },
        { heading: "How to request", body: "Email or WhatsApp us with your order ID to start a return or refund request." },
      ]}
    />
  );
}
