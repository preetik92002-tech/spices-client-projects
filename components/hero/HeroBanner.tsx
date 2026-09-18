"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  desktopObjectPosition: string;
  mobileObjectPosition: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    image: "/images/hero/hero-slide-1.webp",
    alt: "Flavouron Artisanal Masalas and Seasoning Collection Lineup",
    eyebrow: "FLAVOURON • ARTISANAL SPICES",
    headingLine1: "AUTHENTIC FLAVOUR.",
    headingLine2: "BEAUTIFULLY CRAFTED.",
    description:
      "Discover the Flavouron collection of slow-roasted masalas, pure botanicals, and gourmet seasonings.",
    primaryCtaText: "EXPLORE COLLECTION",
    primaryCtaHref: "/shop",
    secondaryCtaText: "OUR STORY",
    secondaryCtaHref: "/about",
    desktopObjectPosition: "center 45%",
    mobileObjectPosition: "75% center",
  },
  {
    id: "slide-2",
    image: "/images/hero/hero-slide-2.webp",
    alt: "Flavouron Heritage Stone Staged Spice Pouches",
    eyebrow: "THE FLAVOURON COLLECTION",
    headingLine1: "EVERY DISH.",
    headingLine2: "A LITTLE MORE MAGIC.",
    description:
      "From everyday kitchen favourites to bold contemporary blends, crafted for pure culinary joy.",
    primaryCtaText: "SHOP FLAVOURON",
    primaryCtaHref: "/shop",
    secondaryCtaText: "OUR CRAFT",
    secondaryCtaHref: "/about",
    desktopObjectPosition: "center 50%",
    mobileObjectPosition: "65% center",
  },
];

const SLIDE_DURATION = 6000; // 6 seconds per slide

export function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [progress, setProgress] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Check user prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goToSlide = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % HERO_SLIDES.length);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, [currentIndex, goToSlide]);

  // Handle slide timer and progress animation
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    startTimeRef.current = Date.now();
    setProgress(0);

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / SLIDE_DURATION) * 100);
      setProgress(pct);
    }, 50);

    timerRef.current = setTimeout(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPaused, nextSlide]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  return (
    <section
      role="region"
      aria-label="Homepage Featured Campaign Carousel"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="group relative w-full h-[72vh] sm:h-[78vh] md:h-[82vh] lg:h-[88vh] min-h-[540px] max-h-[920px] overflow-hidden bg-stone-950 select-none focus:outline-none"
    >
      {/* BACKGROUND SLIDES WITH KEN BURNS & SLOW CROSSFADE */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentIndex;

        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-1400 ease-in-out pointer-events-none",
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {/* Cinematic Image container with scale & pan */}
            <div
              className={cn(
                "relative w-full h-full transform-gpu",
                isActive && !prefersReducedMotion
                  ? "animate-hero-kenburns scale-100 transition-transform duration-[6500ms] ease-out"
                  : "scale-100"
              )}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={idx === 0}
                loading={idx === 0 ? "eager" : "lazy"}
                sizes="100vw"
                className="object-cover hidden sm:block"
                style={{ objectPosition: slide.desktopObjectPosition }}
              />
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={idx === 0}
                loading={idx === 0 ? "eager" : "lazy"}
                sizes="100vw"
                className="object-cover block sm:hidden"
                style={{ objectPosition: slide.mobileObjectPosition }}
              />
            </div>

            {/* Targeted subtle gradient overlay on the text placement side only */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/40 to-transparent sm:w-2/3 lg:w-1/2 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/20 sm:hidden pointer-events-none" />
          </div>
        );
      })}

      {/* CONTENT OVERLAY — Placed on the ambient left side so packaging stays unobstructed */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center">
        <div className="max-w-xl text-left text-white pt-4 sm:pt-0">
          {/* Eyebrow */}
          <span className="inline-block text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.28em] font-sans font-medium text-[#C5A059] mb-3 sm:mb-4">
            {HERO_SLIDES[currentIndex].eyebrow}
          </span>

          {/* Heading */}
          <h1 className="font-editorial-heading text-3xl sm:text-5xl md:text-6xl font-light tracking-wide uppercase leading-[1.08] text-stone-100 drop-shadow-sm">
            {HERO_SLIDES[currentIndex].headingLine1}
            <br />
            {HERO_SLIDES[currentIndex].headingLine2}
          </h1>

          {/* Description */}
          <p className="mt-3 sm:mt-5 text-xs sm:text-sm md:text-base font-sans text-stone-300 font-light leading-relaxed max-w-md tracking-wide">
            {HERO_SLIDES[currentIndex].description}
          </p>

          {/* Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href={HERO_SLIDES[currentIndex].primaryCtaHref}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-full text-[11px] sm:text-xs font-sans uppercase tracking-[0.18em] font-medium bg-[#FAF8F5] text-stone-950 hover:bg-[#C5A059] hover:text-stone-950 transition-all shadow-md group/cta"
            >
              <span>{HERO_SLIDES[currentIndex].primaryCtaText}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-200 group-hover/cta:translate-x-1" />
            </Link>

            <Link
              href={HERO_SLIDES[currentIndex].secondaryCtaHref}
              className="inline-flex items-center justify-center px-5 sm:px-7 py-3 rounded-full text-[11px] sm:text-xs font-sans uppercase tracking-[0.18em] font-medium border border-white/40 text-stone-200 hover:border-white hover:text-white hover:bg-white/10 transition-all backdrop-blur-xs"
            >
              {HERO_SLIDES[currentIndex].secondaryCtaText}
            </Link>
          </div>
        </div>
      </div>

      {/* NAVIGATION ARROWS — Minimal, elegant edge controls */}
      <button
        onClick={prevSlide}
        aria-label="Previous Hero Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 text-white/70 hover:text-white transition-all duration-300 opacity-70 group-hover:opacity-100 focus:outline-none"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1.2]" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Hero Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 text-white/70 hover:text-white transition-all duration-300 opacity-70 group-hover:opacity-100 focus:outline-none"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1.2]" />
      </button>

      {/* SLIDE INDICATORS — Progress line for active slide, dot for inactive */}
      <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-16 z-30 flex items-center space-x-3">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;

          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="relative h-2 py-1 flex items-center focus:outline-none cursor-pointer"
            >
              {isActive ? (
                <div className="relative w-12 sm:w-16 h-[2px] bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#C5A059] transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/80 transition-colors" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
