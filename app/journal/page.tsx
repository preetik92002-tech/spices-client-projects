import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { JOURNAL_ARTICLES } from "@/lib/data/journal";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "The Journal | Flavouron Artisanal Spices & Culinary Stories",
  description:
    "Explore the history, physics of spice milling, and regional recipes from the spice master blenders at Shivooham Exports.",
};

export default function JournalPage() {
  const [featured, ...rest] = JOURNAL_ARTICLES;

  return (
    <div className="w-full py-12 md:py-20">
      <Container size="default">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B44C2D] font-semibold block mb-2">
            The Chronicler
          </span>
          <h1 className="font-editorial-heading text-4xl sm:text-5xl md:text-6xl text-stone-900 tracking-tight">
            The Flavouron Journal
          </h1>
          <p className="mt-4 text-sm sm:text-base text-stone-600 font-serif italic">
            Essays on botanical science, regional street history, and the timeless art of Indian slow cooking.
          </p>
        </div>

        {/* Lead Hero Article */}
        {featured && (
          <div className="mb-20 rounded-3xl bg-white border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:h-[450px] bg-[#FAF8F5] p-8 flex items-center justify-center">
                <Image
                  src={featured.featuredImage}
                  alt={featured.title}
                  fill
                  priority
                  className="object-contain p-6"
                />
              </div>

              <div className="lg:col-span-5 p-8 lg:p-12 space-y-4">
                <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                  <span className="uppercase tracking-widest text-[#143627] font-semibold">
                    {featured.category}
                  </span>
                  <span>•</span>
                  <span>{featured.readingTime}</span>
                </div>

                <h2 className="font-editorial-heading text-2xl sm:text-3xl md:text-4xl text-stone-900 leading-snug">
                  <Link
                    href={`/journal/${featured.slug}`}
                    className="hover:text-[#143627] transition-colors"
                  >
                    {featured.title}
                  </Link>
                </h2>

                <p className="text-sm text-stone-600 font-serif leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-serif italic">
                    By {featured.author.name}
                  </span>
                  <Link
                    href={`/journal/${featured.slug}`}
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#143627] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#1b4834] transition-colors"
                  >
                    Read Essay <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Remaining Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between bg-white rounded-2xl border border-stone-200/80 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div>
                <Link
                  href={`/journal/${article.slug}`}
                  className="relative aspect-[16/10] w-full bg-[#F5F2EC] overflow-hidden block p-4 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="absolute top-3 left-3 bg-[#143627] text-white text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-medium">
                    {article.category}
                  </span>
                </Link>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-mono mb-2">
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

              <div className="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-serif italic">
                  By {article.author.name}
                </span>
                <Link
                  href={`/journal/${article.slug}`}
                  className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-[#143627] hover:text-[#B44C2D] transition-colors group-hover:translate-x-1"
                >
                  Read Story <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
