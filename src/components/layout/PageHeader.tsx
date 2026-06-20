import React from "react";
import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

const PageHeader: React.FC<{
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}> = ({ title, subtitle, crumbs }) => {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="container-px py-10 sm:py-14">
        {crumbs && crumbs.length > 0 && (
          <nav className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            {crumbs.map((c) => (
              <React.Fragment key={c.label}>
                <span>/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-primary">{c.label}</Link>
                ) : (
                  <span className="text-foreground/80">{c.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="max-w-3xl font-display text-3xl font-bold text-brand sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
      </div>
    </section>
  );
};

export default PageHeader;
