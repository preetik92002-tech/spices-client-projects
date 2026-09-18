"use client";

import React, { useState, useEffect } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { BrandHeader } from "./BrandHeader";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileHeader } from "./MobileHeader";
import { MobileMenu } from "./MobileMenu";
import { SearchModal } from "@/components/search/SearchModal";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Smooth threshold for sticky compacting
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full bg-[#FAF8F5] transition-all duration-500 ease-in-out",
          isScrolled ? "shadow-md" : "shadow-none"
        )}
      >
        {/* LEVEL 1 — ANNOUNCEMENT BAR (Height ~32px, deep dark green) */}
        <AnnouncementBar />

        {/* LEVEL 2 — BRAND AREA (Desktop & Tablet: Spacious, centered lockup) */}
        <div className="hidden lg:block">
          <BrandHeader isScrolled={isScrolled} />
        </div>

        {/* LEVEL 3 — NAVIGATION (Desktop: Search | Centered Links | Cart/Account) */}
        <DesktopNavigation onOpenSearch={() => setSearchModalOpen(true)} />

        {/* MOBILE PRESENTATION (Retains same brand hierarchy with mobile drawer) */}
        <MobileHeader
          onOpenMenu={() => setMobileMenuOpen(true)}
          onOpenSearch={() => setSearchModalOpen(true)}
          isScrolled={isScrolled}
        />
      </header>

      {/* Global Slide-down / Fullscreen Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Global Search Overlay Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}
