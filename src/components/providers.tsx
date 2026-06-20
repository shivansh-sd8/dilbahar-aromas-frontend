"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/lib/cart";
import { CustomerAuthProvider } from "@/lib/customerAuth";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, refetchOnWindowFocus: false },
        },
      })
  );

  return (
    <QueryClientProvider client={client}>
      <CustomerAuthProvider>
        <CartProvider>{children}</CartProvider>
      </CustomerAuthProvider>
    </QueryClientProvider>
  );
}
