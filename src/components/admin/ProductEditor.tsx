"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import adminApi from "@/lib/adminApi";
import type { Product, ProductVariant, Faq } from "@/lib/types";
import { TextField, AreaField, SelectField, SectionCard } from "./EntityForm";

const toCsv = (a?: string[]) => (a || []).join(", ");
const fromCsv = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);
const toLines = (a?: string[]) => (a || []).join("\n");
const fromLines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);

const emptyVariant: ProductVariant = { size: "", price: 0, mrp: 0, stock: 0, isDefault: false };

const ProductEditor: React.FC<{ initial?: Product }> = ({ initial }) => {
  const router = useRouter();
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  const [f, setF] = React.useState({
    name: initial?.name || "",
    slug: initial?.slug || "",
    localName: initial?.localName || "",
    botanicalName: initial?.botanicalName || "",
    emoji: initial?.emoji || "",
    tagline: initial?.tagline || "",
    shortDescription: initial?.shortDescription || "",
    description: initial?.description || "",
    origin: initial?.origin || "Kannauj, India",
    extractionMethod: initial?.extractionMethod || "Steam distillation (deg-bhapka)",
    useTags: toCsv(initial?.useTags),
    benefits: toLines(initial?.benefits),
    howToUse: initial?.howToUse || "",
    ingredients: initial?.ingredients || "",
    safetyNotes: initial?.safetyNotes || "",
    images: toLines(initial?.images),
    audience: initial?.audience || "Both",
    categorySlugs: toCsv(initial?.categorySlugs),
    relatedSlugs: toCsv(initial?.relatedSlugs),
    bestseller: initial?.bestseller ?? false,
    isActive: initial?.isActive ?? true,
    order: String(initial?.order ?? 0),
    ratingAvg: String(initial?.ratingAvg ?? 4.8),
    ratingCount: String(initial?.ratingCount ?? 0),
    metaTitle: initial?.seo?.metaTitle || "",
    metaDescription: initial?.seo?.metaDescription || "",
    keywords: toCsv(initial?.seo?.keywords),
  });

  const [variants, setVariants] = React.useState<ProductVariant[]>(
    initial?.variants?.length ? initial.variants : [{ ...emptyVariant, isDefault: true }]
  );
  const [faqs, setFaqs] = React.useState<Faq[]>(initial?.faqs ?? []);

  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const setVariant = (i: number, patch: Partial<ProductVariant>) =>
    setVariants((vs) => vs.map((v, idx) => (idx === i ? { ...v, ...patch } : v)));

  const setDefaultVariant = (i: number) =>
    setVariants((vs) => vs.map((v, idx) => ({ ...v, isDefault: idx === i })));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload: Partial<Product> = {
      name: f.name,
      ...(f.slug ? { slug: f.slug } : {}),
      localName: f.localName,
      botanicalName: f.botanicalName,
      emoji: f.emoji,
      tagline: f.tagline,
      shortDescription: f.shortDescription,
      description: f.description,
      origin: f.origin,
      extractionMethod: f.extractionMethod,
      useTags: fromCsv(f.useTags),
      benefits: fromLines(f.benefits),
      howToUse: f.howToUse,
      ingredients: f.ingredients,
      safetyNotes: f.safetyNotes,
      images: fromLines(f.images),
      audience: f.audience as Product["audience"],
      categorySlugs: fromCsv(f.categorySlugs),
      relatedSlugs: fromCsv(f.relatedSlugs),
      bestseller: f.bestseller,
      isActive: f.isActive,
      order: Number(f.order) || 0,
      ratingAvg: Number(f.ratingAvg) || 0,
      ratingCount: Number(f.ratingCount) || 0,
      variants: variants
        .filter((v) => v.size)
        .map((v) => ({
          size: v.size,
          sku: v.sku || undefined,
          price: Number(v.price) || 0,
          mrp: Number(v.mrp) || undefined,
          stock: Number(v.stock) || 0,
          isDefault: v.isDefault,
        })),
      faqs: faqs.filter((q) => q.question && q.answer),
      seo: {
        metaTitle: f.metaTitle,
        metaDescription: f.metaDescription,
        keywords: fromCsv(f.keywords),
        structuredDataType: "Product",
      },
    };
    try {
      if (initial?._id) await adminApi.updateProduct(initial._id, payload);
      else await adminApi.createProduct(payload);
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <SectionCard title="Basics">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField name="name" label="Name" value={f.name} onChange={set("name")} required />
            <TextField name="localName" label="Local / Hindi name" value={f.localName} onChange={set("localName")} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField name="slug" label="Slug" value={f.slug} onChange={set("slug")} hint="Blank → auto from name" />
            <TextField name="emoji" label="Emoji (fallback image)" value={f.emoji} onChange={set("emoji")} />
          </div>
          <TextField name="tagline" label="Tagline" value={f.tagline} onChange={set("tagline")} />
          <AreaField name="shortDescription" label="Short description" value={f.shortDescription} onChange={set("shortDescription")} rows={2} />
          <AreaField name="description" label="Description (HTML)" value={f.description} onChange={set("description")} rows={8} hint="Supports HTML: <p>, <h2>, <ul> etc." />
          <TextField name="images" label="Image URLs (one per line)" value={f.images} onChange={set("images")} hint="First image is the main image" />
        </SectionCard>

        <SectionCard title="Variants & pricing">
          <div className="space-y-3">
            {variants.map((v, i) => (
              <div key={i} className="grid grid-cols-2 items-end gap-2 rounded-lg border border-border p-3 sm:grid-cols-6">
                <LabeledMini label="Size" value={v.size} onChange={(val) => setVariant(i, { size: val })} />
                <LabeledMini label="Price ₹" type="number" value={String(v.price)} onChange={(val) => setVariant(i, { price: Number(val) })} />
                <LabeledMini label="MRP ₹" type="number" value={String(v.mrp ?? "")} onChange={(val) => setVariant(i, { mrp: Number(val) })} />
                <LabeledMini label="Stock" type="number" value={String(v.stock ?? "")} onChange={(val) => setVariant(i, { stock: Number(val) })} />
                <LabeledMini label="SKU" value={v.sku ?? ""} onChange={(val) => setVariant(i, { sku: val })} />
                <div className="flex items-center justify-between gap-2">
                  <label className="flex items-center gap-1 text-xs text-muted-foreground">
                    <input type="radio" name="defaultVariant" checked={!!v.isDefault} onChange={() => setDefaultVariant(i)} /> Default
                  </label>
                  <button type="button" onClick={() => setVariants((vs) => vs.filter((_, idx) => idx !== i))} className="text-destructive" aria-label="Remove variant">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => setVariants((vs) => [...vs, { ...emptyVariant }])}>
            <Plus className="size-4" /> Add variant
          </Button>
        </SectionCard>

        <SectionCard title="Details">
          <TextField name="useTags" label="Use tags (comma separated)" value={f.useTags} onChange={set("useTags")} />
          <AreaField name="benefits" label="Benefits (one per line)" value={f.benefits} onChange={set("benefits")} rows={4} />
          <AreaField name="howToUse" label="How to use" value={f.howToUse} onChange={set("howToUse")} rows={3} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField name="botanicalName" label="Botanical name" value={f.botanicalName} onChange={set("botanicalName")} />
            <TextField name="origin" label="Origin" value={f.origin} onChange={set("origin")} />
          </div>
          <TextField name="extractionMethod" label="Extraction method" value={f.extractionMethod} onChange={set("extractionMethod")} />
          <AreaField name="ingredients" label="Ingredients" value={f.ingredients} onChange={set("ingredients")} rows={2} />
          <AreaField name="safetyNotes" label="Safety notes" value={f.safetyNotes} onChange={set("safetyNotes")} rows={2} />
        </SectionCard>

        <SectionCard title="FAQs">
          <div className="space-y-3">
            {faqs.map((q, i) => (
              <div key={i} className="space-y-2 rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">FAQ {i + 1}</span>
                  <button type="button" onClick={() => setFaqs((qs) => qs.filter((_, idx) => idx !== i))} className="text-destructive" aria-label="Remove FAQ">
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <Input placeholder="Question" value={q.question} onChange={(e) => setFaqs((qs) => qs.map((x, idx) => (idx === i ? { ...x, question: e.target.value } : x)))} />
                <Input placeholder="Answer" value={q.answer} onChange={(e) => setFaqs((qs) => qs.map((x, idx) => (idx === i ? { ...x, answer: e.target.value } : x)))} />
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => setFaqs((qs) => [...qs, { question: "", answer: "" }])}>
            <Plus className="size-4" /> Add FAQ
          </Button>
        </SectionCard>

        <SectionCard title="SEO">
          <TextField name="metaTitle" label="Meta title" value={f.metaTitle} onChange={set("metaTitle")} />
          <AreaField name="metaDescription" label="Meta description" value={f.metaDescription} onChange={set("metaDescription")} rows={2} />
          <TextField name="keywords" label="Keywords (comma separated)" value={f.keywords} onChange={set("keywords")} />
        </SectionCard>
      </div>

      <div className="space-y-6">
        <SectionCard title="Publish">
          <SelectField name="audience" label="Audience" value={f.audience} onChange={set("audience")} options={[{ label: "Retail + B2B", value: "Both" }, { label: "Retail only", value: "D2C" }, { label: "B2B only", value: "B2B" }]} />
          <TextField name="categorySlugs" label="Category slugs (comma separated)" value={f.categorySlugs} onChange={set("categorySlugs")} hint="e.g. essential-oils, hair-growth-oils" />
          <TextField name="relatedSlugs" label="Related product slugs" value={f.relatedSlugs} onChange={set("relatedSlugs")} />
          <div className="grid grid-cols-3 gap-3">
            <TextField name="order" label="Order" type="number" value={f.order} onChange={set("order")} />
            <TextField name="ratingAvg" label="Rating" type="number" value={f.ratingAvg} onChange={set("ratingAvg")} />
            <TextField name="ratingCount" label="Reviews" type="number" value={f.ratingCount} onChange={set("ratingCount")} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="bestseller">Bestseller</Label>
            <Switch id="bestseller" checked={f.bestseller} onCheckedChange={(v) => setF((p) => ({ ...p, bestseller: v }))} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="isActive">Active (visible)</Label>
            <Switch id="isActive" checked={f.isActive} onCheckedChange={(v) => setF((p) => ({ ...p, isActive: v }))} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? "Saving…" : initial ? "Update product" : "Create product"}
          </Button>
        </SectionCard>
      </div>
    </form>
  );
};

const LabeledMini: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}> = ({ label, value, onChange, type = "text" }) => (
  <div className="grid gap-1">
    <span className="text-[0.65rem] uppercase text-muted-foreground">{label}</span>
    <Input className="h-8" type={type} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

export default ProductEditor;
