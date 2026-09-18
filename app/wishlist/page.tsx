"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/lib/data/products";
import { ProductImage } from "@/components/ui/ProductImage";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.slug));

  const handleMoveToCart = (product: (typeof PRODUCTS)[0]) => {
    addItem(product, product.variants[0], 1);
    removeFromWishlist(product.slug);
  };

  return (
    <div className="w-full min-h-[70vh] py-12 md:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[#B44C2D] font-semibold block mb-2">
          Your Curated Kitchen
        </span>
        <h1 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-tight">
          Saved Spices
        </h1>
        <p className="mt-3 text-sm md:text-base text-stone-600 font-serif italic">
          Blends and seasonings handpicked for your next culinary creation.
        </p>
      </div>

      {savedProducts.length === 0 ? (
        <div className="text-center py-20 px-4 border border-stone-200/80 rounded-2xl bg-[#FBF9F5] max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="font-editorial-heading text-2xl text-stone-800">
            Your spice list is empty
          </h2>
          <p className="text-sm text-stone-500 mt-2 max-w-sm mx-auto">
            Explore our heritage masalas, slow-roasted blends, and artisanal seasonings to save your favourites.
          </p>
          <div className="mt-8">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#143627] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#1b4834] transition-colors"
            >
              Discover Spices <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {savedProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md"
            >
              {/* Product Thumbnail */}
              <Link
                href={`/products/${product.slug}`}
                className="block p-4 bg-[#FAF8F5]"
              >
                <ProductImage
                  src={product.images.primary}
                  alt={product.name}
                  aspectRatio="square"
                />
              </Link>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B44C2D] font-medium">
                    {product.variants[0]?.weight || product.weight}
                  </span>
                  <h3 className="font-editorial-heading text-lg sm:text-xl text-stone-900 mt-1 line-clamp-1">
                    <Link
                      href={`/products/${product.slug}`}
                      className="hover:text-[#143627] transition-colors"
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-stone-400">Price</span>
                    <span className="font-serif text-lg font-semibold text-stone-900">
                      ₹{product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromWishlist(product.slug)}
                      aria-label="Remove from wishlist"
                      className="p-2.5 rounded-full text-stone-400 hover:text-red-600 hover:bg-stone-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#143627] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#1b4834] transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
