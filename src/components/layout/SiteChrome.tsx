"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppBubble from "./WhatsAppBubble";

/**
 * Renders the public store chrome (announcement bar, header, footer, WhatsApp)
 * around page content — except on /admin routes, which have their own shell.
 */
const SiteChrome: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppBubble />
    </>
  );
};

export default SiteChrome;
