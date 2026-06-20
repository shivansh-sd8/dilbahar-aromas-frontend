"use client";

import React from "react";
import { useParams } from "next/navigation";
import CityEditor from "@/components/admin/CityEditor";
import adminApi from "@/lib/adminApi";

export default function EditCityPage() {
  const params = useParams<{ id: string }>();
  const [city, setCity] = React.useState<Awaited<ReturnType<typeof adminApi.getCity>> | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!params?.id) return;
    adminApi.getCity(params.id).then(setCity).catch((e) => setError(e.message));
  }, [params?.id]);

  if (error) return <p className="text-destructive">{error}</p>;
  if (!city) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand">Edit city page</h1>
      <p className="mt-1 text-muted-foreground">{city.city}</p>
      <div className="mt-6">
        <CityEditor initial={city} />
      </div>
    </div>
  );
}
