"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { Product } from "@/lib/types";

const ProductTabs: React.FC<{ product: Product }> = ({ product }) => {
  const tabs: { value: string; label: string; show: boolean }[] = [
    { value: "description", label: "Description", show: Boolean(product.description || product.shortDescription) },
    { value: "benefits", label: "Benefits & Uses", show: (product.benefits?.length ?? 0) > 0 || (product.useTags?.length ?? 0) > 0 },
    { value: "how", label: "How to Use", show: Boolean(product.howToUse) },
    { value: "specs", label: "Ingredients & Safety", show: Boolean(product.ingredients || product.safetyNotes || product.botanicalName) },
  ].filter((t) => t.show);

  if (tabs.length === 0) return null;

  return (
    <Tabs defaultValue={tabs[0].value} className="w-full">
      <TabsList variant="line" className="flex-wrap">
        {tabs.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="description" className="pt-5">
        {product.description ? (
          <div
            className="prose-dba max-w-none text-foreground/85 [&_p]:mb-3"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        ) : (
          <p className="text-foreground/85">{product.shortDescription}</p>
        )}
      </TabsContent>

      <TabsContent value="benefits" className="pt-5">
        {product.benefits?.length ? (
          <ul className="space-y-2">
            {product.benefits.map((b) => (
              <li key={b} className="flex gap-2 text-foreground/85">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-gold-dark" /> {b}
              </li>
            ))}
          </ul>
        ) : null}
        {product.useTags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.useTags.map((t) => (
              <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </TabsContent>

      <TabsContent value="how" className="pt-5">
        <p className="text-foreground/85">{product.howToUse}</p>
      </TabsContent>

      <TabsContent value="specs" className="pt-5">
        <dl className="space-y-3 text-sm">
          {product.botanicalName && (
            <div>
              <dt className="font-semibold text-brand">Botanical name</dt>
              <dd className="text-foreground/85">{product.botanicalName}</dd>
            </div>
          )}
          {product.origin && (
            <div>
              <dt className="font-semibold text-brand">Origin</dt>
              <dd className="text-foreground/85">{product.origin}</dd>
            </div>
          )}
          {product.extractionMethod && (
            <div>
              <dt className="font-semibold text-brand">Extraction</dt>
              <dd className="text-foreground/85">{product.extractionMethod}</dd>
            </div>
          )}
          {product.ingredients && (
            <div>
              <dt className="font-semibold text-brand">Ingredients</dt>
              <dd className="text-foreground/85">{product.ingredients}</dd>
            </div>
          )}
          {product.safetyNotes && (
            <div>
              <dt className="font-semibold text-brand">Safety</dt>
              <dd className="text-foreground/85">{product.safetyNotes}</dd>
            </div>
          )}
        </dl>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
