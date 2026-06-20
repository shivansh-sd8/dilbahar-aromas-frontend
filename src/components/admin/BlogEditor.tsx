"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import adminApi from "@/lib/adminApi";
import type { BlogPost } from "@/lib/types";
import { TextField, AreaField, SelectField, SectionCard } from "./EntityForm";

const toCsv = (a?: string[]) => (a || []).join(", ");
const fromCsv = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);

const BlogEditor: React.FC<{ initial?: BlogPost }> = ({ initial }) => {
  const router = useRouter();
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  const [f, setF] = React.useState({
    title: initial?.title || "",
    slug: initial?.slug || "",
    excerpt: initial?.excerpt || "",
    body: initial?.body || "",
    coverImage: initial?.coverImage || "",
    author: initial?.author || "Dil Bahar Aromas",
    tags: toCsv(initial?.tags),
    category: initial?.category || "",
    language: initial?.language || "en",
    status: initial?.status || "draft",
    metaTitle: initial?.seo?.metaTitle || "",
    metaDescription: initial?.seo?.metaDescription || "",
    keywords: toCsv(initial?.seo?.keywords),
    canonicalUrl: initial?.seo?.canonicalUrl || "",
    ogImage: initial?.seo?.ogImage || "",
  });

  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload: Partial<BlogPost> = {
      title: f.title,
      ...(f.slug ? { slug: f.slug } : {}),
      excerpt: f.excerpt,
      body: f.body,
      coverImage: f.coverImage,
      author: f.author,
      tags: fromCsv(f.tags),
      category: f.category,
      language: f.language as "en" | "hi",
      status: f.status as "draft" | "published",
      seo: {
        metaTitle: f.metaTitle,
        metaDescription: f.metaDescription,
        keywords: fromCsv(f.keywords),
        canonicalUrl: f.canonicalUrl,
        ogImage: f.ogImage,
        structuredDataType: "BlogPosting",
      },
    };
    try {
      if (initial?._id) await adminApi.updateBlog(initial._id, payload);
      else await adminApi.createBlog(payload);
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <SectionCard title="Content">
          <TextField name="title" label="Title" value={f.title} onChange={set("title")} required />
          <TextField name="slug" label="Slug" value={f.slug} onChange={set("slug")} hint="Leave blank to auto-generate from title" placeholder="ruh-khus-oil-of-tranquility-kannauj" />
          <AreaField name="excerpt" label="Excerpt" value={f.excerpt} onChange={set("excerpt")} rows={2} hint="Short summary used in listings and meta description fallback" />
          <AreaField name="body" label="Body (HTML)" value={f.body} onChange={set("body")} rows={14} hint="Supports HTML: <h2>, <p>, <a>, <ul> etc." required />
        </SectionCard>

        <SectionCard title="SEO">
          <TextField name="metaTitle" label="Meta title" value={f.metaTitle} onChange={set("metaTitle")} hint="≤ 60 chars recommended" />
          <AreaField name="metaDescription" label="Meta description" value={f.metaDescription} onChange={set("metaDescription")} rows={2} hint="≤ 155 chars recommended" />
          <TextField name="keywords" label="Keywords (comma separated)" value={f.keywords} onChange={set("keywords")} />
          <TextField name="canonicalUrl" label="Canonical URL" value={f.canonicalUrl} onChange={set("canonicalUrl")} />
          <TextField name="ogImage" label="OG image URL" value={f.ogImage} onChange={set("ogImage")} />
        </SectionCard>
      </div>

      <div className="space-y-6">
        <SectionCard title="Publish">
          <SelectField name="status" label="Status" value={f.status} onChange={set("status")} options={[{ label: "Draft", value: "draft" }, { label: "Published", value: "published" }]} />
          <SelectField name="language" label="Language" value={f.language} onChange={set("language")} options={[{ label: "English", value: "en" }, { label: "Hindi", value: "hi" }]} />
          <TextField name="category" label="Category" value={f.category} onChange={set("category")} placeholder="Guides, Heritage…" />
          <TextField name="tags" label="Tags (comma separated)" value={f.tags} onChange={set("tags")} />
          <TextField name="author" label="Author" value={f.author} onChange={set("author")} />
          <TextField name="coverImage" label="Cover image URL" value={f.coverImage} onChange={set("coverImage")} />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? "Saving…" : initial ? "Update post" : "Create post"}
          </Button>
        </SectionCard>
      </div>
    </form>
  );
};

export default BlogEditor;
