"use client";

import type { ApiResponse, BlogPost, Category, CityPage, Product, Enquiry, Order } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5050/api";

const TOKEN_KEY = "dba_admin_token";

export const tokenStore = {
  get: () => (typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY)),
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = tokenStore.get();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const json = (await res.json().catch(() => ({}))) as ApiResponse<T> & { message?: string };
  if (!res.ok) {
    throw new Error(json.message || `Request failed (${res.status})`);
  }
  return json.data as T;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export const adminApi = {
  login: (email: string, password: string) =>
    request<{ token: string; user: AuthUser }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  me: () => request<AuthUser>("/auth/me"),

  // Blog — token attached, so privileged users get all statuses
  listBlog: () => request<BlogPost[]>("/blog?limit=500"),
  getBlog: (id: string) => request<BlogPost>(`/blog/admin/${id}`),
  createBlog: (data: Partial<BlogPost>) => request<BlogPost>("/blog", { method: "POST", body: JSON.stringify(data) }),
  updateBlog: (id: string, data: Partial<BlogPost>) =>
    request<BlogPost>(`/blog/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteBlog: (id: string) => request<{ message: string }>(`/blog/${id}`, { method: "DELETE" }),

  // Cities
  listCities: () => request<CityPage[]>("/city-pages"),
  getCity: (id: string) => request<CityPage>(`/city-pages/admin/${id}`),
  createCity: (data: Partial<CityPage>) => request<CityPage>("/city-pages", { method: "POST", body: JSON.stringify(data) }),
  updateCity: (id: string, data: Partial<CityPage>) =>
    request<CityPage>(`/city-pages/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCity: (id: string) => request<{ message: string }>(`/city-pages/${id}`, { method: "DELETE" }),

  // Products
  listProducts: () => request<Product[]>("/products?limit=500"),
  getProduct: (id: string) => request<Product>(`/products/admin/${id}`),
  createProduct: (data: Partial<Product>) => request<Product>("/products", { method: "POST", body: JSON.stringify(data) }),
  updateProduct: (id: string, data: Partial<Product>) =>
    request<Product>(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProduct: (id: string) => request<{ message: string }>(`/products/${id}`, { method: "DELETE" }),

  // Enquiries (quotes / B2B / samples)
  listEnquiries: (params: { type?: string; status?: string } = {}) => {
    const qs = new URLSearchParams();
    if (params.type) qs.set("type", params.type);
    if (params.status) qs.set("status", params.status);
    return request<Enquiry[]>(`/enquiries${qs.toString() ? `?${qs}` : ""}`);
  },
  getEnquiry: (id: string) => request<Enquiry>(`/enquiries/${id}`),
  updateEnquiryStatus: (id: string, status: string) =>
    request<Enquiry>(`/enquiries/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),

  // Orders
  listOrders: (params: { status?: string } = {}) => {
    const qs = new URLSearchParams();
    if (params.status) qs.set("status", params.status);
    return request<Order[]>(`/orders${qs.toString() ? `?${qs}` : ""}`);
  },
  getOrder: (id: string) => request<Order>(`/orders/${id}`),
  updateOrder: (id: string, data: { status?: string; paymentStatus?: string }) =>
    request<Order>(`/orders/${id}`, { method: "PATCH", body: JSON.stringify(data) }),

  // Categories
  listCategories: () => request<Category[]>("/categories"),
  updateCategory: (id: string, data: Partial<Category>) =>
    request<Category>(`/categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  createCategory: (data: Partial<Category>) =>
    request<Category>("/categories", { method: "POST", body: JSON.stringify(data) }),
};

export default adminApi;
