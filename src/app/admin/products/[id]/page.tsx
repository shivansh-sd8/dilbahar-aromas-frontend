"use client";

import React from "react";
import { useParams } from "next/navigation";
import ProductEditor from "@/components/admin/ProductEditor";
import adminApi from "@/lib/adminApi";
import type { Product } from "@/lib/types";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!params?.id) return;
    adminApi.getProduct(params.id).then(setProduct).catch((e) => setError(e.message));
  }, [params?.id]);

  if (error) return <p className="text-destructive">{error}</p>;
  if (!product) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand">Edit product</h1>
      <p className="mt-1 text-muted-foreground">{product.name}</p>
      <div className="mt-6">
        <ProductEditor initial={product} />
      </div>
    </div>
  );
}
