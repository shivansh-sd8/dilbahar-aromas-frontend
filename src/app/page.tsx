import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import AudienceToggle from "@/components/home/AudienceToggle";
import CategoryGrid from "@/components/home/CategoryGrid";
import BestSellers from "@/components/home/BestSellers";
import HeritageSection from "@/components/home/HeritageSection";
import B2BLeadForm from "@/components/home/B2BLeadForm";
import Reviews from "@/components/home/Reviews";
import BlogPreview from "@/components/home/BlogPreview";
import StickyCta from "@/components/home/StickyCta";
import JsonLd from "@/components/seo/JsonLd";
import { organizationLd, websiteLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationLd(), websiteLd()]} />
      <Hero />
      <TrustBar />
      <AudienceToggle />
      <CategoryGrid />
      <BestSellers />
      <HeritageSection />
      <B2BLeadForm />
      <Reviews />
      <BlogPreview />
      <StickyCta />
    </>
  );
}
