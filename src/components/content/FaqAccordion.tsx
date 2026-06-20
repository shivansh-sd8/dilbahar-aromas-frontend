"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/lib/types";

const FaqAccordion: React.FC<{ faqs: Faq[] }> = ({ faqs }) => {
  return (
    <Accordion className="rounded-2xl border border-border bg-card px-4">
      {faqs.map((f, i) => (
        <AccordionItem key={i} value={`faq-${i}`}>
          <AccordionTrigger className="text-left text-base font-medium text-brand">
            {f.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">{f.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
