// Central, data-backed site configuration derived from the Dil Bahar Aromas
// architecture document. Used across nav, footer, homepage and SEO.

export const site = {
  name: "Dil Bahar Aromas",
  tagline: "Pure Essential Oils from Kannauj — Verified Every Batch Since 1959",
  domain: "dilbahararomas.com",
  url: "https://dilbahararomas.com",
  foundedYear: 1959,
  description:
    "100% pure, GC-MS verified essential oils distilled in the copper degs of Kannauj since 1959. D2C retail and B2B wholesale — COD available, free shipping over ₹999.",
  email: "info@dilbahararomas.com",
  b2bEmail: "b2b@dilbahararomas.com",
  phone: "+91-7080649611",
  whatsapp: "917080649611",
  address: {
    street: "Jain Street",
    city: "Kannauj",
    state: "Uttar Pradesh",
    pincode: "209725",
    country: "India",
  },
} as const;

export const whatsappLink = `https://wa.me/${site.whatsapp}`;

// Trust micro-bullets — verifiable operational facts (no certification badges)
export const trustSignals: string[] = [
  "65+ years distilling",
  "GC-MS every batch",
  "Steam distilled",
  "We distil, not resell",
  "Free shipping ₹999+",
  "COD available",
  "Ships in 48 hours",
];

export const heroStats: { value: string; label: string }[] = [
  { value: "65+", label: "Years distilling" },
  { value: "18", label: "Countries shipped" },
  { value: "200+", label: "B2B clients" },
];

// Categories (mirror backend seed; used for nav before API hydration)
export const categories: { name: string; slug: string; blurb: string }[] = [
  { name: "Essential Oils", slug: "essential-oils", blurb: "All single-origin oils" },
  { name: "Hair Growth Oils", slug: "hair-growth-oils", blurb: "Ruh Khus, Nilgiri, Laung" },
  { name: "Skin Care Oils", slug: "skin-care-oils", blurb: "Sandalwood, Kesar, Hina" },
  { name: "Pooja & Ritual Oils", slug: "pooja-ritual-oils", blurb: "Sandalwood, Hina, Kewra" },
  { name: "Floral Waters", slug: "floral-waters", blurb: "Food & cosmetic Kewra water" },
  { name: "Luxury Oils", slug: "luxury-oils", blurb: "Ruh Khus, Mysore Sandalwood, Kesar" },
];

export interface Product {
  name: string;
  localName: string;
  slug: string;
  emoji: string;
  tagline: string;
  useTags: string[];
  priceFrom: number;
  audience: "D2C" | "B2B" | "Both";
  bestseller?: boolean;
}

// 13 SKUs from the product analysis (D2C set + musk grades noted in B2B phase)
export const products: Product[] = [
  { name: "Eucalyptus / Nilgiri Oil", localName: "Neelgiri Tel", slug: "nilgiri-oil-neelgiri-tel", emoji: "🌿", tagline: "Cooling steam-inhalation classic", useTags: ["Cold & congestion", "Diffuser"], priceFrom: 199, audience: "Both", bestseller: true },
  { name: "Ruh Khus (Vetiver) Oil", localName: "Khus", slug: "ruh-khus-vetiver-oil", emoji: "🌾", tagline: "The oil of tranquility", useTags: ["Hair & scalp", "Perfumery"], priceFrom: 899, audience: "Both", bestseller: true },
  { name: "Sandalwood Oil", localName: "Chandan", slug: "sandalwood-oil-chandan", emoji: "🪵", tagline: "Mysore-grade, skin & ritual", useTags: ["Skincare", "Pooja"], priceFrom: 1499, audience: "Both", bestseller: true },
  { name: "Hina Oil", localName: "Heena", slug: "hina-oil-heena", emoji: "🌸", tagline: "Traditional wedding attar", useTags: ["Perfumery", "Pooja"], priceFrom: 699, audience: "Both" },
  { name: "Kewra Water", localName: "Kewda Jal", slug: "kewra-water-kewda-jal", emoji: "💧", tagline: "Food + cosmetic grade", useTags: ["Biryani", "Skincare"], priceFrom: 199, audience: "Both" },
  { name: "Laung (Clove) Oil", localName: "Laung Tel", slug: "laung-clove-oil", emoji: "🌰", tagline: "Warm, potent, purifying", useTags: ["Hair", "Oral care"], priceFrom: 299, audience: "Both" },
  { name: "Kesar (Saffron) Oil", localName: "Kesar Tel", slug: "kesar-saffron-oil", emoji: "🌺", tagline: "Rare luxury distillation", useTags: ["Skincare", "Gifting"], priceFrom: 1999, audience: "Both" },
  { name: "Cardamom Oil", localName: "Elaichi", slug: "cardamom-oil-elaichi", emoji: "🫛", tagline: "Sweet-spicy aromatic", useTags: ["Aromatherapy", "Flavour"], priceFrom: 499, audience: "Both" },
  { name: "Ketaki Scent", localName: "Kewda Floral", slug: "ketaki-scent-kewda-floral", emoji: "🏵️", tagline: "Heritage floral note", useTags: ["Perfumery"], priceFrom: 599, audience: "Both" },
  { name: "Eucalyptus Essential Oil", localName: "Eucalyptus", slug: "eucalyptus-essential-oil", emoji: "🍃", tagline: "Pure steam-distilled", useTags: ["Cold & congestion"], priceFrom: 199, audience: "Both" },
];

// Discovery kits / bundles (§7.2)
export const bundles: { name: string; slug: string; desc: string; price: number }[] = [
  { name: "Discovery Starter Kit", slug: "discovery-starter-kit", desc: "5 oils × 5ml — lowest-risk first purchase", price: 999 },
  { name: "Hair Growth Kit", slug: "hair-growth-kit", desc: "Ruh Khus + Nilgiri + Laung × 15ml", price: 899 },
  { name: "Kannauj Heritage Set", slug: "kannauj-heritage-set", desc: "Ruh Khus + Hina + Kewra + Ketaki × 10ml", price: 1299 },
  { name: "Sacred Oils Gift Set", slug: "sacred-oils-gift-set", desc: "Sandalwood + Kesar + Hina × 5ml", price: 2999 },
];

export interface Review {
  quote: string;
  author: string;
  role: string;
  location: string;
}

export const reviews: Review[] = [
  {
    quote:
      "The Ruh Khus quality rivals anything I source in Grasse. The per-batch GC-MS report sealed it for our export orders.",
    author: "James W.",
    role: "Independent perfumer",
    location: "London, UK",
  },
  {
    quote:
      "Finally a Kannauj supplier that ships documentation before dispatch. Their agarbatti compounds are consistent batch after batch.",
    author: "R. Sharma",
    role: "Procurement Manager",
    location: "Agarbatti brand, Bengaluru",
  },
  {
    quote:
      "Genuinely pure oils with real documentation behind them — first time I've trusted an oil brand online. The nilgiri is incredible.",
    author: "Ananya G.",
    role: "Wellness buyer",
    location: "South Delhi",
  },
];

// Audience toggle cards (§3 Section 3)
export const audienceCards = {
  d2c: [
    { title: "Hair & scalp", desc: "Ruh Khus, Nilgiri & Laung for traditional hair care", icon: "sprout" },
    { title: "Skincare & wellness", desc: "Sandalwood, Kesar & Hina for radiant skin", icon: "sparkles" },
    { title: "Gifting & festivals", desc: "Heritage sets for Diwali, Navratri & weddings", icon: "gift" },
  ],
  b2b: [
    { title: "Agarbatti manufacturers", desc: "Consistent fragrance compounds, bulk MOQ", icon: "factory" },
    { title: "Cosmetic & personal care", desc: "GC-MS verified actives with full documentation", icon: "flask-conical" },
    { title: "Export / international", desc: "DG-compliant packing, LC/TT payment, DHL & FedEx", icon: "globe" },
  ],
};
