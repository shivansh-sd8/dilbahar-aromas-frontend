import React from "react";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Renders structured data as a sanitized JSON-LD script tag.
 * Replaces `<` with its unicode escape to prevent XSS (per Next.js guidance).
 */
const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};

export default JsonLd;
