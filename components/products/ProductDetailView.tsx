"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Flame,
  Leaf,
  Sparkles,
  ChevronRight,
  Check,
} from "lucide-react";
import { Product, ProductVariant } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.slug);

  // Multi-image gallery list with deduplication
  const galleryImages = [
    product.mainImage || product.images?.primary,
    ...(product.galleryImages || []),
    ...(product.editorialImages || []),
    product.images?.secondary,
    product.images?.back,
  ].filter((img, idx, arr) => Boolean(img) && arr.indexOf(img) === idx) as string[];

  const [activeImage, setActiveImage] = useState<string>(galleryImages[0]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "ingredients" | "usage" | "nutrition" | "safety"
  >("ingredients");
  const [addedNotification, setAddedNotification] = useState(false);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setAddedNotification(true);
    setTimeout(() => setAddedNotification(false), 3000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant, quantity);
  };

  return (
    <div className="w-full bg-[#FAF8F5] pb-24">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[var(--border)]/60 bg-[#FAF8F5] py-3.5 px-4 sm:px-6 lg:px-12 text-xs font-body-sans text-[var(--muted-text)]">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-[var(--foreground)]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--border)]" />
          <Link href="/collections" className="hover:text-[var(--foreground)]">
            Collections
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--border)]" />
          <Link
            href={`/collections/${product.category}`}
            className="hover:text-[var(--foreground)]"
          >
            {product.categoryLabel}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--border)]" />
          <span className="text-[var(--foreground)] font-medium truncate">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left: Gallery Column (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails rail */}
            {galleryImages.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    aria-label={`View packaging image ${idx + 1}`}
                    className={`relative w-18 h-22 sm:w-20 sm:h-26 rounded-sm bg-white p-2 border transition-all ${
                      activeImage === img
                        ? "border-[var(--primary-green)] ring-1 ring-[var(--primary-green)] shadow-xs"
                        : "border-[var(--border)] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} packaging view ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Viewport with object-contain */}
            <div className="relative flex-1 aspect-[4/5] bg-white rounded-sm border border-[var(--border)] p-6 sm:p-10 flex items-center justify-center shadow-xs">
              {product.badge && (
                <span className="absolute top-4 left-4 font-eyebrow text-[10px] bg-[var(--primary-green)] text-white px-3 py-1 rounded-full z-10 shadow-xs">
                  {product.badge}
                </span>
              )}

              <button
                onClick={() => toggleWishlist(product.slug)}
                aria-label="Add to wishlist"
                className={`absolute top-4 right-4 p-2.5 rounded-full border border-[var(--border)] bg-[#FAF8F5] transition-colors z-10 ${
                  isWishlisted
                    ? "text-[var(--terracotta)] border-[var(--terracotta)]/40"
                    : "text-[var(--muted-text)] hover:text-[var(--foreground)]"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted ? "fill-[var(--terracotta)]" : ""
                  }`}
                />
              </button>

              <div className="relative w-full h-full">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* Right: Product Buy Box & Specification (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              {/* Category & Origin */}
              <div className="flex items-center justify-between text-xs font-eyebrow text-[var(--muted-text)] mb-2">
                <span>{product.categoryLabel}</span>
                <span className="flex items-center gap-1 text-[var(--primary-green)] font-semibold normal-case">
                  <Leaf className="w-3.5 h-3.5" /> 100% Vegetarian
                </span>
              </div>

              {/* Title & Hindi Name */}
              <h1 className="font-editorial-heading text-3xl sm:text-4xl text-[var(--foreground)] font-normal tracking-tight uppercase">
                {product.name}
              </h1>
              {product.hindiName && (
                <p className="font-serif italic text-sm sm:text-base text-[var(--muted-text)] mt-1">
                  {product.hindiName}
                </p>
              )}

              <p className="text-sm font-body-sans text-[var(--muted-text)] mt-3 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Price & Savings */}
            <div className="py-4 border-y border-[var(--border)] flex items-baseline justify-between">
              <div className="flex items-baseline space-x-3">
                <span className="font-editorial-heading text-2xl sm:text-3xl font-semibold text-[var(--foreground)]">
                  ₹{selectedVariant.price.toLocaleString("en-IN")}.00
                </span>
                {selectedVariant.compareAtPrice && (
                  <span className="text-sm text-[var(--muted-text)] line-through">
                    ₹{selectedVariant.compareAtPrice.toLocaleString("en-IN")}.00
                  </span>
                )}
                {selectedVariant.compareAtPrice && (
                  <span className="text-xs font-semibold text-[var(--terracotta)] uppercase tracking-wider bg-[var(--sand)] px-2 py-0.5 rounded-full">
                    Save ₹
                    {selectedVariant.compareAtPrice - selectedVariant.price}
                  </span>
                )}
              </div>
              <span className="text-xs text-[var(--muted-text)] uppercase font-medium">
                Inclusive of all taxes
              </span>
            </div>

            {/* Spice Heat Index */}
            <div className="flex items-center space-x-3 text-xs">
              <span className="font-eyebrow text-[11px] text-[var(--muted-text)]">
                Spice Heat Index:
              </span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <Flame
                    key={level}
                    className={`w-4 h-4 ${
                      level <= product.spiceLevel
                        ? "text-[var(--terracotta)] fill-[var(--terracotta)]"
                        : "text-stone-300"
                    }`}
                  />
                ))}
                <span className="ml-2 font-medium text-[var(--foreground)] text-[11px]">
                  {product.spiceLevel <= 2
                    ? "Mild & Fragrant"
                    : product.spiceLevel === 3
                    ? "Medium Spicy"
                    : "Fiery Bold"}
                </span>
              </div>
            </div>

            {/* Variant / Weight Selector */}
            {product.variants.length > 0 && (
              <div>
                <span className="font-eyebrow text-[11px] text-[var(--muted-text)] block mb-2">
                  Select Pack Size
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 text-xs font-body-sans font-medium uppercase tracking-wider rounded-sm border transition-all ${
                        selectedVariant.id === v.id
                          ? "border-[var(--primary-green)] bg-[var(--primary-green)] text-white shadow-xs"
                          : "border-[var(--border)] bg-white text-[var(--foreground)] hover:border-stone-400"
                      }`}
                    >
                      {v.weight} — ₹{v.price}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & CTA Row */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-[var(--border)] bg-white rounded-full px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="p-1 text-[var(--muted-text)] hover:text-[var(--foreground)] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-body-sans text-sm font-semibold min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="p-1 text-[var(--muted-text)] hover:text-[var(--foreground)] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </Button>
              </div>

              {/* Buy Now direct trigger */}
              <Button
                variant="terracotta"
                size="md"
                className="w-full"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>

              {addedNotification && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--primary-green)] font-medium bg-emerald-50 py-2 rounded-sm border border-emerald-200 animate-in fade-in duration-300">
                  <Check className="w-4 h-4" /> Added to your spice bag!
                </div>
              )}
            </div>

            {/* FSSAI & Certified Trust Badges */}
            <div className="pt-4 border-t border-[var(--border)]/70 grid grid-cols-2 gap-3 text-[11px] text-[var(--muted-text)]">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[var(--primary-green)] shrink-0" />
                <span>Dual FSSAI Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[var(--muted-gold)] shrink-0" />
                <span>Cold-Milled in Kanpur</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Content Tabs: Ingredients, Cooking Directions, Nutrition, Safety */}
        <div className="mt-16 sm:mt-20 border-t border-[var(--border)] pt-10">
          {/* Tab Navigation */}
          <div className="flex items-center justify-center space-x-4 sm:space-x-8 border-b border-[var(--border)]/70 pb-4 overflow-x-auto scrollbar-none text-xs uppercase tracking-[0.18em] font-body-sans">
            <button
              onClick={() => setActiveTab("ingredients")}
              className={`pb-2 transition-all ${
                activeTab === "ingredients"
                  ? "border-b-2 border-[var(--primary-green)] text-[var(--primary-green)] font-semibold"
                  : "text-[var(--muted-text)] hover:text-[var(--foreground)]"
              }`}
            >
              Ingredients
            </button>
            <button
              onClick={() => setActiveTab("usage")}
              className={`pb-2 transition-all ${
                activeTab === "usage"
                  ? "border-b-2 border-[var(--primary-green)] text-[var(--primary-green)] font-semibold"
                  : "text-[var(--muted-text)] hover:text-[var(--foreground)]"
              }`}
            >
              How to Cook
            </button>
            {product.nutrition && (
              <button
                onClick={() => setActiveTab("nutrition")}
                className={`pb-2 transition-all ${
                  activeTab === "nutrition"
                    ? "border-b-2 border-[var(--primary-green)] text-[var(--primary-green)] font-semibold"
                    : "text-[var(--muted-text)] hover:text-[var(--foreground)]"
                }`}
              >
                Nutritional Facts
              </button>
            )}
            <button
              onClick={() => setActiveTab("safety")}
              className={`pb-2 transition-all ${
                activeTab === "safety"
                  ? "border-b-2 border-[var(--primary-green)] text-[var(--primary-green)] font-semibold"
                  : "text-[var(--muted-text)] hover:text-[var(--foreground)]"
              }`}
            >
              Origin & Food Safety
            </button>
          </div>

          {/* Tab Panes */}
          <div className="max-w-3xl mx-auto py-8 text-sm font-body-sans leading-relaxed text-[var(--foreground)]">
            {/* Ingredients */}
            {activeTab === "ingredients" && (
              <div className="space-y-4">
                <p className="font-light text-[var(--muted-text)]">
                  Handpicked natural botanicals and whole spices ground slowly to
                  preserve volatile aromatic oils:
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {product.ingredients.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full text-xs bg-white border border-[var(--border)] text-[var(--foreground)] shadow-2xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[var(--terracotta)] font-medium pt-2">
                  ✓ 100% Natural • No Added MSG • No Artificial Colours & Preservatives
                </p>
              </div>
            )}

            {/* How to Cook / Usage */}
            {activeTab === "usage" && (
              <div className="space-y-4">
                <h3 className="font-editorial-heading text-lg font-medium uppercase text-[var(--primary-green)]">
                  Master Recipe Directions
                </h3>
                <ol className="space-y-3 list-decimal list-inside text-sm text-[var(--muted-text)]">
                  {product.usage.map((step, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">
                      <span className="text-[var(--foreground)] font-normal">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 p-4 rounded-sm bg-[var(--sand-light)] border border-[var(--border)] text-xs text-[var(--muted-text)]">
                  <strong>Storage Tip:</strong> {product.storage}
                </div>
              </div>
            )}

            {/* Nutritional Facts */}
            {activeTab === "nutrition" && product.nutrition && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                  <h3 className="font-editorial-heading text-lg uppercase font-medium">
                    Nutritional Information
                  </h3>
                  <span className="text-xs text-[var(--muted-text)]">
                    Values per 100 g (Approx.)
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-white border border-[var(--border)] rounded-sm">
                    <span className="text-xs text-[var(--muted-text)] block">
                      Energy
                    </span>
                    <strong className="text-sm text-[var(--foreground)] font-semibold">
                      {product.nutrition.energy}
                    </strong>
                  </div>
                  <div className="p-3 bg-white border border-[var(--border)] rounded-sm">
                    <span className="text-xs text-[var(--muted-text)] block">
                      Protein
                    </span>
                    <strong className="text-sm text-[var(--foreground)] font-semibold">
                      {product.nutrition.protein}
                    </strong>
                  </div>
                  <div className="p-3 bg-white border border-[var(--border)] rounded-sm">
                    <span className="text-xs text-[var(--muted-text)] block">
                      Carbohydrate
                    </span>
                    <strong className="text-sm text-[var(--foreground)] font-semibold">
                      {product.nutrition.carbohydrate}
                    </strong>
                  </div>
                  <div className="p-3 bg-white border border-[var(--border)] rounded-sm">
                    <span className="text-xs text-[var(--muted-text)] block">
                      Total Fat
                    </span>
                    <strong className="text-sm text-[var(--foreground)] font-semibold">
                      {product.nutrition.totalFat}
                    </strong>
                  </div>
                  <div className="p-3 bg-white border border-[var(--border)] rounded-sm">
                    <span className="text-xs text-[var(--muted-text)] block">
                      Dietary Fibre
                    </span>
                    <strong className="text-sm text-[var(--foreground)] font-semibold">
                      {product.nutrition.dietaryFibre}
                    </strong>
                  </div>
                  <div className="p-3 bg-white border border-[var(--border)] rounded-sm">
                    <span className="text-xs text-[var(--muted-text)] block">
                      Sodium
                    </span>
                    <strong className="text-sm text-[var(--foreground)] font-semibold">
                      {product.nutrition.sodium}
                    </strong>
                  </div>
                </div>
                <p className="text-[11px] text-[var(--muted-text)] italic">
                  *Values are approximate and may vary naturally as the product
                  contains natural agricultural whole spices.
                </p>
              </div>
            )}

            {/* Origin & Safety */}
            {activeTab === "safety" && (
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 bg-white rounded-sm border border-[var(--border)] space-y-2">
                  <h4 className="font-editorial-heading uppercase text-sm font-semibold text-[var(--foreground)]">
                    Manufactured & Marketed By
                  </h4>
                  <p className="text-[var(--muted-text)] font-light">
                    <strong>SHIVOOHAM EXPORTS</strong>
                    <br />
                    Factory: Shivrajpur, Bahrampur, Bilhaur, Kanpur Nagar, Uttar
                    Pradesh - 209205
                    <br />
                    Registered Office: C-784, Barra Vishwa Bank, Barra 50, Nagar
                    Nigam, Zone-17, Kanpur Nagar, Uttar Pradesh - 208227
                  </p>
                </div>

                <div className="p-4 bg-white rounded-sm border border-[var(--border)] space-y-2">
                  <h4 className="font-editorial-heading uppercase text-sm font-semibold text-[var(--foreground)]">
                    FSSAI Licensing
                  </h4>
                  <p className="text-[var(--muted-text)]">
                    Manufacturing Lic. No: <strong>22726317000406</strong>
                    <br />
                    Packing & Marketing Lic. No: <strong>22725663000269</strong>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Editorial Culinary Showcase Section */}
        {product.editorialImages && product.editorialImages.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-12 border-t border-stone-200/80">
            <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-2">
                Culinary Craft & Preparation
              </span>
              <h3 className="font-editorial-heading text-2xl sm:text-4xl text-stone-900 uppercase font-light">
                The Dish in Full Splendour
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-500 font-sans max-w-lg mx-auto">
                Prepared authentically with Flavouron {product.name}, slow-roasted whole spices, and fresh kitchen ingredients.
              </p>
            </div>

            <div className={cn(
              "gap-6 max-w-5xl mx-auto",
              product.editorialImages.length > 1 ? "grid grid-cols-1 md:grid-cols-2" : "flex justify-center"
            )}>
              {product.editorialImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-full max-w-md md:max-w-none aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-stone-200/70 group"
                >
                  <Image
                    src={img}
                    alt={`${product.name} culinary presentation ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white text-xs tracking-widest uppercase font-sans font-medium">
                      Flavouron Editorial Archive
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products Rail */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[var(--border)]">
            <div className="text-center mb-10">
              <span className="font-eyebrow text-xs text-[var(--primary-green)]/80 tracking-[0.2em] block mb-2">
                Curated Pairings
              </span>
              <h2 className="font-editorial-heading text-2xl sm:text-3xl uppercase font-light text-[var(--foreground)]">
                You May Also Relish
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
