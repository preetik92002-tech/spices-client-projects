"use client";

import React from "react";
import Link from "next/link";
import { Plus, Heart, ArrowRight } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductImageSwap } from "./ProductImageSwap";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFavorited = isInWishlist(product.slug);

  return (
    <div className="group relative flex flex-col justify-between bg-white border border-stone-200/80 rounded-sm p-4 sm:p-5 transition-all duration-500 hover:shadow-xl hover:border-stone-300">
      {/* Wishlist floating toggle */}
      <button
        onClick={() => toggleWishlist(product.slug)}
        aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur-xs border border-stone-200/80 text-stone-400 hover:text-[#B44C2D] transition-colors shadow-xs"
      >
        <Heart
          className={`w-3.5 h-3.5 transition-colors ${
            isFavorited ? "fill-[#B44C2D] text-[#B44C2D]" : ""
          }`}
        />
      </button>

      {/* Product Image Stage with Two-Image Desktop Crossfade & Mobile Auto-Swap */}
      <div>
        <Link
          href={`/products/${product.slug}`}
          className="block relative w-full overflow-hidden select-none"
        >
          <ProductImageSwap
            primaryImage={product.mainImage}
            secondaryImage={product.hoverImage}
            alt={`Flavouron ${product.name} ${product.weight}`}
            badge={product.badge}
          />
        </Link>

        {/* Product Meta with generous editorial whitespace */}
        <div className="mt-5 flex flex-col space-y-2 text-left">
          <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-stone-500">
            {product.categoryLabel}
          </span>

          <Link href={`/products/${product.slug}`}>
            <h3 className="font-editorial-heading text-lg sm:text-xl font-normal text-stone-900 group-hover:text-[#143627] transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs font-sans text-stone-600 line-clamp-2 leading-relaxed font-light">
            {product.shortDescription || product.tagline}
          </p>

          <div className="pt-2 flex items-baseline justify-between border-t border-stone-100 mt-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-sm sm:text-base font-semibold text-stone-900 font-mono">
                ₹{product.price.toLocaleString("en-IN")}.00
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-stone-400 line-through font-mono">
                  ₹{product.compareAtPrice.toLocaleString("en-IN")}.00
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-500 uppercase font-sans tracking-widest font-medium">
              {product.weight}
            </span>
          </div>
        </div>
      </div>

      {/* Actions: Refined Explore Button + Quick Add */}
      <div className="mt-5 pt-3 border-t border-stone-200/60 flex items-center gap-2">
        <Link
          href={`/products/${product.slug}`}
          className="group/btn flex-1 inline-flex items-center justify-center gap-1.5 text-center py-2.5 px-4 rounded-full text-[11px] font-medium font-sans uppercase tracking-[0.16em] bg-[#143627] text-[#FAF8F5] hover:bg-[#1b4834] transition-all shadow-xs"
        >
          <span>Explore Blend</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
        <button
          onClick={() => addItem(product)}
          aria-label={`Quick add ${product.name} to bag`}
          title="Quick add to bag"
          className="p-2.5 rounded-full border border-stone-300 bg-[#FAF8F5] text-stone-800 hover:bg-[#143627] hover:text-white hover:border-[#143627] transition-all focus:outline-none cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
