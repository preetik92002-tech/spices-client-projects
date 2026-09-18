"use client";

import React from "react";
import Link from "next/link";
import { Plus, FolderKanban, Edit, Eye, Sparkles } from "lucide-react";

const CURATED_COLLECTIONS = [
  {
    id: "col-1",
    name: "Awadhi Royal Banquets",
    slug: "curry-masalas",
    description: "Slow-simmered handi formulations, cashew gravies, and royal cardamom profiles.",
    productCount: 4,
    banner: "/images/products/paneer-lababdar-black.jpeg",
    status: "Featured on Homepage",
  },
  {
    id: "col-2",
    name: "Mumbai Street Sprinkles",
    slug: "quick-bites",
    description: "Amchur-cured sandwich seasoning, tangy momos dust, and desi wok spice blends.",
    productCount: 4,
    banner: "/images/products/sandwich-masala-white.jpeg",
    status: "Live",
  },
  {
    id: "col-3",
    name: "Fire & Coal Tandoor Masters",
    slug: "tandoori-grill",
    description: "Coarse marinades for clay oven roasting, paneer tikka, and charcoal smoking.",
    productCount: 3,
    banner: "/images/products/tandoori-masala-black.jpeg",
    status: "Live",
  },
  {
    id: "col-4",
    name: "Global Pantry Seasonings",
    slug: "gourmet-seasonings",
    description: "Neapolitan herb infusions, whole cracked pepper, and pasta finishing spices.",
    productCount: 2,
    banner: "/images/products/pizza-seasoning.jpeg",
    status: "Live",
  },
];

export default function AdminCollectionsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial-heading text-2xl sm:text-3xl text-stone-900">
            Storefront Collections
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-serif mt-0.5">
            Curate thematic product rails, landing banners, and seasonal drops.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b4834] transition-colors self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Create Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CURATED_COLLECTIONS.map((col) => (
          <div
            key={col.id}
            className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-lg bg-[#EFE9DF] text-[#143627]">
                  <FolderKanban className="w-4 h-4" />
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-[#143627] bg-[#EFE9DF] px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" /> {col.status}
                </span>
              </div>

              <h3 className="font-editorial-heading text-xl text-stone-900 font-semibold">
                {col.name}
              </h3>

              <p className="text-xs text-stone-500 font-serif mt-1">
                {col.description}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-mono text-stone-600">
                {col.productCount} Curated Blends
              </span>

              <div className="flex items-center gap-2">
                <Link
                  href={`/collections/${col.slug}`}
                  target="_blank"
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => alert(`Editing collection: ${col.name}`)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-[#143627] hover:bg-stone-100"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
