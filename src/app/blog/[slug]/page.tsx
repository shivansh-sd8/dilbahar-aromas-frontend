import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import { api } from "@/lib/api";
import { buildMetadata, articleLd, breadcrumbLd } from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const res = await api.listBlog({ limit: 1000 });
    return res.posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await api.getBlogPost(slug);
  if (!post) return buildMetadata({ title: "Post not found", path: `/blog/${slug}` });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    seo: post.seo,
    path: `/blog/${slug}`,
    image: post.coverImage,
    type: "article",
    locale: post.language === "hi" ? "hi_IN" : "en_IN",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await api.getBlogPost(slug);
  if (!post) notFound();

  const isHi = post.language === "hi";
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <>
      <JsonLd
        data={[
          articleLd({
            title: post.title,
            description: post.excerpt,
            image: post.coverImage,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            slug: post.slug,
          }),
          breadcrumbLd([
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <PageHeader
        title={post.title}
        subtitle={[post.author, date].filter(Boolean).join(" · ")}
        crumbs={[{ label: "Blog", href: "/blog" }, { label: post.category || "Article" }]}
      />

      <article className="container-px py-12">
        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title}
            className="mx-auto mb-8 max-h-[420px] w-full max-w-3xl rounded-2xl object-cover"
          />
        )}
        <div
          className={`prose-dba mx-auto max-w-3xl leading-relaxed text-foreground/85 [&_a]:text-primary [&_a]:underline [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-brand [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-brand [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 ${isHi ? "lang-hi" : ""}`}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {post.tags.length > 0 && (
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                #{t}
              </span>
            ))}
          </div>
        )}

        <div className="mx-auto mt-10 max-w-3xl border-t border-border pt-6">
          <Link href="/blog" className="text-sm font-semibold text-primary hover:underline">
            ← Back to all guides
          </Link>
        </div>
      </article>
    </>
  );
}
