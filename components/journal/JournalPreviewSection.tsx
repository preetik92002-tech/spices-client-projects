import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { JOURNAL_ARTICLES } from "@/lib/data/journal";
import { Container } from "@/components/ui/Container";

export function JournalPreviewSection() {
  const articles = JOURNAL_ARTICLES.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 md:py-36 bg-[#FAF8F5] border-b border-[var(--border)]/60">
      <Container size="default">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B44C2D] font-semibold block mb-3">
              The Spice Chronicler
            </span>
            <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-tight">
              FROM THE JOURNAL
            </h2>
          </div>

          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#143627] hover:text-[#B44C2D] transition-colors pb-1 border-b border-[#143627]/40 hover:border-[#B44C2D]"
          >
            View All Articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between bg-white rounded-2xl border border-stone-200/80 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Article Image */}
                <Link
                  href={`/journal/${article.slug}`}
                  className="relative aspect-[16/10] w-full bg-[#F5F2EC] overflow-hidden block p-4 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="absolute top-3 left-3 bg-[#143627] text-white text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-medium">
                    {article.category}
                  </span>
                </Link>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-mono mb-2.5">
                    <span>{article.publishedAt}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readingTime}
                    </span>
                  </div>

                  <h3 className="font-editorial-heading text-lg sm:text-xl text-stone-900 group-hover:text-[#143627] transition-colors line-clamp-2 leading-snug">
                    <Link href={`/journal/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-stone-600 font-serif leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Story Link */}
              <div className="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-serif italic">
                  By {article.author.name}
                </span>
                <Link
                  href={`/journal/${article.slug}`}
                  className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-[#143627] hover:text-[#B44C2D] transition-colors group-hover:translate-x-1"
                >
                  Read Story <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
