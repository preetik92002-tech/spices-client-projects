"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";
import { CATEGORIES } from "@/lib/data/categories";

interface CollectionFilterViewProps {
  initialProducts: Product[];
  currentCategorySlug?: string;
}

export function CollectionFilterView({
  initialProducts,
  currentCategorySlug,
}: CollectionFilterViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    currentCategorySlug || "all"
  );
  const [priceFilter, setPriceFilter] = useState<
    "all" | "under-300" | "300-400" | "above-400"
  >("all");
  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "rating" | "name"
  >("featured");
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "all" && p.category !== selectedCategory) {
          return false;
        }

        // Price filter
        if (priceFilter === "under-300" && p.price >= 300) return false;
        if (priceFilter === "300-400" && (p.price < 300 || p.price > 400))
          return false;
        if (priceFilter === "above-400" && p.price <= 400) return false;

        // Search query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchTag = p.tagline?.toLowerCase().includes(query);
          const matchDesc = p.shortDescription.toLowerCase().includes(query);
          const matchIngredients = p.ingredients.some((ing) =>
            ing.toLowerCase().includes(query)
          );
          return matchName || matchTag || matchDesc || matchIngredients;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [initialProducts, selectedCategory, priceFilter, searchQuery, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceFilter("all");
    setSortBy("featured");
    setVisibleCount(8);
  };

  return (
    <div className="w-full">
      {/* Editorial Filter Bar */}
      <div className="bg-white border-y border-[var(--border)] py-4 sm:py-6 px-4 sm:px-6 lg:px-12 sticky top-18 sm:top-20 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Keyword Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-text)]" />
            <input
              type="text"
              placeholder="Search by blend name, whole spice, or dish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-body-sans border border-[var(--border)] rounded-full bg-[#FAF8F5] focus:outline-none focus:border-[var(--primary-green)] text-[var(--foreground)]"
            />
          </div>

          {/* Quick Filters: Price & Sort */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-body-sans">
            {/* Price Filter Selector */}
            <div className="flex items-center space-x-1 border border-[var(--border)] rounded-full px-3 py-1.5 bg-[#FAF8F5]">
              <span className="text-[var(--muted-text)] text-[11px] uppercase mr-1">
                Price:
              </span>
              <select
                value={priceFilter}
                onChange={(e) =>
                  setPriceFilter(
                    e.target.value as
                      | "all"
                      | "under-300"
                      | "300-400"
                      | "above-400"
                  )
                }
                aria-label="Filter by price range"
                className="bg-transparent text-xs font-medium focus:outline-none text-[var(--foreground)] cursor-pointer"
              >
                <option value="all">All Prices</option>
                <option value="under-300">Under ₹300</option>
                <option value="300-400">₹300 – ₹400</option>
                <option value="above-400">Above ₹400</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center space-x-1 border border-[var(--border)] rounded-full px-3 py-1.5 bg-[#FAF8F5]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--muted-text)] mr-1" />
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | "featured"
                      | "price-asc"
                      | "price-desc"
                      | "rating"
                      | "name"
                  )
                }
                aria-label="Sort products"
                className="bg-transparent text-xs font-medium focus:outline-none text-[var(--foreground)] cursor-pointer"
              >
                <option value="featured">Featured Blends</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>

            {(searchQuery ||
              selectedCategory !== (currentCategorySlug || "all") ||
              priceFilter !== "all" ||
              sortBy !== "featured") && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-[11px] text-[var(--terracotta)] hover:underline font-medium px-2 py-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="max-w-7xl mx-auto mt-4 pt-3 border-t border-[var(--border)]/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium shrink-0 transition-all ${
              selectedCategory === "all"
                ? "bg-[var(--primary-green)] text-white"
                : "bg-[#FAF8F5] border border-[var(--border)] text-[var(--muted-text)] hover:text-[var(--foreground)]"
            }`}
          >
            All Spices ({initialProducts.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium shrink-0 transition-all ${
                selectedCategory === cat.slug
                  ? "bg-[var(--primary-green)] text-white"
                  : "bg-[#FAF8F5] border border-[var(--border)] text-[var(--muted-text)] hover:text-[var(--foreground)]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Results Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
        <div className="flex items-center justify-between mb-6 text-xs text-[var(--muted-text)] font-body-sans">
          <span>
            Showing <strong>{displayedProducts.length}</strong> of{" "}
            <strong>{filteredProducts.length}</strong> artisanal blends
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
            <p className="font-editorial-heading text-xl text-[var(--foreground)] uppercase">
              No spice blends match your selection
            </p>
            <p className="text-xs font-body-sans text-[var(--muted-text)] max-w-sm leading-relaxed">
              Try adjusting your search terms, choosing another category, or
              clearing your price filter.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-full bg-[var(--primary-green)] text-white text-xs uppercase tracking-wider font-medium"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More Pagination */}
        {hasMore && (
          <div className="mt-14 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="px-8 py-3 rounded-full border border-[var(--primary-green)] text-[var(--primary-green)] hover:bg-[var(--primary-green)] hover:text-white transition-all text-xs uppercase tracking-[0.16em] font-medium"
            >
              Load More Blends ({filteredProducts.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
