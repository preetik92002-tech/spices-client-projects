"use client";

import React, { useState } from "react";
import { Save, CheckCircle2, Globe, Home, Package, Layers, BookOpen } from "lucide-react";

type SEOTab = "global" | "homepage" | "product" | "collection" | "blog";

export default function AdminSEOPage() {
  const [activeTab, setActiveTab] = useState<SEOTab>("global");
  const [saved, setSaved] = useState(false);

  const [globalSeo, setGlobalSeo] = useState({
    siteName: "FLAVOURON",
    organization: "Shivooham Exports",
    titleTemplate: "%s | FLAVOURON Artisanal Spices",
    canonicalUrl: "https://flavouron.com",
    ogImage: "/images/brand/flavouron-logo.jpeg",
    robotsDirective: "index, follow, max-image-preview:large",
  });

  const [homepageSeo, setHomepageSeo] = useState({
    title: "FLAVOURON | Ultra Premium Indian Spices & Artisanal Masalas",
    description:
      "Handcrafted, slow-curated authentic Indian spices, masalas, and seasonings by Shivooham Exports. Taste that brings everyone together.",
    keywords: "Flavouron, premium Indian spices, Paneer Lababdar Masala, artisanal spices, Shivooham Exports, authentic masala, gourmet seasonings",
  });

  const [productSeo, setProductSeo] = useState({
    titlePattern: "{product_name} — Authentic Artisanal Blend | FLAVOURON",
    descriptionPattern: "Order authentic {product_name} online. Handcrafted and slow-roasted in Bilhaur, UP by Shivooham Exports.",
    enableProductSchema: true,
    enableRatingSchema: true,
  });

  const [collectionSeo, setCollectionSeo] = useState({
    titlePattern: "{collection_name} — Curated Blends | FLAVOURON",
    descriptionPattern: "Explore our handcrafted {collection_name} collection. Preserving volatile essential oils through cold milling.",
  });

  const [blogSeo, setBlogSeo] = useState({
    titlePattern: "{article_title} | The Flavouron Journal",
    descriptionPattern: "{article_excerpt}",
    enableArticleSchema: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial-heading text-2xl sm:text-3xl text-stone-900">
            Search Engine Optimization (SEO)
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-serif mt-0.5">
            Configure metadata, OpenGraph cards, and JSON-LD schema across all store channels.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b4834] transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save SEO Settings
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>SEO settings updated and sitemap re-indexed!</span>
        </div>
      )}

      {/* SEO Sub-tabs matching requested hierarchy */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-stone-200 shadow-xs">
        <button
          onClick={() => setActiveTab("global")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
            activeTab === "global"
              ? "bg-[#143627] text-white"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <Globe className="w-3.5 h-3.5" /> Global SEO
        </button>

        <button
          onClick={() => setActiveTab("homepage")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
            activeTab === "homepage"
              ? "bg-[#143627] text-white"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <Home className="w-3.5 h-3.5" /> Homepage SEO
        </button>

        <button
          onClick={() => setActiveTab("product")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
            activeTab === "product"
              ? "bg-[#143627] text-white"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <Package className="w-3.5 h-3.5" /> Product SEO
        </button>

        <button
          onClick={() => setActiveTab("collection")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
            activeTab === "collection"
              ? "bg-[#143627] text-white"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <Layers className="w-3.5 h-3.5" /> Collection SEO
        </button>

        <button
          onClick={() => setActiveTab("blog")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
            activeTab === "blog"
              ? "bg-[#143627] text-white"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Blog SEO
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
        {/* 1. Global SEO */}
        {activeTab === "global" && (
          <div className="space-y-4">
            <h2 className="font-editorial-heading text-xl text-stone-900 border-b border-stone-100 pb-3">
              Global Site Indexing &amp; Brand Metadata
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={globalSeo.siteName}
                  onChange={(e) => setGlobalSeo({ ...globalSeo, siteName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Parent Entity Name
                </label>
                <input
                  type="text"
                  value={globalSeo.organization}
                  onChange={(e) => setGlobalSeo({ ...globalSeo, organization: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Canonical Base URL
              </label>
              <input
                type="text"
                value={globalSeo.canonicalUrl}
                onChange={(e) => setGlobalSeo({ ...globalSeo, canonicalUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                OpenGraph Share Image Path
              </label>
              <input
                type="text"
                value={globalSeo.ogImage}
                onChange={(e) => setGlobalSeo({ ...globalSeo, ogImage: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono"
              />
            </div>
          </div>
        )}

        {/* 2. Homepage SEO */}
        {activeTab === "homepage" && (
          <div className="space-y-4">
            <h2 className="font-editorial-heading text-xl text-stone-900 border-b border-stone-100 pb-3">
              Homepage Meta &amp; SERP Snippet
            </h2>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Homepage Title ({homepageSeo.title.length}/60 chars)
              </label>
              <input
                type="text"
                value={homepageSeo.title}
                onChange={(e) => setHomepageSeo({ ...homepageSeo, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Homepage Description ({homepageSeo.description.length}/160 chars)
              </label>
              <textarea
                rows={3}
                value={homepageSeo.description}
                onChange={(e) => setHomepageSeo({ ...homepageSeo, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Target Keywords
              </label>
              <input
                type="text"
                value={homepageSeo.keywords}
                onChange={(e) => setHomepageSeo({ ...homepageSeo, keywords: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
              />
            </div>
          </div>
        )}

        {/* 3. Product SEO */}
        {activeTab === "product" && (
          <div className="space-y-4">
            <h2 className="font-editorial-heading text-xl text-stone-900 border-b border-stone-100 pb-3">
              Dynamic Product Detail Page (PDP) Rules
            </h2>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Product Title Pattern
              </label>
              <input
                type="text"
                value={productSeo.titlePattern}
                onChange={(e) => setProductSeo({ ...productSeo, titlePattern: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Product Description Pattern
              </label>
              <input
                type="text"
                value={productSeo.descriptionPattern}
                onChange={(e) => setProductSeo({ ...productSeo, descriptionPattern: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono"
              />
            </div>
            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                <input
                  type="checkbox"
                  checked={productSeo.enableProductSchema}
                  onChange={(e) => setProductSeo({ ...productSeo, enableProductSchema: e.target.checked })}
                  className="rounded text-[#143627]"
                />
                <span>Automatically inject Schema.org/Product structured data with price &amp; availability</span>
              </label>
            </div>
          </div>
        )}

        {/* 4. Collection SEO */}
        {activeTab === "collection" && (
          <div className="space-y-4">
            <h2 className="font-editorial-heading text-xl text-stone-900 border-b border-stone-100 pb-3">
              Collection &amp; Category Page Rules
            </h2>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Collection Title Pattern
              </label>
              <input
                type="text"
                value={collectionSeo.titlePattern}
                onChange={(e) => setCollectionSeo({ ...collectionSeo, titlePattern: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Collection Description Pattern
              </label>
              <input
                type="text"
                value={collectionSeo.descriptionPattern}
                onChange={(e) => setCollectionSeo({ ...collectionSeo, descriptionPattern: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono"
              />
            </div>
          </div>
        )}

        {/* 5. Blog SEO */}
        {activeTab === "blog" && (
          <div className="space-y-4">
            <h2 className="font-editorial-heading text-xl text-stone-900 border-b border-stone-100 pb-3">
              Journal &amp; Blog Article Indexing Rules
            </h2>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Article Title Pattern
              </label>
              <input
                type="text"
                value={blogSeo.titlePattern}
                onChange={(e) => setBlogSeo({ ...blogSeo, titlePattern: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono"
              />
            </div>
            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                <input
                  type="checkbox"
                  checked={blogSeo.enableArticleSchema}
                  onChange={(e) => setBlogSeo({ ...blogSeo, enableArticleSchema: e.target.checked })}
                  className="rounded text-[#143627]"
                />
                <span>Automatically generate Schema.org/BlogPosting with author, datePublished, and publisher</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
