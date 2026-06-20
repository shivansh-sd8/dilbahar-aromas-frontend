import type { ApiResponse, BlogPost, Category, CityPage, Product } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5050/api";

const DEFAULT_REVALIDATE = 60; // ISR window (seconds) for content pages

interface FetchOpts {
  revalidate?: number | false;
  token?: string;
  signal?: AbortSignal;
}

async function apiGet<T>(path: string, opts: FetchOpts = {}): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    headers,
    signal: opts.signal,
    next:
      opts.revalidate === false
        ? { revalidate: 0 }
        : { revalidate: opts.revalidate ?? DEFAULT_REVALIDATE },
  });

  if (!res.ok) {
    const err = new Error(`API ${res.status} for ${path}`);
    (err as Error & { status?: number }).status = res.status;
    throw err;
  }
  return res.json();
}

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((json as { message?: string }).message || `API ${res.status} for ${path}`);
  }
  return (json as { data: T }).data;
}

/** Returns null on 404 instead of throwing — handy for notFound() flows. */
async function apiGetOrNull<T>(path: string, opts: FetchOpts = {}): Promise<T | null> {
  try {
    const json = await apiGet<T>(path, opts);
    return json.data;
  } catch (e) {
    if ((e as Error & { status?: number }).status === 404) return null;
    throw e;
  }
}

export const api = {
  base: API_BASE,

  // Blog
  async listBlog(params: { language?: string; tag?: string; limit?: number } = {}) {
    const qs = new URLSearchParams();
    if (params.language) qs.set("language", params.language);
    if (params.tag) qs.set("tag", params.tag);
    if (params.limit) qs.set("limit", String(params.limit));
    const json = await apiGet<BlogPost[]>(`/blog?${qs.toString()}`);
    return { posts: json.data, meta: json.meta };
  },
  getBlogPost: (slug: string) => apiGetOrNull<BlogPost>(`/blog/${slug}`),

  // Categories
  async listCategories() {
    const json = await apiGet<Category[]>(`/categories`);
    return json.data;
  },
  getCategory: (slug: string) => apiGetOrNull<Category>(`/categories/${slug}`),

  // City pages
  async listCityPages() {
    const json = await apiGet<CityPage[]>(`/city-pages`);
    return json.data;
  },
  getCityPage: (slug: string) => apiGetOrNull<CityPage>(`/city-pages/${slug}`),

  // Products
  async listProducts(params: { category?: string; audience?: string; bestseller?: boolean; limit?: number } = {}) {
    const qs = new URLSearchParams();
    if (params.category) qs.set("category", params.category);
    if (params.audience) qs.set("audience", params.audience);
    if (params.bestseller) qs.set("bestseller", "true");
    if (params.limit) qs.set("limit", String(params.limit));
    const json = await apiGet<Product[]>(`/products?${qs.toString()}`);
    return json.data;
  },
  getProduct: (slug: string) => apiGetOrNull<Product>(`/products/${slug}`),

  // Enquiries (quote / sample / B2B) and orders
  createEnquiry: (payload: EnquiryPayload) =>
    apiPost<{ id: string; type: string }>(`/enquiries`, payload),
  createOrder: (payload: OrderPayload) => apiPost<OrderResult>(`/orders`, payload),
  trackOrder: (orderNumber: string, email: string) =>
    apiGetOrNull<TrackedOrder>(
      `/orders/track?orderNumber=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`,
      { revalidate: false }
    ),
};

export interface TrackedOrder {
  orderNumber: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  paymentMethod: "cod" | "razorpay";
  items: { slug?: string; name?: string; size?: string; qty: number; price: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
}

export interface EnquiryLineItem {
  slug?: string;
  name?: string;
  size?: string;
  qty?: number;
  price?: number;
}

export interface EnquiryPayload {
  type?: "quote" | "sample" | "b2b" | "wholesale" | "export";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  gstin?: string;
  city?: string;
  message?: string;
  items?: EnquiryLineItem[];
  source?: string;
}

export interface OrderPayload {
  customer: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  items: EnquiryLineItem[];
  paymentMethod?: "cod" | "razorpay";
  notes?: string;
}

export interface OrderResult {
  id: string;
  orderNumber: string;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  razorpayConfigured: boolean;
  razorpay: { orderId?: string; keyId?: string; amount?: number; error?: string } | null;
}

export default api;
