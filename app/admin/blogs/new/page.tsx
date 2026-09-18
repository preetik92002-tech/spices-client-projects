"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, CheckCircle2 } from "lucide-react";

export default function AdminNewBlogPage() {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Craft & Science",
    readingTime: "5 min read",
    authorName: "Master Blender",
    authorRole: "Shivooham Exports",
    excerpt: "",
    content: "",
    tags: "Spice Science, Cold Milling, Volatile Oils",
    featuredImage: "/images/products/paneer-lababdar-black.jpeg",
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({ ...prev, title: val, slug: generatedSlug }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-editorial-heading text-2xl text-stone-900">
              Compose Journal Essay
            </h1>
            <p className="text-xs text-stone-500 font-serif">
              Publish spice storytelling, culinary chemistry, and regional kitchen traditions.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b4834] transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" /> Publish Essay
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Journal essay published successfully to the storefront blog!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
              Article Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. The Secret Terpenes of Royal Green Cardamom"
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
              URL Slug *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. secret-terpenes-green-cardamom"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono focus:outline-none focus:border-[#143627]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white text-stone-800 focus:outline-none focus:border-[#143627]"
            >
              <option>Craft &amp; Science</option>
              <option>Street Culture</option>
              <option>Heritage Recipes</option>
              <option>Spice Farming</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
              Estimated Reading Time
            </label>
            <input
              type="text"
              value={formData.readingTime}
              onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
              Author Name
            </label>
            <input
              type="text"
              value={formData.authorName}
              onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
            Short Lead / Excerpt *
          </label>
          <textarea
            rows={2}
            required
            placeholder="A compelling 2-line summary to intrigue readers..."
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
            Full Essay Body Content *
          </label>
          <textarea
            rows={8}
            required
            placeholder="Write your editorial essay here..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif leading-relaxed focus:outline-none focus:border-[#143627]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
            Tags (Comma-separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
          />
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Link
            href="/admin/blogs"
            className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs uppercase tracking-wider font-medium hover:bg-stone-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b4834]"
          >
            Publish Article
          </button>
        </div>
      </form>
    </div>
  );
}
