import React from "react";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/config";

const ComingSoon: React.FC<{
  title: string;
  subtitle?: string;
  note?: string;
  crumb?: string;
}> = ({ title, subtitle, note, crumb }) => {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} crumbs={crumb ? [{ label: crumb }] : undefined} />
      <section className="container-px py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="text-4xl">🛠️</div>
          <h2 className="mt-3 font-display text-2xl font-bold text-brand">Coming soon</h2>
          <p className="mt-2 text-muted-foreground">
            {note || "This feature is being built as part of our next launch phase."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button render={<Link href="/collections" />}>Shop oils</Button>
            <Button render={<a href={whatsappLink} target="_blank" rel="noopener noreferrer" />} variant="outline">
              WhatsApp us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ComingSoon;
