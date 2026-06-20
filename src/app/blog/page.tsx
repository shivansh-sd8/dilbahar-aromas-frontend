import React from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import BlogCard from "@/components/blog/BlogCard";
import { api } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import type { BlogPost } from "@/lib/types";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Blog & Guides — Essential Oils in Hindi & English",
  description:
    "Guides on essential oil benefits, uses and rituals — in Hindi and English. Nilgiri tel ke fayde, ruh khus, kewra water and more from Kannauj.",
  path: "/blog",
});

export default async function BlogIndexPage() {
  let posts: BlogPost[] = [];
  try {
    const res = await api.listBlog({ limit: 100 });
    posts = res.posts;
  } catch {
    /* API unavailable */
  }

  return (
    <>
      <PageHeader
        title="Journal & guides"
        subtitle="Practical guides on essential oils, their benefits and traditional uses — in Hindi and English."
        crumbs={[{ label: "Blog" }]}
      />

      <section className="container-px py-12">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No posts published yet. Check back soon — or add some from the admin panel.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <BlogCard key={p._id} post={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
