import React from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogPost } from "@/lib/types";

const BlogPreview = async () => {
  let posts: BlogPost[] = [];
  try {
    const res = await api.listBlog({ limit: 3 });
    posts = res.posts;
  } catch {
    return null; // API unavailable — skip section gracefully
  }

  if (!posts.length) return null;

  return (
    <section className="container-px py-16">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold text-brand">From our journal</h2>
          <p className="mt-1 text-muted-foreground">Guides in Hindi &amp; English on oils, benefits and rituals.</p>
        </div>
        <Link href="/blog" className="hidden text-sm font-semibold text-primary hover:underline sm:inline">
          Explore all guides →
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <BlogCard key={p._id} post={p} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link href="/blog" className="text-sm font-semibold text-primary hover:underline">
          Explore all guides — Hindi &amp; English →
        </Link>
      </div>
    </section>
  );
};

export default BlogPreview;
