"use client";

import React from "react";

const ProductGallery: React.FC<{ images?: string[]; emoji?: string; name: string }> = ({
  images,
  emoji,
  name,
}) => {
  const [active, setActive] = React.useState(0);
  const hasImages = images && images.length > 0;

  return (
    <div>
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border bg-white text-[8rem]">
        {hasImages ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={images[active]} alt={name} className="h-full w-full object-contain" />
        ) : (
          <span aria-hidden>{emoji || "🫙"}</span>
        )}
      </div>
      {hasImages && images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={`size-16 overflow-hidden rounded-lg border ${
                i === active ? "border-primary" : "border-border"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`${name} ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
