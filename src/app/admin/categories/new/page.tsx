"use client";

import React from "react";
import CategoryEditor from "@/components/admin/CategoryEditor";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand">New category</h1>
      <div className="mt-6">
        <CategoryEditor />
      </div>
    </div>
  );
}
