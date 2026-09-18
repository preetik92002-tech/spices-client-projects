import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/data/categories";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CollectionGrid() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[var(--border)]/60">
      <Container size="wide">
        <SectionHeading
          eyebrow="The Spice Cellar"
          title="Collections"
          subtitle="Explore distinct culinary worlds, from slow-simmered royal gravies to vibrant street side seasonings."
          align="center"
          className="mb-12 sm:mb-16"
        />

        {/* 2x2 or 4-column Grid matching Pristine Forest */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/collections/${cat.slug}`}
              className="group flex flex-col items-center"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-square bg-[#F3EDE2] overflow-hidden rounded-sm border border-[var(--border)] p-4 flex items-center justify-center transition-all duration-500 group-hover:border-[var(--muted-gold)]/60 group-hover:shadow-md">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Title with Arrow */}
              <div className="mt-4 flex items-center space-x-1.5 text-xs sm:text-sm font-editorial-heading uppercase tracking-[0.16em] font-medium text-[var(--foreground)] group-hover:text-[var(--primary-green)] transition-colors">
                <span>{cat.name}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-[var(--terracotta)]" />
              </div>

              <span className="text-[11px] font-body-sans text-[var(--muted-text)] mt-0.5 text-center">
                {cat.tagline}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
