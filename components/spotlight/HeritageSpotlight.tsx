import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function HeritageSpotlight() {
  return (
    <section className="py-20 sm:py-28 bg-[var(--primary-green)] text-[#FAF8F5] relative overflow-hidden">
      {/* Delicate background ambient texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <Container size="default" className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left / Editorial Copy */}
          <div className="max-w-xl text-left">
            <span className="font-eyebrow text-xs text-[var(--muted-gold)] tracking-[0.22em] block mb-3">
              HERITAGE ARCHIVES & SOURCING
            </span>

            <h2 className="font-editorial-heading text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight text-[#FAF8F5] leading-tight mb-6">
              SHIVOOHAM
              <br />
              <span className="italic font-normal font-serif text-[var(--muted-gold)]">
                EXPORTS
              </span>
            </h2>

            <p className="text-sm sm:text-base font-body-sans font-light leading-relaxed text-[#FAF8F5]/80 mb-8">
              Every Flavouron blend is born from decades of generational spice
              wisdom. From the deep red soil of Kashmir to the lush pepper hills
              of Malabar, our spices are slow-harvested, sun-cured, and milled in
              cold-process granite rollers in Bilhaur, Kanpur. This locks in the
              volatile essential oils that mass-market commercial grinding
              destroys.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                variant="outline-light"
                size="md"
                href="/about"
              >
                Explore Our Heritage →
              </Button>

              <span className="text-xs uppercase tracking-widest text-[#FAF8F5]/60">
                FSSAI Lic. 22726317000406
              </span>
            </div>
          </div>

          {/* Right / Visual Artwork & Authentic Backing Showcase */}
          <div className="w-full lg:w-auto relative">
            <div className="relative w-full max-w-md aspect-[4/5] sm:w-[380px] rounded-lg overflow-hidden border border-white/15 bg-black/20 shadow-2xl p-6 flex flex-col justify-between">
              {/* Top Seal */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-eyebrow text-[10px] tracking-widest text-[var(--muted-gold)]">
                  BATCH HOM22688
                </span>
                <span className="text-[10px] uppercase tracking-wider text-white/70">
                  Export Quality Standard
                </span>
              </div>

              {/* Product Visual Centerpiece */}
              <div className="relative w-full h-64 flex items-center justify-center my-4">
                <Image
                  src="/images/products/paneer-lababdar-black.jpeg"
                  alt="Paneer Lababdar Master Blend"
                  fill
                  sizes="320px"
                  className="object-contain drop-shadow-2xl"
                />
              </div>

              {/* Quote / Sub-caption */}
              <div className="pt-4 border-t border-white/10 text-center">
                <p className="font-serif italic text-sm text-[var(--sand)]">
                  &ldquo;A perfect blend of spices for rich, restaurant style
                  gravy right at your home table.&rdquo;
                </p>
                <span className="text-[10px] uppercase tracking-widest text-white/50 block mt-1">
                  — Flavouron Master Recipe
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
