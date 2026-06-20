import React from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-secondary to-muted text-5xl">
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
        ) : (
          <span>🌿</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {post.language === "hi" && (
            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-gold-dark">हिन्दी</span>
          )}
          {post.category && <span>{post.category}</span>}
          {date && <span>· {date}</span>}
        </div>
        <h3
          className={`mt-2 font-display text-lg font-semibold text-brand group-hover:text-gold-dark ${
            post.language === "hi" ? "lang-hi" : ""
          }`}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p className={`mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground ${post.language === "hi" ? "lang-hi" : ""}`}>
            {post.excerpt}
          </p>
        )}
        <span className="mt-3 text-sm font-semibold text-primary">Read more →</span>
      </div>
    </Link>
  );
};

export default BlogCard;
