"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface ProductRailProps {
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
}

export function ProductRail({
  title = "Trending Now",
  eyebrow = "Artisanal Harvest",
  subtitle = "Our most beloved slow-roasted blends, handpicked by master chefs.",
  products,
  viewAllHref = "/shop",
}: ProductRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[var(--background)]">
      <Container size="wide">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align="center"
          className="mb-10"
        />

        {/* Rail container with subtle floating arrows */}
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll previous"
            className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 border border-[var(--border)] shadow-md items-center justify-center text-[var(--foreground)] hover:bg-[var(--primary-green)] hover:text-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-none pb-6 pt-2 px-1 snap-x snap-mandatory"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="w-[280px] sm:w-[320px] shrink-0 snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll next"
            className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 border border-[var(--border)] shadow-md items-center justify-center text-[var(--foreground)] hover:bg-[var(--primary-green)] hover:text-white transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* View All Button */}
        <div className="mt-10 flex justify-center">
          <Button variant="primary" size="md" href={viewAllHref}>
            View all
          </Button>
        </div>
      </Container>
    </section>
  );
}
