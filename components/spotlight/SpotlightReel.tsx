"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Share2,
  ShoppingBag,
  Sparkles,
  Check,
} from "lucide-react";
import { SPOTLIGHTS, SpotlightItem } from "@/lib/data/spotlights";
import { Container } from "@/components/ui/Container";

export function SpotlightReel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeReel: SpotlightItem = SPOTLIGHTS[activeIndex];
  const prevReel: SpotlightItem =
    SPOTLIGHTS[(activeIndex - 1 + SPOTLIGHTS.length) % SPOTLIGHTS.length];
  const nextReel: SpotlightItem =
    SPOTLIGHTS[(activeIndex + 1) % SPOTLIGHTS.length];

  // IntersectionObserver for performance: only run when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
        if (!entry.isIntersecting) {
          setIsPlaying(false);
        } else {
          setIsPlaying(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentElem = containerRef.current;
    if (currentElem) observer.observe(currentElem);

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, []);

  // Simulating video progress or tracking actual video
  useEffect(() => {
    if (!isInViewport || !isPlaying) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    // Advance simulated 15-second reel progress
    const interval = 100; // ms
    const step = (interval / 12000) * 100; // 12 seconds per reel

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Auto advance to next reel
          setActiveIndex((idx) => (idx + 1) % SPOTLIGHTS.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isInViewport, isPlaying, activeIndex]);

  // Reset progress when active slide changes
  const goToReel = (newIdx: number) => {
    setProgress(0);
    setActiveIndex(newIdx);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play().catch(() => {});
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${activeReel.title} — Flavouron Spotlight`,
      text: activeReel.description,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 md:py-36 bg-[#143627] text-white relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black" />

      <Container size="default" className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Spotlight
          </span>
          <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl text-[#FAF8F5] tracking-tight">
            Flavour in Motion
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-white/70 font-serif italic">
            Experience our artisanal masalas sizzling, roasting, and transforming home kitchens.
          </p>
        </div>

        {/* 3-Reel Layout (Desktop: small - LARGE - small; Mobile: single large) */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-10 max-w-5xl mx-auto">
          {/* Left Preview Reel (Desktop only) */}
          <div
            onClick={() => goToReel((activeIndex - 1 + SPOTLIGHTS.length) % SPOTLIGHTS.length)}
            className="hidden lg:flex flex-col items-center opacity-40 hover:opacity-75 transition-all duration-300 cursor-pointer transform -translate-x-4 scale-90 shrink-0"
          >
            <div className="relative w-56 aspect-[9/16] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/40 p-4 flex flex-col justify-end">
              <Image
                src={prevReel.posterUrl}
                alt={prevReel.title}
                fill
                sizes="240px"
                className="object-contain p-4 filter brightness-75"
              />
              <div className="relative z-10 bg-gradient-to-t from-black/80 to-transparent p-3 -m-4">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] block">
                  Previous
                </span>
                <p className="font-serif text-xs text-white line-clamp-1">
                  {prevReel.title}
                </p>
              </div>
            </div>
          </div>

          {/* ACTIVE 9:16 LARGE REEL */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl bg-stone-950 flex flex-col justify-between shrink-0 group">
            {/* Top Progress Bar */}
            <div className="absolute top-0 left-0 right-0 z-30 flex gap-1.5 p-3">
              {SPOTLIGHTS.map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 bg-white/25 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{
                      width:
                        i < activeIndex
                          ? "100%"
                          : i === activeIndex
                          ? `${progress}%`
                          : "0%",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Top Right Controls (Mute & Share) */}
            <div className="absolute top-6 right-4 z-30 flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white/90 hover:text-white hover:bg-black/70 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={handleShare}
                aria-label="Share reel"
                className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white/90 hover:text-white hover:bg-black/70 transition-colors relative"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Main Stage: Poster Image or Video */}
            <div
              className="relative w-full h-full cursor-pointer flex items-center justify-center overflow-hidden"
              onClick={handleTogglePlay}
            >
              {/* Fallback & Poster */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 z-10" />
              <div className="relative w-full h-full p-8 flex items-center justify-center">
                <Image
                  src={activeReel.posterUrl}
                  alt={activeReel.title}
                  fill
                  priority
                  sizes="400px"
                  className="object-contain p-6 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Center Play/Pause Overlay Indicator */}
              {!isPlaying && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-xs">
                  <div className="p-4 rounded-full bg-white/20 backdrop-blur-md text-white">
                    <Play className="w-8 h-8 fill-white ml-0.5" />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Overlay: Title & "SHOP THIS SPICE" Pill */}
            <div className="absolute bottom-0 left-0 right-0 z-30 p-5 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent space-y-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium block">
                  {activeReel.creatorName}
                </span>
                <h3 className="font-editorial-heading text-lg sm:text-xl text-white mt-0.5 line-clamp-1">
                  {activeReel.title}
                </h3>
                <p className="text-xs text-white/70 line-clamp-2 font-serif mt-1">
                  {activeReel.description}
                </p>
              </div>

              {/* SHOP THIS SPICE Interactive Pill */}
              <Link
                href={`/products/${activeReel.productSlug}`}
                className="flex items-center justify-between p-2.5 px-3.5 rounded-full bg-white text-[#143627] hover:bg-[#FAF8F5] transition-all duration-300 shadow-lg group/btn"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <ShoppingBag className="w-4 h-4 text-[#B44C2D] shrink-0" />
                  <span className="text-xs font-semibold tracking-wide truncate">
                    Shop {activeReel.productName}
                  </span>
                </div>
                <span className="font-serif text-xs font-bold text-stone-900 shrink-0 ml-2">
                  ₹{activeReel.productPrice} →
                </span>
              </Link>
            </div>
          </div>

          {/* Right Preview Reel (Desktop only) */}
          <div
            onClick={() => goToReel((activeIndex + 1) % SPOTLIGHTS.length)}
            className="hidden lg:flex flex-col items-center opacity-40 hover:opacity-75 transition-all duration-300 cursor-pointer transform translate-x-4 scale-90 shrink-0"
          >
            <div className="relative w-56 aspect-[9/16] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/40 p-4 flex flex-col justify-end">
              <Image
                src={nextReel.posterUrl}
                alt={nextReel.title}
                fill
                sizes="240px"
                className="object-contain p-4 filter brightness-75"
              />
              <div className="relative z-10 bg-gradient-to-t from-black/80 to-transparent p-3 -m-4">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] block">
                  Next Up
                </span>
                <p className="font-serif text-xs text-white line-clamp-1">
                  {nextReel.title}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Prev / Next Chevrons */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() =>
              goToReel((activeIndex - 1 + SPOTLIGHTS.length) % SPOTLIGHTS.length)
            }
            aria-label="Previous Spotlight"
            className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xs uppercase tracking-widest font-mono text-white/60">
            {activeIndex + 1} / {SPOTLIGHTS.length}
          </span>

          <button
            onClick={() =>
              goToReel((activeIndex + 1) % SPOTLIGHTS.length)
            }
            aria-label="Next Spotlight"
            className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </Container>
    </section>
  );
}
