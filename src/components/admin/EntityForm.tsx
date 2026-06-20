"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/** Small labelled field helpers shared by admin editors. */

export const TextField: React.FC<{
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  hint?: string;
}> = ({ name, label, value, onChange, placeholder, required, type = "text", hint }) => (
  <div className="grid gap-1.5">
    <Label htmlFor={name}>
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    <Input
      id={name}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
    />
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

export const AreaField: React.FC<{
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
  required?: boolean;
}> = ({ name, label, value, onChange, rows = 4, hint, required }) => (
  <div className="grid gap-1.5">
    <Label htmlFor={name}>
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    <Textarea id={name} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} required={required} />
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

export const SelectField: React.FC<{
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}> = ({ name, label, value, onChange, options }) => (
  <div className="grid gap-1.5">
    <Label htmlFor={name}>{label}</Label>
    <select
      id={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

export const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
    <h2 className="font-display text-lg font-semibold text-brand">{title}</h2>
    <div className="mt-4 grid gap-4">{children}</div>
  </section>
);
