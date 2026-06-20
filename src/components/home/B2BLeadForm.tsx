"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

const valueProps = [
  "Response in 4 hours, sample in 48 hours",
  "GC-MS report included with every sample",
  "Full documentation: COA · MSDS · IFRA · Allergen",
  "We distil at source — consistent batch after batch",
];

const B2BLeadForm: React.FC = () => {
  const [status, setStatus] = React.useState<"idle" | "loading" | "ok" | "error">("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const product = String(form.get("product") || "");
    const quantity = String(form.get("quantity") || "");
    const industry = String(form.get("industry") || "");
    try {
      await api.createEnquiry({
        type: "b2b",
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        company: String(form.get("company") || ""),
        message: `Industry: ${industry}\nProduct: ${product}\nEstimated monthly quantity: ${quantity}`,
        items: product ? [{ name: product, qty: 1 }] : [],
        source: "b2b-form",
      });
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-secondary/40 py-16">
      <div className="container-px grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-gold-dark">B2B Wholesale</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand">
            The essential oil supplier your formulation team trusts
          </h2>
          <p className="mt-3 text-muted-foreground">
            Agarbatti, cosmetics, perfumery, pharma and export buyers — get GC-MS verified oils with
            full documentation and tiered MOQ pricing.
          </p>
          <ul className="mt-6 space-y-3">
            {valueProps.map((v) => (
              <li key={v} className="flex items-start gap-2 text-sm text-foreground/85">
                <span className="mt-0.5 text-primary">✓</span> {v}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
          {status === "ok" ? (
            <div className="py-10 text-center">
              <div className="text-4xl">✅</div>
              <h3 className="mt-3 font-display text-xl font-semibold text-brand">Request received</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Our team responds within 4 hours. Samples ship in 48 hours with GC-MS included.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
              <Field name="company" label="Company" required />
              <Field name="name" label="Your name" required />
              <Field name="email" label="Email" type="email" required />
              <Field name="phone" label="WhatsApp number" required />
              <Field name="industry" label="Industry" placeholder="Agarbatti, Cosmetics…" />
              <Field name="product" label="Product of interest" placeholder="Ruh Khus, Nilgiri…" />
              <div className="sm:col-span-2">
                <Field name="quantity" label="Estimated monthly quantity" placeholder="e.g. 25 kg" />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                  {status === "loading" ? "Sending…" : "Request a sample — response in 4 hours"}
                </Button>
                {status === "error" && (
                  <p className="mt-2 text-center text-sm text-destructive">
                    Something went wrong. Please WhatsApp us instead.
                  </p>
                )}
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Sample in 48 hours · GC-MS included · No commitment
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Field: React.FC<{
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}> = ({ name, label, type = "text", required, placeholder }) => (
  <div className="grid gap-1.5">
    <Label htmlFor={name}>
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    <Input id={name} name={name} type={type} required={required} placeholder={placeholder} />
  </div>
);

export default B2BLeadForm;
