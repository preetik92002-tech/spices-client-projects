import { Metadata } from "next";
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

  return (
    <div className="w-full bg-[#FAF8F5]">
      {/* Editorial Category Hero */}
      <section className="bg-gradient-to-b from-[#143627] to-[#1c4231] text-[#FAF8F5] py-14 sm:py-20 text-center px-4">
        <Container size="narrow">
          <span className="font-eyebrow text-xs tracking-[0.24em] text-[var(--muted-gold)] uppercase block mb-2">
            COLLECTION RESERVE
          </span>
          <h1 className="font-editorial-heading text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight text-[#FAF8F5]">
            {category.name}
          </h1>
          <p className="mt-3 text-xs sm:text-sm font-body-sans text-white/80 font-light leading-relaxed max-w-lg mx-auto">
            {category.description}
          </p>
        </Container>
      </section>

      {/* Filterable Products View for this Category */}
      <CollectionFilterView
        initialProducts={categoryProducts}
        currentCategorySlug={category.slug}
      />
    </div>
  );
}
