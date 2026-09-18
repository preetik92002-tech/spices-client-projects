import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function BrandIntroSection() {
  return (
    <section className="py-20 sm:py-28 md:py-32 bg-[#FAF8F5] border-b border-[var(--border)]/60">
      <Container size="narrow" className="text-center">
        {/* Subtle Brand Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE9DF] text-[10px] sm:text-xs uppercase tracking-[0.24em] text-[#143627] font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          Artisanal Spice Heritage
        </div>

        {/* Editorial Headline */}
        <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-[1.15] font-light">
          AUTHENTIC SPICES.
          <span className="block italic font-normal text-[#143627] mt-1">
            TIMELESS FLAVOUR.
          </span>
        </h2>

        {/* Brand Narrative */}
        <div className="mt-8 space-y-5 text-sm sm:text-base md:text-lg font-serif text-stone-700 leading-relaxed max-w-3xl mx-auto">
          <p>
            At <strong className="text-stone-900 font-semibold">Flavouron</strong>, we believe every memorable meal begins with the purity of whole botanicals. Born from the generational expertise of <strong className="text-stone-900 font-semibold">Shivooham Exports</strong> in Uttar Pradesh, our blends are slowly roasted at controlled temperatures, preserving the volatile aromatic oils that give real Indian cooking its soulful depth.
          </p>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base">
            From regal slow-simmered curries to modern street sandwiches and wok noodles, our masalas bridge timeless culinary rituals with the fast-paced everyday kitchen. Zero fillers. Zero artificial colours. Just unadulterated spice craft.
          </p>
        </div>

        {/* Dual verification pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-stone-500">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200 bg-white">
            <ShieldCheck className="w-3.5 h-3.5 text-[#143627]" /> FSSAI Lic. 22726317000406
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200 bg-white">
            <ShieldCheck className="w-3.5 h-3.5 text-[#143627]" /> FSSAI Lic. 22725663000269
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200 bg-white">
            Bilhaur, Kanpur Nagar, UP
          </span>
        </div>

        {/* Read Our Full Story Link */}
        <div className="mt-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#143627] hover:text-[#B44C2D] transition-colors border-b border-[#143627]/40 pb-1 hover:border-[#B44C2D]"
          >
            Read the Shivooham story <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
