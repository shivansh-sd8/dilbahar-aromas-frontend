"use client";

import React from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5050/api";

const TOKEN_KEY = "dba_customer_token";

export interface CustomerUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: string;
}

interface CustomerAuthState {
  user: CustomerUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const CustomerAuthContext = React.createContext<CustomerAuthState | null>(null);

async function authRequest(path: string, body: unknown): Promise<{ token: string; user: CustomerUser }> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as { message?: string }).message || "Request failed");
  return (json as { data: { token: string; user: CustomerUser } }).data;
}

export function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<CustomerUser | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => setUser(json.data))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user: u } = await authRequest("/auth/login", { email, password });
    localStorage.setItem(TOKEN_KEY, token);
    setUser(u);
  };

  const signup = async (name: string, email: string, password: string) => {
    const { token, user: u } = await authRequest("/auth/signup", { name, email, password });
    localStorage.setItem(TOKEN_KEY, token);
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <CustomerAuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const ctx = React.useContext(CustomerAuthContext);
  if (!ctx) throw new Error("useCustomerAuth must be used within CustomerAuthProvider");
  return ctx;
}

export const customerToken = () =>
  typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY);
