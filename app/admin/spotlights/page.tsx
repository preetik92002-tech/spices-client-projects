"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Edit } from "lucide-react";
import { SPOTLIGHTS, SpotlightItem } from "@/lib/data/spotlights";

export default function AdminSpotlightsPage() {
  const [spotlights, setSpotlights] = useState<SpotlightItem[]>(SPOTLIGHTS);

  const togglePublish = (id: string) => {
    setSpotlights((prev) =>
      prev.map((s) => (s.id === id ? { ...s, published: !s.published } : s))
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial-heading text-2xl sm:text-3xl text-stone-900">
            Spotlight 9:16 Media Reels
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-serif mt-0.5">
            Manage vertical video reels, creator collaborations, and linked spices.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b4834] transition-colors self-start sm:self-auto">
          <Plus className="w-4 h-4" /> New Spotlight Reel
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {spotlights.map((reel) => (
          <div
            key={reel.id}
            className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* 9:16 Aspect Preview */}
              <div className="relative aspect-[16/10] bg-stone-950 p-4 flex items-center justify-center overflow-hidden">
                <Image
                  src={reel.posterUrl}
                  alt={reel.title}
                  fill
                  className="object-contain p-2"
                />
                <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] uppercase font-mono px-2 py-0.5 rounded-md">
                  Order #{reel.sortOrder}
                </span>
                <span
                  className={`absolute top-3 right-3 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                    reel.published
                      ? "bg-emerald-500 text-white"
                      : "bg-stone-500 text-white"
                  }`}
                >
                  {reel.published ? "Published" : "Draft"}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#B44C2D] font-mono">
                  {reel.creatorName}
                </span>
                <h3 className="font-editorial-heading text-base font-semibold text-stone-900 line-clamp-1">
                  {reel.title}
                </h3>
                <p className="text-xs text-stone-500 font-serif line-clamp-2">
                  {reel.description}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] text-stone-600 bg-stone-100 px-2 py-1 rounded-md">
                    Linked: <strong>{reel.productName}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => togglePublish(reel.id)}
                className="text-xs text-stone-600 hover:text-stone-900 font-medium"
              >
                {reel.published ? "Unpublish" : "Publish"}
              </button>

              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg text-stone-400 hover:text-[#143627] hover:bg-stone-100">
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
