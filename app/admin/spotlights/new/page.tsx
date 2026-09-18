"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, CheckCircle2 } from "lucide-react";
import { PRODUCTS } from "@/lib/data/products";

export default function AdminNewSpotlightPage() {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    posterUrl: "/images/products/paneer-lababdar-black.jpeg",
    productId: PRODUCTS[0]?.id || "",
    creatorName: "",
    sortOrder: "6",
    published: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/spotlights"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-editorial-heading text-2xl text-stone-900">
              Add Spotlight Reel
            </h1>
            <p className="text-xs text-stone-500 font-serif">
              Upload and link a vertical 9:16 culinary video reel to a spice product.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b4834] transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Reel
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Spotlight video reel successfully published to storefront!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
            Reel Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Sizzling Paneer Tikka in Charcoal Tandoor"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
            Description / Cooking Action *
          </label>
          <textarea
            rows={3}
            required
            placeholder="Explain the sizzle, botanical aroma, or cooking technique shown in this 15-second reel..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
              Linked Flavouron Product *
            </label>
            <select
              value={formData.productId}
              onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white text-stone-800 focus:outline-none focus:border-[#143627]"
            >
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (₹{p.price})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
              Creator / Chef Attribution
            </label>
            <input
              type="text"
              placeholder="e.g. Chef Sanjeev • Royal Awadh"
              value={formData.creatorName}
              onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
              Video Stream URL (MP4 / HLS)
            </label>
            <input
              type="text"
              placeholder="https://cdn.flavouron.com/videos/reel-1.mp4"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono focus:outline-none focus:border-[#143627]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
              Poster Image Fallback Path
            </label>
            <input
              type="text"
              value={formData.posterUrl}
              onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono focus:outline-none focus:border-[#143627]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 font-medium">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="rounded text-[#143627] focus:ring-[#143627]"
            />
            <span>Publish immediately to storefront reel carousel</span>
          </label>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Link
            href="/admin/spotlights"
            className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs uppercase tracking-wider font-medium hover:bg-stone-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b4834]"
          >
            Publish Reel
          </button>
        </div>
      </form>
    </div>
  );
}
