"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import adminApi from "@/lib/adminApi";
import type { CityPage } from "@/lib/types";
import { TextField, AreaField, SectionCard } from "./EntityForm";

const toCsv = (a?: string[]) => (a || []).join(", ");
const fromCsv = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);

// Raw admin doc shape (overrides) — distinct from the resolved public CityPage.
interface CityDoc extends Partial<CityPage> {
  headingOverride?: string;
  introOverride?: string;
  bodyOverride?: string;
}

const CityEditor: React.FC<{ initial?: CityDoc }> = ({ initial }) => {
  const router = useRouter();
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  const [f, setF] = React.useState({
    city: initial?.city || "",
    state: initial?.state || "Uttar Pradesh",
    slug: initial?.slug || "",
    headingOverride: initial?.headingOverride || "",
    introOverride: initial?.introOverride || "",
    bodyOverride: initial?.bodyOverride || "",
    areasServed: toCsv(initial?.areasServed),
    isActive: initial?.isActive ?? true,
    metaTitle: initial?.seo?.metaTitle || "",
    metaDescription: initial?.seo?.metaDescription || "",
    keywords: toCsv(initial?.seo?.keywords),
  });

  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      city: f.city,
      state: f.state,
      ...(f.slug ? { slug: f.slug } : {}),
      headingOverride: f.headingOverride,
      introOverride: f.introOverride,
      bodyOverride: f.bodyOverride,
      areasServed: fromCsv(f.areasServed),
      isActive: f.isActive,
      seo: {
        metaTitle: f.metaTitle,
        metaDescription: f.metaDescription,
        keywords: fromCsv(f.keywords),
        structuredDataType: "LocalBusiness" as const,
      },
    };
    try {
      if (initial?._id) await adminApi.updateCity(initial._id, payload as Partial<CityPage>);
      else await adminApi.createCity(payload as Partial<CityPage>);
      router.push("/admin/cities");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <SectionCard title="City">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField name="city" label="City" value={f.city} onChange={set("city")} required />
            <TextField name="state" label="State" value={f.state} onChange={set("state")} />
          </div>
          <TextField name="slug" label="Slug" value={f.slug} onChange={set("slug")} hint="Blank → auto: essential-oils-in-<city>" placeholder="essential-oils-in-lucknow" />
          <TextField name="areasServed" label="Areas served (comma separated)" value={f.areasServed} onChange={set("areasServed")} hint="Localities/nearby areas to target" />
        </SectionCard>

        <SectionCard title="Content overrides (optional — template fills blanks)">
          <TextField name="headingOverride" label="Heading override" value={f.headingOverride} onChange={set("headingOverride")} />
          <AreaField name="introOverride" label="Intro override" value={f.introOverride} onChange={set("introOverride")} rows={3} />
          <AreaField name="bodyOverride" label="Body override" value={f.bodyOverride} onChange={set("bodyOverride")} rows={5} />
        </SectionCard>

        <SectionCard title="SEO overrides (optional)">
          <TextField name="metaTitle" label="Meta title" value={f.metaTitle} onChange={set("metaTitle")} />
          <AreaField name="metaDescription" label="Meta description" value={f.metaDescription} onChange={set("metaDescription")} rows={2} />
          <TextField name="keywords" label="Keywords (comma separated)" value={f.keywords} onChange={set("keywords")} />
        </SectionCard>
      </div>

      <div className="space-y-6">
        <SectionCard title="Publish">
          <div className="flex items-center justify-between">
            <Label htmlFor="active">Active (visible)</Label>
            <Switch id="active" checked={f.isActive} onCheckedChange={(v) => setF((p) => ({ ...p, isActive: v }))} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? "Saving…" : initial ? "Update city page" : "Create city page"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Leave overrides blank to use the shared template with the city name auto-filled.
          </p>
        </SectionCard>
      </div>
    </form>
  );
};

export default CityEditor;
