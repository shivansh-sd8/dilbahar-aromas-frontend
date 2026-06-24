import type { Metadata } from "next";
import DemoLanding from "@/components/demo/DemoLanding";

export const metadata: Metadata = {
  title: "Palette 2 Preview — Emerald & Champagne, Burnt-Orange CTA",
  robots: { index: false, follow: false },
};

export default function Demo2Page() {
  return <DemoLanding paletteClass="palette-2" label="Emerald & Burnt Orange" />;
}
