import React from "react";
import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/content/ContactForm";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, localBusinessLd } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/config";

export const metadata: Metadata = buildMetadata({
  title: "Contact Dil Bahar Aromas — Kannauj Essential Oil Supplier",
  description:
    "Get in touch with Dil Bahar Aromas in Kannauj. Phone, WhatsApp, email and address for retail and B2B wholesale enquiries.",
  path: "/contact-us",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessLd()} />
      <PageHeader
        title="Contact us"
        subtitle="Questions about our oils, bulk orders or your batch report? We're here to help."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="container-px grid gap-10 py-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold text-brand">Reach us directly</h2>
          <ul className="mt-6 space-y-4 text-foreground/85">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 text-gold-dark" />
              <span>{site.address.street}, {site.address.city}, {site.address.state} {site.address.pincode}, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-5 text-gold-dark" />
              <a href={`tel:${site.phone}`} className="hover:text-primary">{site.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-5 text-gold-dark" />
              <a href={`mailto:${site.email}`} className="hover:text-primary">{site.email}</a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="size-5 text-gold-dark" />
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                Chat on WhatsApp
              </a>
            </li>
          </ul>
          <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-5 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">B2B / wholesale enquiries</p>
            <p className="mt-1">For bulk pricing, private label and export, email {site.b2bEmail} — response within 4 hours.</p>
          </div>
        </div>

        <ContactForm />
      </section>
    </>
  );
}
