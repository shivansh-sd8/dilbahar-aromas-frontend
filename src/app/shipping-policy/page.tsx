import React from "react";
import type { Metadata } from "next";
import LegalContent from "@/components/content/LegalContent";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Shipping Policy",
  description: "Delivery timelines, charges, COD and international shipping for Dil Bahar Aromas.",
  path: "/shipping-policy",
});

export default function ShippingPolicyPage() {
  return (
    <LegalContent
      title="Shipping Policy"
      sections={[
        { heading: "Dispatch time", body: "Orders are dispatched within 48 hours on business days." },
        { heading: "Free shipping", body: "Free shipping on all India orders over ₹999. Below that, a flat fee applies at checkout." },
        { heading: "Cash on Delivery", body: "COD is available across India on orders up to ₹10,000." },
        { heading: "Tracking", body: "You receive tracking updates via WhatsApp and email through our logistics partners." },
        { heading: "International", body: "Export orders ship via DHL Express / FedEx with DG-compliant packing. Duties and taxes are borne by the buyer." },
      ]}
    />
  );
}
