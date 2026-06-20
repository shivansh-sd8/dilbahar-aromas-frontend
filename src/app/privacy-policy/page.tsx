import React from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/config";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Dil Bahar Aromas collects, uses and protects your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" crumbs={[{ label: "Privacy Policy" }]} />
      <article className="container-px py-12">
        <div className="mx-auto max-w-3xl space-y-4 text-foreground/85 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-brand">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
          <p>
            This Privacy Policy explains how {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects and uses
            information when you use {site.domain}. This is a starter template and should be reviewed by
            legal counsel before launch.
          </p>
          <h2>Information we collect</h2>
          <p>Contact details (name, email, phone), order and delivery information, and usage data via cookies and analytics.</p>
          <h2>How we use it</h2>
          <p>To process orders, provide support, send updates you opt into, and improve our store.</p>
          <h2>Sharing</h2>
          <p>We share data only with logistics, payment and communication partners required to fulfil your order.</p>
          <h2>Your rights</h2>
          <p>You may request access to, correction of, or deletion of your data by emailing {site.email}.</p>
          <h2>Contact</h2>
          <p>{site.name}, {site.address.street}, {site.address.city} {site.address.pincode} · {site.email}</p>
        </div>
      </article>
    </>
  );
}
