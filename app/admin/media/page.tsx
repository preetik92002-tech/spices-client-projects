"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Copy, Check, ExternalLink, Upload, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaItem {
  name: string;
  path: string;
  type: "Products" | "Editorial" | "Hero" | "Brand";
  productAssociation?: string;
  dimensions?: string;
}

const ALL_MEDIA_ASSETS: MediaItem[] = [
  // Brand Assets
  {
    name: "flavouron-logo.png",
    path: "/images/brand/flavouron-logo.png",
    type: "Brand",
    productAssociation: "Flavouron Master",
    dimensions: "Transparent PNG",
  },
  // Hero Assets
  {
    name: "hero-slide-1.webp",
    path: "/images/hero/hero-slide-1.webp",
    type: "Hero",
    productAssociation: "Homepage Slide 1 (Studio Showcase)",
    dimensions: "1024 × 409",
  },
  {
    name: "hero-slide-2.webp",
    path: "/images/hero/hero-slide-2.webp",
    type: "Hero",
    productAssociation: "Homepage Slide 2 (Stone Pedestals)",
    dimensions: "1024 × 682",
  },
  // Editorial Lifestyle Assets
  {
    name: "sandwich-masala-editorial-01.webp",
    path: "/images/products/sandwich-masala/editorial-01.webp",
    type: "Editorial",
    productAssociation: "Bombay Sandwich Masala",
    dimensions: "1122 × 1402",
  },
  {
    name: "veg-biryani-editorial-01.webp",
    path: "/images/products/veg-biryani-masala/editorial-01.webp",
    type: "Editorial",
    productAssociation: "Veg Biryani Seasoning Powder",
    dimensions: "1096 × 1435",
  },
  {
    name: "veg-biryani-editorial-02.webp",
    path: "/images/products/veg-biryani-masala/editorial-02.webp",
    type: "Editorial",
    productAssociation: "Veg Biryani (Top Down Flatlay)",
    dimensions: "1096 × 1435",
  },
  {
    name: "paneer-lababdar-editorial-01.webp",
    path: "/images/products/paneer-lababdar/editorial-01.webp",
    type: "Editorial",
    productAssociation: "Paneer Lababdar Masala",
    dimensions: "1143 × 1376",
  },
  {
    name: "momos-masala-editorial-01.webp",
    path: "/images/products/momos-masala/editorial-01.webp",
    type: "Editorial",
    productAssociation: "Himalayan Momos Masala",
    dimensions: "1122 × 1402",
  },
  {
    name: "fry-rice-masala-editorial-01.webp",
    path: "/images/products/fry-rice-masala/editorial-01.webp",
    type: "Editorial",
    productAssociation: "Fry Rice Masala",
    dimensions: "1122 × 1402",
  },
  {
    name: "pasta-masala-editorial-01.webp",
    path: "/images/products/pasta-masala/editorial-01.webp",
    type: "Editorial",
    productAssociation: "Rich Italian Pasta Masala",
    dimensions: "1143 × 1376",
  },
  // Individual Product Packaging
  {
    name: "paneer-lababdar-main.webp",
    path: "/images/products/paneer-lababdar/main.webp",
    type: "Products",
    productAssociation: "Paneer Lababdar Masala",
  },
  {
    name: "paneer-lababdar-gallery-01.webp",
    path: "/images/products/paneer-lababdar/gallery-01.webp",
    type: "Products",
    productAssociation: "Paneer Lababdar (Red Variant)",
  },
  {
    name: "sandwich-masala-main.webp",
    path: "/images/products/sandwich-masala/main.webp",
    type: "Products",
    productAssociation: "Sandwich Masala (White)",
  },
  {
    name: "sandwich-masala-gallery-01.webp",
    path: "/images/products/sandwich-masala/gallery-01.webp",
    type: "Products",
    productAssociation: "Sandwich Masala (Gold)",
  },
  {
    name: "veg-biryani-main.webp",
    path: "/images/products/veg-biryani-masala/main.webp",
    type: "Products",
    productAssociation: "Veg Biryani Seasoning",
  },
  {
    name: "veg-biryani-gallery-01.webp",
    path: "/images/products/veg-biryani-masala/gallery-01.webp",
    type: "Products",
    productAssociation: "Veg Biryani (Nutritional Back)",
  },
  {
    name: "momos-masala-main.webp",
    path: "/images/products/momos-masala/main.webp",
    type: "Products",
    productAssociation: "Momos Masala (Green)",
  },
  {
    name: "momos-masala-gallery-01.webp",
    path: "/images/products/momos-masala/gallery-01.webp",
    type: "Products",
    productAssociation: "Momos Masala (Blue)",
  },
  {
    name: "pizza-seasoning-main.webp",
    path: "/images/products/pizza-seasoning/main.webp",
    type: "Products",
    productAssociation: "Pizza Seasoning Jar",
  },
  {
    name: "tandoori-masala-main.webp",
    path: "/images/products/tandoori-masala/main.webp",
    type: "Products",
    productAssociation: "Tandoori Masala Blend",
  },
  {
    name: "tandoori-chicken-main.webp",
    path: "/images/products/tandoori-chicken-masala/main.webp",
    type: "Products",
    productAssociation: "Tandoori Chicken Masala",
  },
  {
    name: "peri-peri-tikka-main.webp",
    path: "/images/products/peri-peri-paneer-tikka/main.webp",
    type: "Products",
    productAssociation: "Peri Peri Paneer Tikka",
  },
  {
    name: "curry-masala-main.webp",
    path: "/images/products/curry-masala/main.webp",
    type: "Products",
    productAssociation: "Royal Curry Masala",
  },
  {
    name: "fish-curry-main.webp",
    path: "/images/products/fish-curry-masala/main.webp",
    type: "Products",
    productAssociation: "Coastal Fish Curry Masala",
  },
  {
    name: "chhole-masala-main.webp",
    path: "/images/products/chhole-masala/main.webp",
    type: "Products",
    productAssociation: "Amritsari Chhole Masala",
  },
  {
    name: "fry-rice-main.webp",
    path: "/images/products/fry-rice-masala/main.webp",
    type: "Products",
    productAssociation: "Fry Rice Masala",
  },
  {
    name: "noodles-masala-main.webp",
    path: "/images/products/noodles-masala/main.webp",
    type: "Products",
    productAssociation: "Chinese Noodles Masala",
  },
  {
    name: "pasta-masala-main.webp",
    path: "/images/products/pasta-masala/main.webp",
    type: "Products",
    productAssociation: "Pasta Masala",
  },
  {
    name: "kolhapuri-tadka-main.webp",
    path: "/images/products/kolhapuri-tadka/main.webp",
    type: "Products",
    productAssociation: "Kolhapuri Tadka Masala",
  },
];

export default function AdminMediaPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const filters = ["All", "Products", "Editorial", "Hero", "Brand"];

  const filteredAssets =
    selectedFilter === "All"
      ? ALL_MEDIA_ASSETS
      : ALL_MEDIA_ASSETS.filter((item) => item.type === selectedFilter);

  const copyToClipboard = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial-heading text-2xl sm:text-3xl text-stone-900 uppercase">
            Flavouron Media Library
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-serif mt-0.5">
            Organized high-resolution packaging scans, editorial photography, and hero campaign assets.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b4834] transition-colors self-start sm:self-auto cursor-pointer">
          <Upload className="w-4 h-4" /> Upload Asset
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
        <Filter className="w-4 h-4 text-stone-400 mr-1" />
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium font-sans transition-all cursor-pointer",
              selectedFilter === f
                ? "bg-[#143627] text-white"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
            )}
          >
            {f} ({f === "All" ? ALL_MEDIA_ASSETS.length : ALL_MEDIA_ASSETS.filter((a) => a.type === f).length})
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredAssets.map((asset, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-2xl border border-stone-200/80 p-3 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
          >
            <div className="relative aspect-square w-full bg-[#FAF8F5] rounded-xl overflow-hidden p-2 flex items-center justify-center">
              <Image
                src={asset.path}
                alt={asset.name}
                fill
                sizes="200px"
                className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="mt-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-wider font-mono text-[#143627] font-semibold block truncate">
                  {asset.type}
                </span>
                {asset.dimensions && (
                  <span className="text-[8px] font-mono text-stone-400">
                    {asset.dimensions}
                  </span>
                )}
              </div>

              <p className="text-[11px] font-medium text-stone-800 truncate" title={asset.productAssociation}>
                {asset.productAssociation}
              </p>

              <p className="text-[9px] font-mono text-stone-400 truncate" title={asset.path}>
                {asset.name}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                <button
                  onClick={() => copyToClipboard(asset.path)}
                  title="Copy relative path"
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-[#143627] hover:underline cursor-pointer"
                >
                  {copiedPath === asset.path ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy Path
                    </>
                  )}
                </button>

                <a
                  href={asset.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open full size"
                  className="text-stone-400 hover:text-stone-700"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
