"use client";

import React from "react";
import { useParams } from "next/navigation";
import CategoryEditor from "@/components/admin/CategoryEditor";
import adminApi from "@/lib/adminApi";
import type { Category } from "@/lib/types";

export default function EditCategoryPage() {
  const params = useParams<{ id: string }>();
  const [cat, setCat] = React.useState<Category | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!params?.id) return;
    adminApi
      .listCategories()
      .then((list) => {
        const found = list.find((c) => c._id === params.id);
        if (!found) throw new Error("Category not found");
        setCat(found);
      })
      .catch((e) => setError(e.message));
  }, [params?.id]);

  if (error) return <p className="text-destructive">{error}</p>;
  if (!cat) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand">Edit category</h1>
      <p className="mt-1 text-muted-foreground">{cat.name}</p>
      <div className="mt-6">
        <CategoryEditor initial={cat} />
      </div>
    </div>
  );
}
