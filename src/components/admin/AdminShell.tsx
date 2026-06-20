"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, MapPin, Tags, Package, ShoppingCart, MessageSquareQuote, LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthProvider";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquareQuote },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Blog posts", href: "/admin/blog", icon: FileText },
  { label: "City pages", href: "/admin/cities", icon: MapPin },
  { label: "Categories", href: "/admin/categories", icon: Tags },
];

const AdminShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  const isLogin = pathname === "/admin/login";

  React.useEffect(() => {
    if (!loading && !user && !isLogin) {
      router.replace("/admin/login");
    }
  }, [loading, user, isLogin, router]);

  if (isLogin) return <div className="min-h-screen bg-secondary/30">{children}</div>;

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/30 text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-secondary/20">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-brand text-brand-foreground md:flex">
        <div className="border-b border-brand-foreground/10 p-5">
          <span className="font-display text-lg font-bold text-gold">Dil Bahar Admin</span>
          <p className="mt-1 text-xs text-brand-foreground/60">{user.email}</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((n) => {
            const active = pathname === n.href || (n.href !== "/admin" && pathname?.startsWith(n.href));
            const Icon = n.icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  active ? "bg-gold text-brand" : "text-brand-foreground/80 hover:bg-brand-foreground/10"
                }`}
              >
                <Icon className="size-4" /> {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-2 border-t border-brand-foreground/10 p-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-brand-foreground/80 hover:bg-brand-foreground/10"
          >
            <ExternalLink className="size-4" /> View site
          </a>
          <button
            onClick={() => {
              logout();
              router.replace("/admin/login");
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-brand-foreground/80 hover:bg-brand-foreground/10"
          >
            <LogOut className="size-4" /> Log out
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3 md:hidden">
          <span className="font-display font-bold text-brand">Dil Bahar Admin</span>
          <Button variant="ghost" size="sm" onClick={() => { logout(); router.replace("/admin/login"); }}>
            Log out
          </Button>
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminShell;
