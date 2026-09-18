"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/lib/data/products";
import { ProductImage } from "@/components/ui/ProductImage";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  "Paneer Lababdar",
  "Sandwich Masala",
  "Veg Biryani",
  "Pizza Seasoning",
  "Momos Masala",
  "Tandoori Chicken",
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input and lock scroll on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      setTimeout(() => setQuery(""), 200);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.shortDescription.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          (p.tagline && p.tagline.toLowerCase().includes(trimmed))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start items-center bg-stone-900/60 backdrop-blur-md animate-fade-in p-4 sm:p-6 md:p-10">
      <div
        className="w-full max-w-3xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-stone-200/80 overflow-hidden flex flex-col max-h-[85vh] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-stone-200">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search masalas, seasonings, blends..."
            className="w-full bg-transparent font-serif text-lg md:text-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-0"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-widest px-3 py-1.5 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-600 transition-colors shrink-0"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto flex-1 p-6">
          {trimmed ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                  {results.length} {results.length === 1 ? "Result" : "Results"} for &ldquo;{query}&rdquo;
                </span>
                {results.length > 0 && (
                  <Link
                    href={`/shop?q=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="text-xs font-serif italic text-[#143627] hover:underline flex items-center gap-1"
                  >
                    View all results <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="group flex items-center gap-3.5 p-3 rounded-xl bg-white border border-stone-100 hover:border-stone-300 hover:shadow-sm transition-all"
                    >
                      <div className="w-14 h-14 rounded-lg bg-[#F5F2EC] shrink-0 overflow-hidden">
                        <ProductImage
                          src={product.images.primary}
                          alt={product.name}
                          aspectRatio="square"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-serif font-medium text-stone-900 text-sm truncate group-hover:text-[#143627] transition-colors">
                          {product.name}
                        </p>
                        <p className="text-xs text-stone-500 truncate">
                          {product.weight} • ₹{product.price}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#143627] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="font-serif text-lg text-stone-700">No spices found</p>
                  <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                    We couldn&apos;t find any blends matching &ldquo;{query}&rdquo;. Try browsing our popular spices below.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-400 font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="text-xs px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:border-stone-400 hover:text-stone-900 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-stone-200/60">
                <span className="text-xs uppercase tracking-widest text-stone-400 font-medium block mb-3">
                  Featured Recommendations
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRODUCTS.filter((p) => p.featured)
                    .slice(0, 4)
                    .map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={onClose}
                        className="group flex items-center gap-3.5 p-3 rounded-xl bg-white border border-stone-100 hover:border-stone-300 transition-all"
                      >
                        <div className="w-12 h-12 rounded-lg bg-[#F5F2EC] shrink-0 overflow-hidden">
                          <ProductImage
                            src={product.images.primary}
                            alt={product.name}
                            aspectRatio="square"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-serif font-medium text-stone-900 text-sm truncate group-hover:text-[#143627]">
                            {product.name}
                          </p>
                          <p className="text-xs text-stone-500">₹{product.price}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
