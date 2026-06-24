import type { Metadata } from "next";
import DemoLanding from "@/components/demo/DemoLanding";

export const metadata: Metadata = {
  title: "Palette 1 Preview — Forest Green & Warm Gold",
  robots: { index: false, follow: false },
};

export default function Demo1Page() {
  return <DemoLanding paletteClass="palette-1" label="Forest Green & Gold" />;
}
