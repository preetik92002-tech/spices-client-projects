import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, ArrowRight, Sparkles } from "lucide-react";
import { JOURNAL_ARTICLES } from "@/lib/data/journal";
import { Container } from "@/components/ui/Container";

export async function generateStaticParams() {
  return JOURNAL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const related = JOURNAL_ARTICLES.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <article className="w-full py-12 md:py-20">
      <Container size="narrow">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 hover:text-[#143627] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>
        </div>

        {/* Article Meta Header */}
        <div className="space-y-4 mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EFE9DF] text-[#143627] text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> {article.category}
          </span>

          <h1 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-[1.15]">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-stone-500 pt-2">
            <span className="inline-flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> {article.author.name}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {article.publishedAt}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readingTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full bg-[#FAF8F5] rounded-3xl overflow-hidden border border-stone-200/80 mb-12 p-8 flex items-center justify-center">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            priority
            className="object-contain p-6"
          />
        </div>

        {/* Excerpt Lead */}
        <div className="border-l-2 border-[#143627] pl-6 my-8">
          <p className="font-serif italic text-lg sm:text-xl text-stone-800 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Article Body */}
        <div className="prose prose-stone max-w-none font-serif text-stone-700 text-base sm:text-lg leading-relaxed space-y-6 pt-4 border-t border-stone-200">
          {article.content.split("\n\n").map((para, i) => {
            const clean = para.trim();
            if (!clean) return null;
            return <p key={i}>{clean}</p>;
          })}
        </div>

        {/* Tags & Author Bio */}
        <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-stone-400">
              Tags:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-stone-100 text-stone-600"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="text-xs text-stone-500 font-serif italic">
            Written by {article.author.name} ({article.author.role})
          </div>
        </div>

        {/* Related Articles Section */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-stone-200">
            <h3 className="font-editorial-heading text-2xl text-stone-900 mb-8 text-center">
              More From The Journal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/journal/${rel.slug}`}
                  className="group p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-stone-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#143627] font-semibold">
                      {rel.category}
                    </span>
                    <h4 className="font-editorial-heading text-lg text-stone-900 group-hover:text-[#143627] transition-colors mt-1 line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-[#143627]">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </article>
  );
}
