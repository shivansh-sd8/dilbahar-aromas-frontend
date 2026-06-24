import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { api } from "@/lib/api";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || site.url;

const staticPaths = [
  "",
  "/collections",
  "/manufacturers-in-india",
  "/about-us",
  "/about/kannauj-heritage",
  "/about/deg-bhapka-distillation",
  "/blog",
  "/contact-us",
  "/b2b",
  "/learn/dilution-guide",
  "/privacy-policy",
  "/terms-and-conditions",
  "/shipping-policy",
  "/refund-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "daily" : "weekly",
    priority: p === "" ? 1 : 0.7,
  }));

  try {
    const [posts, categories, cities, products] = await Promise.all([
      api.listBlog({ limit: 1000 }).then((r) => r.posts),
      api.listCategories(),
      api.listCityPages(),
      api.listProducts({ limit: 500 }),
    ]);

    for (const c of categories) {
      entries.push({ url: `${BASE}/collections/${c.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 });
    }
    for (const p of products) {
      entries.push({ url: `${BASE}/products/${p.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.9 });
    }
    for (const post of posts) {
      entries.push({
        url: `${BASE}/blog/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    for (const city of cities) {
      entries.push({ url: `${BASE}/${city.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
    }
  } catch {
    // API unavailable at build time — return static entries only
  }

  return entries;
}
