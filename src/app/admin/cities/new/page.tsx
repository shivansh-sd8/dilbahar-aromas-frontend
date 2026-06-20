"use client";

import React from "react";
import CityEditor from "@/components/admin/CityEditor";

export default function NewCityPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand">New city page</h1>
      <p className="mt-1 text-muted-foreground">Add a city; the template fills any blanks automatically.</p>
      <div className="mt-6">
        <CityEditor />
      </div>
    </div>
  );
}
