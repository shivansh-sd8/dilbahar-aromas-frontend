import type { Metadata } from "next";
import { site } from "./config";
import type { Seo } from "./types";

interface MetaInput {
  title: string;
  description?: string;
  seo?: Seo;
  path?: string;
  image?: string;
  type?: "website" | "article";
  locale?: string;
}

/** Builds a Next.js Metadata object from a page's content + optional SEO overrides. */
export function buildMetadata({
  title,
  description,
  seo,
  path = "/",
  image,
  type = "website",
  locale = "en_IN",
}: MetaInput): Metadata {
  const metaTitle = seo?.metaTitle || title;
  const metaDescription = seo?.metaDescription || description || site.description;
  const url = `${site.url}${path}`;
  const canonical = seo?.canonicalUrl || url;
  const ogImage = seo?.ogImage || image || `${site.url}/og-default.jpg`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: seo?.keywords,
    alternates: { canonical },
    robots: seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      siteName: site.name,
      images: [{ url: ogImage }],
      locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
  };
}

// ---- JSON-LD builders --------------------------------------------------

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    foundingDate: String(site.foundedYear),
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.pincode,
      addressCountry: "IN",
    },
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessLd(opts?: { city?: string; areaServed?: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: site.url,
    foundingDate: String(site.foundedYear),
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.pincode,
      addressCountry: "IN",
    },
    ...(opts?.areaServed ? { areaServed: opts.areaServed } : {}),
  };
}

export function articleLd(post: {
  title: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };
}

export function productLd(product: {
  name: string;
  slug: string;
  description?: string;
  images?: string[];
  brand?: string;
  priceFrom?: number;
  ratingAvg?: number;
  ratingCount?: number;
  sku?: string;
}) {
  const url = `${site.url}/products/${product.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images && product.images.length ? product.images : undefined,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand || site.name },
    ...(product.ratingCount && product.ratingCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.ratingAvg ?? 4.8,
            reviewCount: product.ratingCount,
          },
        }
      : {}),
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "INR",
      price: product.priceFrom ?? 0,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: site.name },
    },
  };
}

export function faqLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.url}`,
    })),
  };
}
