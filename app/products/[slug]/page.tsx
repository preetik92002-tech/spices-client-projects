import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { ProductDetailView } from "@/components/products/ProductDetailView";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | FLAVOURON",
    };
  }

  return {
    title: `${product.name} | FLAVOURON Ultra Premium Spices`,
    description: product.description,
    openGraph: {
      title: `${product.name} | FLAVOURON`,
      description: product.shortDescription,
      images: [
        {
          url: product.images.primary,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, product.category, 4);

  return (
    <ProductDetailView product={product} relatedProducts={relatedProducts} />
  );
}
