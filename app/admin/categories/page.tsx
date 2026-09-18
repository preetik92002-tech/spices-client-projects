"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Layers, Edit, Eye, CheckCircle2 } from "lucide-react";
import { CATEGORIES } from "@/lib/data/categories";

export default function AdminCategoriesPage() {
  const [categories] = useState(CATEGORIES);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial-heading text-2xl sm:text-3xl text-stone-900">
            Categories &amp; Culinary Taxonomies
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-serif mt-0.5">
            Organize blends into navigational storefront collections.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b4834] transition-colors self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-lg bg-stone-100 text-stone-700">
                  <Layers className="w-4 h-4" />
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Active
                </span>
              </div>

              <h3 className="font-editorial-heading text-lg text-stone-900 font-semibold">
                {cat.name}
              </h3>

              <p className="text-xs text-stone-500 font-serif mt-1 line-clamp-2">
                {cat.description}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-mono text-stone-400">
                /{cat.slug}
              </span>

              <div className="flex items-center gap-2">
                <Link
                  href={`/collections/${cat.slug}`}
                  target="_blank"
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => alert(`Editing category: ${cat.name}`)}
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
