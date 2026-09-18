"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface MobileHeaderProps {
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  isScrolled?: boolean;
}

export function MobileHeader({
  onOpenMenu,
  onOpenSearch,
  isScrolled = false,
}: MobileHeaderProps) {
  const { openCart, itemCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <div className="block lg:hidden w-full bg-[#FAF8F5]">
      {/* Mobile Brand Area: Prominent centered lockup when at top */}
      <div
        className={cn(
          "w-full flex flex-col items-center justify-center transition-all duration-500 ease-in-out border-b border-stone-200/60",
          isScrolled ? "py-2.5 min-h-[56px]" : "py-6 min-h-[135px]"
        )}
      >
        <Link href="/" className="flex flex-col items-center text-center">
          <div
            className={cn(
              "relative transition-all duration-500 ease-in-out",
              isScrolled ? "w-10 h-10" : "w-20 h-20"
            )}
          >
            <Image
              src="/images/brand/flavouron-logo.png"
              alt="Flavouron"
              fill
              priority
              sizes="100px"
              className="object-contain"
            />
          </div>

          <span
            className={cn(
              "font-editorial-heading uppercase text-stone-900 font-normal transition-all duration-500",
              isScrolled
                ? "text-sm tracking-[0.18em] mt-0.5"
                : "text-xl tracking-[0.22em] mt-1.5"
            )}
          >
            FLAVOURON
          </span>

          {!isScrolled && (
            <span className="text-[8px] uppercase tracking-[0.28em] font-sans text-stone-500 mt-0.5">
              ARTISANAL SPICES
            </span>
          )}
        </Link>
      </div>

      {/* Compact Mobile Action Row: Hamburger, Center Logo/Title, Search & Cart */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-stone-200/80 bg-[#FAF8F5]">
        {/* Left: Hamburger */}
        <button
          onClick={onOpenMenu}
          aria-label="Open mobile menu"
          className="p-1.5 -ml-1 text-stone-700 hover:text-[#143627] focus:outline-none"
        >
          <Menu className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* Center: Small Subtitle / Quick link */}
        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-sans">
          Shivooham Exports
        </span>

        {/* Right: Search & Cart */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={onOpenSearch}
            aria-label="Search spices"
            className="p-1.5 text-stone-700 hover:text-[#143627]"
          >
            <Search className="w-4 h-4 stroke-[1.5]" />
          </button>

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative p-1.5 text-stone-700 hover:text-[#143627]"
          >
            <Heart className="w-4 h-4 stroke-[1.5]" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#143627] text-white text-[8px] w-3 h-3 rounded-full flex items-center justify-center font-mono">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={openCart}
            aria-label="Shopping bag"
            className="relative p-1.5 text-stone-700 hover:text-[#143627]"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            {itemCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#B44C2D] text-white text-[8px] w-3 h-3 rounded-full flex items-center justify-center font-mono">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
