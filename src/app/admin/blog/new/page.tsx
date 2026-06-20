"use client";

import React from "react";
import BlogEditor from "@/components/admin/BlogEditor";

export default function NewBlogPost() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand">New blog post</h1>
      <p className="mt-1 text-muted-foreground">Write an SEO-optimized post in English or Hindi.</p>
      <div className="mt-6">
        <BlogEditor />
      </div>
    </div>
  );
}
