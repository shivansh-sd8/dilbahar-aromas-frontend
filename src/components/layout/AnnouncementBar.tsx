import React from "react";

const messages = [
  "GC-MS verified, single-origin oils — distilled in Kannauj since 1959",
  "Free shipping on orders over ₹999 · COD available across India",
  "Distilled in Kannauj since 1959 · We distil, we don't resell",
];

const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-brand text-brand-foreground text-xs sm:text-sm">
      <div className="container-px flex items-center justify-center gap-2 py-2 text-center">
        <span className="text-gold">✦</span>
        <span className="truncate">{messages[0]}</span>
        <span className="hidden text-gold sm:inline">✦</span>
        <span className="hidden sm:inline">{messages[1]}</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
