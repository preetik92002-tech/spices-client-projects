import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/data/categories";
import { PRODUCTS } from "@/lib/data/products";
import { CollectionFilterView } from "@/components/collections/CollectionFilterView";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "All Collections | FLAVOURON Artisanal Spice Blends",
  description:
    "Explore our complete range of slow-roasted curry masalas, tandoori marinades, gourmet herbs, and quick bite taste enhancers by Shivooham Exports.",
};

export default function CollectionsPage() {
  return (
    <div className="w-full bg-[#FAF8F5]">
      {/* Full-Width Photographic Editorial Hero */}
      <section className="relative w-full h-[300px] sm:h-[380px] md:h-[460px] overflow-hidden flex items-center justify-center text-center">
        <Image
          src="/images/collections/the-spice-cellar.webp"
          alt="The Spice Cellar - Flavouron Master Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-102 transition-transform duration-1000"
        />
        {/* Soft atmospheric gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/40" />

        <div className="relative z-10 px-4 max-w-3xl mx-auto">
          <span className="font-eyebrow text-[10px] sm:text-xs tracking-[0.28em] text-[var(--muted-gold)] uppercase block mb-3 font-medium drop-shadow-sm">
            HERITAGE CURATIONS
          </span>
          <h1 className="font-editorial-heading text-4xl sm:text-5xl lg:text-6xl font-light uppercase tracking-tight text-[#FAF8F5] drop-shadow-md">
            The Spice Cellar
          </h1>
          <p className="mt-4 text-xs sm:text-sm md:text-base font-body-sans text-white/90 font-light leading-relaxed max-w-xl mx-auto drop-shadow-sm">
            From the royal court recipes of Awadh to the fiery kitchens of
            Kolhapur, explore authentic whole-spice blends cold-milled to
            perfection.
          </p>
        </div>
      </section>

      {/* Visual Collections Rail */}
      <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="font-eyebrow text-xs uppercase text-[var(--muted-text)] tracking-widest">
            Featured Categories
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/collections/${cat.slug}`}
              className="group flex flex-col items-center bg-white border border-[var(--border)] rounded-sm p-4 text-center transition-all hover:border-[var(--muted-gold)] hover:shadow-xs"
            >
              <div className="relative w-full aspect-square bg-[#F3EDE2] rounded-sm p-2 flex items-center justify-center overflow-hidden mb-3">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-editorial-heading text-xs sm:text-sm uppercase font-semibold text-[var(--foreground)] group-hover:text-[var(--primary-green)] flex items-center gap-1">
                <span>{cat.name}</span>
                <ArrowRight className="w-3 h-3 text-[var(--terracotta)] group-hover:translate-x-0.5 transition-transform" />
              </h3>
              <span className="text-[10px] text-[var(--muted-text)] mt-0.5 line-clamp-1">
                {cat.tagline}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Filterable Full Catalog */}
      <CollectionFilterView initialProducts={PRODUCTS} />
    </div>
  );
}
