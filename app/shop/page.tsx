import { Metadata } from "next";
import { PRODUCTS } from "@/lib/data/products";
import { CollectionFilterView } from "@/components/collections/CollectionFilterView";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Shop All Spices & Masalas | FLAVOURON",
  description:
    "Explore our complete range of authentic Indian whole spices, slow-roasted masalas, and seasonings by Shivooham Exports.",
};

export default function ShopPage() {
  return (
    <div className="w-full bg-[#FAF8F5]">
      {/* Header */}
      <section className="bg-white border-b border-[var(--border)] py-12 px-4 sm:px-6 lg:px-12 text-center">
        <Container size="narrow">
          <span className="font-eyebrow text-xs tracking-[0.2em] text-[var(--primary-green)] uppercase block mb-2">
            SHIVOOHAM EXPORTS
          </span>
          <h1 className="font-editorial-heading text-3xl sm:text-4xl lg:text-5xl uppercase font-light text-[var(--foreground)]">
            Shop All Blends
          </h1>
          <p className="mt-3 text-xs sm:text-sm font-body-sans text-[var(--muted-text)] max-w-md mx-auto leading-relaxed">
            Discover 100% vegetarian, cold-process ground Indian masalas and
            aromatic seasoning powders.
          </p>
        </Container>
      </section>

      {/* Filterable Catalog View */}
      <CollectionFilterView initialProducts={PRODUCTS} />
    </div>
  );
}
