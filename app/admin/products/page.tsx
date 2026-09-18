"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Filter, Edit, Eye, CheckCircle2 } from "lucide-react";
import { PRODUCTS } from "@/lib/data/products";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = PRODUCTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial-heading text-2xl sm:text-3xl text-stone-900">
            Products &amp; Formulations
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-serif mt-0.5">
            Manage your spice catalog, multi-weight variants, pricing, and stock.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b4834] transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add New Blend
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, SKU, or tag..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-stone-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white text-stone-700 focus:outline-none focus:border-[#143627]"
          >
            <option value="all">All Categories</option>
            <option value="curry-masalas">Curry Masalas</option>
            <option value="tandoori-grill">Tandoori &amp; Grill</option>
            <option value="gourmet-seasonings">Gourmet Seasonings</option>
            <option value="quick-bites">Quick Bites</option>
            <option value="speciality-blends">Speciality Blends</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/70 text-stone-500 uppercase tracking-wider">
                <th className="py-3 px-4 font-medium">Product</th>
                <th className="py-3 px-4 font-medium">SKU</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Price</th>
                <th className="py-3 px-4 font-medium">Variants</th>
                <th className="py-3 px-4 font-medium">Stock</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg bg-[#FAF8F5] p-1 border border-stone-200/70 shrink-0">
                        <Image
                          src={product.mainImage || product.images?.primary || "/images/brand/flavouron-logo.png"}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <span className="font-serif font-medium text-stone-900 text-sm block">
                          {product.name}
                        </span>
                        {product.hindiName && (
                          <span className="text-[11px] text-stone-400 font-serif">
                            {product.hindiName}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-500">
                    {product.sku}
                  </td>
                  <td className="py-3 px-4 font-medium">
                    <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-[10px] uppercase tracking-wider">
                      {product.categoryLabel}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-stone-900">
                    ₹{product.price}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs text-stone-600">
                      {product.variants.map((v) => v.weight).join(", ")}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span
                      className={`font-semibold ${
                        (product.stock ?? 100) < 50
                          ? "text-amber-700"
                          : "text-emerald-700"
                      }`}
                    >
                      {product.stock ?? 120} units
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Live
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        title="View on storefront"
                        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/products/new?edit=${product.slug}`}
                        title="Edit product formulation"
                        className="p-1.5 rounded-lg text-stone-400 hover:text-[#143627] hover:bg-stone-100"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
