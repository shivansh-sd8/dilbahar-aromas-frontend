"use client";

import React from "react";
import ProductEditor from "@/components/admin/ProductEditor";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand">New product</h1>
      <div className="mt-6">
        <ProductEditor />
      </div>
    </div>
  );
}
