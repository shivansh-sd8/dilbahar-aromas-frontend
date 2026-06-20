import React from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import AccountDashboard from "@/components/account/AccountDashboard";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "My Account",
  description: "Log in to track your Dil Bahar Aromas orders.",
  path: "/account",
  seo: { noIndex: true },
});

export default function AccountPage() {
  return (
    <>
      <PageHeader
        title="My account"
        subtitle="Log in to view your orders, or track a guest order below."
        crumbs={[{ label: "Account" }]}
      />
      <section className="container-px py-12">
        <AccountDashboard />
      </section>
    </>
  );
}
