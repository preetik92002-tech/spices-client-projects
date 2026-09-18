import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategoryBySlug } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import { CollectionFilterView } from "@/components/collections/CollectionFilterView";
import { Container } from "@/components/ui/Container";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Collection Not Found | FLAVOURON",
    };
  }

  return {
    title: `${category.name} | FLAVOURON Artisanal Spices`,
    description: category.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(category.slug);
  const heroImg = category.heroImage || "/images/collections/the-spice-cellar.webp";

  return (
    <div className="w-full bg-[#FAF8F5]">
      {/* Full-Width Photographic Editorial Category Hero */}
      <section className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] overflow-hidden flex items-center justify-center text-center">
        <Image
          src={heroImg}
          alt={category.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-102 transition-transform duration-1000"
        />
        {/* Cinematic dark scrim for flawless contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/40" />

        <div className="relative z-10 px-4 max-w-3xl mx-auto">
          <span className="font-eyebrow text-[10px] sm:text-xs tracking-[0.28em] text-[var(--muted-gold)] uppercase block mb-2 font-medium drop-shadow-sm">
            COLLECTION RESERVE
          </span>
          <h1 className="font-editorial-heading text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight text-[#FAF8F5] drop-shadow-md">
            {category.name}
          </h1>
          <p className="mt-3 text-xs sm:text-sm font-body-sans text-white/90 font-light leading-relaxed max-w-xl mx-auto drop-shadow-sm">
            {category.description}
          </p>
        </div>
      </section>

      {/* Filterable Products View for this Category */}
      <CollectionFilterView
        initialProducts={categoryProducts}
        currentCategorySlug={category.slug}
      />
    </div>
  );
}
