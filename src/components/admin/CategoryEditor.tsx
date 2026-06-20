"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import adminApi from "@/lib/adminApi";
import type { Category } from "@/lib/types";
import { TextField, AreaField, SectionCard } from "./EntityForm";

const toCsv = (a?: string[]) => (a || []).join(", ");
const fromCsv = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);

const CategoryEditor: React.FC<{ initial?: Category }> = ({ initial }) => {
  const router = useRouter();
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  const [f, setF] = React.useState({
    name: initial?.name || "",
    slug: initial?.slug || "",
    heading: initial?.heading || "",
    introCopy: initial?.introCopy || "",
    seoCopy: initial?.seoCopy || "",
    metaTitle: initial?.seo?.metaTitle || "",
    metaDescription: initial?.seo?.metaDescription || "",
    keywords: toCsv(initial?.seo?.keywords),
  });

  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload: Partial<Category> = {
      name: f.name,
      ...(f.slug ? { slug: f.slug } : {}),
      heading: f.heading,
      introCopy: f.introCopy,
      seoCopy: f.seoCopy,
      seo: {
        metaTitle: f.metaTitle,
        metaDescription: f.metaDescription,
        keywords: fromCsv(f.keywords),
        structuredDataType: "WebPage",
      },
    };
    try {
      if (initial?._id) await adminApi.updateCategory(initial._id, payload);
      else await adminApi.createCategory(payload);
      router.push("/admin/categories");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid max-w-3xl gap-6">
      <SectionCard title="Category">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField name="name" label="Name" value={f.name} onChange={set("name")} required />
          <TextField name="slug" label="Slug" value={f.slug} onChange={set("slug")} hint="Blank → auto from name" />
        </div>
        <TextField name="heading" label="H1 heading" value={f.heading} onChange={set("heading")} />
        <AreaField name="introCopy" label="Intro copy (above grid)" value={f.introCopy} onChange={set("introCopy")} rows={3} hint="100–150 words, primary keyword first" />
        <AreaField name="seoCopy" label="SEO copy (below grid)" value={f.seoCopy} onChange={set("seoCopy")} rows={5} hint="~300 words educational block" />
      </SectionCard>

      <SectionCard title="SEO">
        <TextField name="metaTitle" label="Meta title" value={f.metaTitle} onChange={set("metaTitle")} />
        <AreaField name="metaDescription" label="Meta description" value={f.metaDescription} onChange={set("metaDescription")} rows={2} />
        <TextField name="keywords" label="Keywords (comma separated)" value={f.keywords} onChange={set("keywords")} />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : initial ? "Update category" : "Create category"}
        </Button>
      </SectionCard>
    </form>
  );
};

export default CategoryEditor;
