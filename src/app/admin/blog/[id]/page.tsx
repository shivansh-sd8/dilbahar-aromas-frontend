"use client";

import React from "react";
import { useParams } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";
import adminApi from "@/lib/adminApi";
import type { BlogPost } from "@/lib/types";

export default function EditBlogPost() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = React.useState<BlogPost | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!params?.id) return;
    adminApi.getBlog(params.id).then(setPost).catch((e) => setError(e.message));
  }, [params?.id]);

  if (error) return <p className="text-destructive">{error}</p>;
  if (!post) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand">Edit blog post</h1>
      <p className="mt-1 text-muted-foreground">{post.title}</p>
      <div className="mt-6">
        <BlogEditor initial={post} />
      </div>
    </div>
  );
}
