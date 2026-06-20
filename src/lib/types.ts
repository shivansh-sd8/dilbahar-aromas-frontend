export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
  structuredDataType?:
    | "Article"
    | "BlogPosting"
    | "Product"
    | "LocalBusiness"
    | "FAQPage"
    | "WebPage"
    | "None";
}

export interface Faq {
  question: string;
  answer: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body: string;
  coverImage?: string;
  author?: string;
  tags: string[];
  category?: string;
  language: "en" | "hi";
  status: "draft" | "published";
  readingMinutes?: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  seo?: Seo;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  heading?: string;
  introCopy?: string;
  seoCopy?: string;
  image?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
  faqs?: Faq[];
  seo?: Seo;
}

export interface CityPage {
  _id: string;
  city: string;
  state: string;
  slug: string;
  heading: string;
  intro: string;
  body: string;
  areasServed: string[];
  featuredCategorySlugs: string[];
  isActive: boolean;
  seo: Seo;
  updatedAt?: string;
}

export interface ProductVariant {
  size: string;
  sku?: string;
  price: number;
  mrp?: number;
  stock?: number;
  isDefault?: boolean;
}

export interface Product {
  _id: string;
  name: string;
  localName?: string;
  slug: string;
  botanicalName?: string;
  emoji?: string;
  images?: string[];
  tagline?: string;
  shortDescription?: string;
  description?: string;
  origin?: string;
  extractionMethod?: string;
  useTags: string[];
  benefits: string[];
  howToUse?: string;
  ingredients?: string;
  safetyNotes?: string;
  audience: "D2C" | "B2B" | "Both";
  categorySlugs: string[];
  variants: ProductVariant[];
  faqs?: Faq[];
  relatedSlugs?: string[];
  ratingAvg?: number;
  ratingCount?: number;
  bestseller?: boolean;
  isActive?: boolean;
  order?: number;
  priceFrom?: number;
  seo?: Seo;
  createdAt?: string;
  updatedAt?: string;
}

export interface LineItem {
  slug?: string;
  name?: string;
  size?: string;
  qty: number;
  price: number;
}

export interface Enquiry {
  _id: string;
  type: "quote" | "sample" | "b2b" | "wholesale" | "export";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  gstin?: string;
  city?: string;
  message?: string;
  items: LineItem[];
  status: "new" | "contacted" | "quoted" | "closed";
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  items: LineItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: "cod" | "razorpay";
  paymentStatus: "pending" | "paid" | "failed";
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: { total: number; page: number; limit: number; pages: number };
  message?: string;
}
