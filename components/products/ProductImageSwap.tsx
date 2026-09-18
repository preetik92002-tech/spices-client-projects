"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ProductImageSwapProps {
  primaryImage: string;
  secondaryImage?: string;
  alt: string;
  badge?: string;
  priority?: boolean;
}

export function ProductImageSwap({
  primaryImage,
  secondaryImage,
  alt,
  badge,
  priority = false,
}: ProductImageSwapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobileActive, setIsMobileActive] = useState(false);
  const [mobileShowingSecondary, setMobileShowingSecondary] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Check whether we are on a touch/mobile device
  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none) and (pointer: coarse)");
    const updateMobile = () => setIsMobileActive(mediaQuery.matches);
    updateMobile();

    mediaQuery.addEventListener?.("change", updateMobile);
    return () => mediaQuery.removeEventListener?.("change", updateMobile);
  }, []);

  // IntersectionObserver: Pause auto-swap whenever element is not in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Mobile auto-swap cycle (only when mobile + intersecting + secondary image exists + reduced motion not requested)
  useEffect(() => {
    if (!isMobileActive || !isIntersecting || !secondaryImage || secondaryImage === primaryImage) {
      return;
    }

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setMobileShowingSecondary((prev) => !prev);
    }, 3500); // 3.5s hold time

    return () => clearInterval(interval);
  }, [isMobileActive, isIntersecting, secondaryImage, primaryImage]);

  const hasSecondary = Boolean(secondaryImage && secondaryImage !== primaryImage);

  // Calculate opacities
  // On desktop: controlled via Tailwind group-hover
  // On mobile: controlled via mobileShowingSecondary state
  const primaryOpacityClass = isMobileActive
    ? mobileShowingSecondary && hasSecondary
      ? "opacity-0"
      : "opacity-100"
    : hasSecondary
    ? "group-hover:opacity-0"
    : "opacity-100";

  const secondaryOpacityClass = isMobileActive
    ? mobileShowingSecondary
      ? "opacity-100"
      : "opacity-0"
    : "opacity-0 group-hover:opacity-100";

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] bg-[#FAF8F5] rounded-xs overflow-hidden select-none p-5 sm:p-7 flex items-center justify-center transition-colors duration-500 group-hover:bg-[#F5F2EB]"
    >
      {/* Authentic Badge */}
      {badge && (
        <span className="absolute top-3 left-3 z-10 bg-[#143627] text-white text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium shadow-xs">
          {badge}
        </span>
      )}

      {/* Image Stage */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Image 1: Primary (Edited / Lifestyle Photograph) */}
        <Image
          src={primaryImage}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-700 ease-in-out group-hover:scale-104 ${primaryOpacityClass}`}
        />

        {/* Image 2: Secondary (Original Clean Packaging) */}
        {hasSecondary && (
          <Image
            src={secondaryImage!}
            alt={`${alt} packaging view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-700 ease-in-out group-hover:scale-104 ${secondaryOpacityClass}`}
          />
        )}
      </div>

      {/* Mobile Auto-Swap Indicator (Subtle micro-dots only on mobile when secondary image exists) */}
      {isMobileActive && hasSecondary && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded-full pointer-events-none">
          <span
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
              !mobileShowingSecondary ? "bg-[#143627]" : "bg-stone-300"
            }`}
          />
          <span
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
              mobileShowingSecondary ? "bg-[#143627]" : "bg-stone-300"
            }`}
          />
        </div>
      )}

      {/* Natural Grounding Shadow */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-2 bg-stone-900/5 blur-xs rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
    </div>
  );
}
