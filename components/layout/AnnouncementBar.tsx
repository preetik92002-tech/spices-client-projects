"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ANNOUNCEMENTS = [
  "FREE SHIPPING ON ORDERS ABOVE ₹999  •  DISCOVER FLAVOURON",
  "COLD-MILLED ARTISANAL SPICES  •  SLOW-ROASTED WHOLE BOTANICALS",
  "SHIVOOHAM EXPORTS  •  DUAL FSSAI COMPLIANT HERITAGE BLENDS",
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  return (
    <div className="h-8 sm:h-9 bg-[#143627] text-[#FAF8F5] flex items-center justify-between px-4 sm:px-8 border-b border-[#1b4834]/60 select-none z-50 relative">
      <button
        onClick={handlePrev}
        aria-label="Previous announcement"
        className="text-white/60 hover:text-[#C5A059] transition-colors p-1"
      >
        <ChevronLeft className="w-3 h-3 stroke-[1.5]" />
      </button>

      <div className="flex-1 text-center truncate px-2">
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-sans font-normal text-white/90">
          {ANNOUNCEMENTS[currentIndex]}
        </span>
      </div>

      <button
        onClick={handleNext}
        aria-label="Next announcement"
        className="text-white/60 hover:text-[#C5A059] transition-colors p-1"
      >
        <ChevronRight className="w-3 h-3 stroke-[1.5]" />
      </button>
    </div>
  );
}
