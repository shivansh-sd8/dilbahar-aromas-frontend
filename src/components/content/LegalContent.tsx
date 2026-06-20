import React from "react";
import PageHeader from "@/components/layout/PageHeader";

export interface LegalSection {
  heading: string;
  body: string;
}

const LegalContent: React.FC<{ title: string; sections: LegalSection[] }> = ({
  title,
  sections,
}) => {
  return (
    <>
      <PageHeader title={title} crumbs={[{ label: title }]} />
      <article className="container-px py-12">
        <div className="mx-auto max-w-3xl space-y-6 text-foreground/85">
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().getFullYear()} · This is a starter template — please review with
            legal counsel before launch.
          </p>
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-bold text-brand">{s.heading}</h2>
              <p className="mt-2">{s.body}</p>
            </section>
          ))}
        </div>
      </article>
    </>
  );
};

export default LegalContent;
