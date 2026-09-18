"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Eye, CheckCircle2 } from "lucide-react";
import { JOURNAL_ARTICLES } from "@/lib/data/journal";

export default function AdminBlogsPage() {
  const [articles] = useState(JOURNAL_ARTICLES);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial-heading text-2xl sm:text-3xl text-stone-900">
            Journal &amp; Editorial Publishing
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-serif mt-0.5">
            Write spice stories, culinary chemistry essays, and regional histories.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b4834] transition-colors self-start sm:self-auto">
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/70 text-stone-500 uppercase tracking-wider">
                <th className="py-3 px-4 font-medium">Article Title</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Author</th>
                <th className="py-3 px-4 font-medium">Published</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-stone-900">
                    <span className="font-serif text-sm block line-clamp-1">
                      {art.title}
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      /{art.slug}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EFE9DF] text-[#143627] text-[10px] uppercase font-semibold">
                      {art.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    {art.author.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-stone-500 text-[11px]">
                    {art.publishedAt}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Live
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/journal/${art.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="p-1.5 rounded-lg text-stone-400 hover:text-[#143627] hover:bg-stone-100">
                        <Edit className="w-4 h-4" />
                      </button>
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
