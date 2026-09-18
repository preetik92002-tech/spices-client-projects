import { PRODUCTS } from "@/lib/data/products";
import { HeroBanner } from "@/components/hero/HeroBanner";
import { BrandIntroSection } from "@/components/editorial/BrandIntroSection";
import { CollectionGrid } from "@/components/collections/CollectionGrid";
import { ProductRail } from "@/components/products/ProductRail";
import { SignatureMasalaStory } from "@/components/editorial/SignatureMasalaStory";
import { SpotlightReel } from "@/components/spotlight/SpotlightReel";
import { IngredientsCraftSection } from "@/components/editorial/IngredientsCraftSection";
import { RecipeMagazineSection } from "@/components/editorial/RecipeMagazineSection";
import { BrandPromiseSection } from "@/components/editorial/BrandPromiseSection";
import { ExportStorySection } from "@/components/editorial/ExportStorySection";
import { JournalPreviewSection } from "@/components/journal/JournalPreviewSection";
import { NewsletterSection } from "@/components/layout/NewsletterSection";

export default function Home() {
  const featuredProducts = PRODUCTS.filter((p) => p.featured);

  return (
    <div className="flex flex-col w-full">
      {/* 3. Hero */}
      <HeroBanner />

      {/* 4. Brand Introduction */}
      <BrandIntroSection />

      {/* 5. Collections */}
      <CollectionGrid />

      {/* 6. Featured Products Rail */}
      <ProductRail
        title="FLAVOURON COLLECTION"
        eyebrow="Slow-Roasted Harvest"
        subtitle="Our most revered small-batch masalas, ground at low temperatures for everyday kitchen elegance."
        products={featuredProducts}
        viewAllHref="/shop"
      />

      {/* 7. Signature Masala Story */}
      <SignatureMasalaStory />

      {/* 8. Spotlight 9:16 Video Reel */}
      <SpotlightReel />

      {/* 9. Ingredients / Craft */}
      <IngredientsCraftSection />

      {/* 10. Recipe / Use Cases */}
      <RecipeMagazineSection />

      {/* 11. Brand Promise */}
      <BrandPromiseSection />

      {/* 12. Export Story */}
      <ExportStorySection />

      {/* 13. Journal Preview */}
      <JournalPreviewSection />

      {/* 14. Newsletter */}
      <NewsletterSection />
    </div>
  );
}
