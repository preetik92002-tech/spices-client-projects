"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandHeaderProps {
  isScrolled?: boolean;
}

export function BrandHeader({ isScrolled = false }: BrandHeaderProps) {
  return (
    <div
      className={cn(
        "w-full bg-[#FAF8F5] transition-all duration-500 ease-in-out flex flex-col items-center justify-center select-none overflow-hidden",
        isScrolled
          ? "py-2 sm:py-3 min-h-[64px] sm:min-h-[72px]"
          : "py-7 sm:py-10 md:py-12 min-h-[150px] sm:min-h-[175px] md:min-h-[190px]"
      )}
    >
      <Link
        href="/"
        className="group flex flex-col items-center justify-center text-center focus:outline-none"
      >
        {/* Transparent Flavouron Logo — Never inside a white box or background */}
        <div
          className={cn(
            "relative transition-all duration-500 ease-in-out",
            isScrolled
              ? "w-11 h-11 sm:w-12 sm:h-12"
              : "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
          )}
        >
          <Image
            src="/images/brand/flavouron-logo.png"
            alt="Flavouron Artisanal Spices"
            fill
            priority
            sizes="(max-width: 768px) 120px, 160px"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Wordmark: FLAVOURON in elegant serif display */}
        <span
          className={cn(
            "font-editorial-heading uppercase text-stone-900 font-normal transition-all duration-500 ease-in-out group-hover:text-[#143627]",
            isScrolled
              ? "text-base sm:text-lg tracking-[0.2em] mt-0.5"
              : "text-2xl sm:text-3xl md:text-4xl tracking-[0.24em] mt-2.5"
          )}
        >
          FLAVOURON
        </span>

        {/* Subtitle: ARTISANAL SPICES in small, wide-spaced sans-serif */}
        <span
          className={cn(
            "uppercase font-sans text-stone-500 transition-all duration-500 ease-in-out",
            isScrolled
              ? "text-[8px] tracking-[0.26em] -mt-0.5 opacity-80"
              : "text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.34em] mt-1 opacity-90"
          )}
        >
          ARTISANAL SPICES
        </span>
      </Link>
    </div>
  );
}
