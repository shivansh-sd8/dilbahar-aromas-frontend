"use client";

import React from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import adminApi from "@/lib/adminApi";
import type { BlogPost } from "@/lib/types";

export default function AdminBlogList() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(() => {
    setLoading(true);
    adminApi.listBlog().then(setPosts).catch(() => setPosts([])).finally(() => setLoading(false));
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await adminApi.deleteBlog(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-brand">Blog posts</h1>
        <Button render={<Link href="/admin/blog/new" />}>
          <Plus className="size-4" /> New post
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <p className="p-6 text-muted-foreground">Loading…</p>
        ) : posts.length === 0 ? (
          <p className="p-6 text-muted-foreground">No posts yet. Create your first post.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Lang</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p._id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{p.title}</td>
                  <td className="px-4 py-3 uppercase">{p.language}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${p.status === "published" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.slug}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/blog/${p._id}`} className="rounded-md p-1.5 hover:bg-secondary" aria-label="Edit">
                        <Pencil className="size-4" />
                      </Link>
                      <button onClick={() => remove(p._id)} className="rounded-md p-1.5 text-destructive hover:bg-destructive/10" aria-label="Delete">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
