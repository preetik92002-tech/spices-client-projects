"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface DesktopNavigationProps {
  onOpenSearch: () => void;
}

const NAV_LINKS = [
  { name: "SHOP ALL", href: "/shop" },
  { name: "MASALAS", href: "/collections/curry-masalas" },
  { name: "SEASONINGS", href: "/collections/gourmet-seasonings" },
  { name: "COLLECTIONS", href: "/collections" },
  { name: "RECIPES", href: "/#recipes" },
  { name: "OUR STORY", href: "/about" },
  { name: "JOURNAL", href: "/journal" },
  { name: "CONTACT", href: "/contact" },
];

export function DesktopNavigation({ onOpenSearch }: DesktopNavigationProps) {
  const pathname = usePathname();
  const { openCart, itemCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <nav className="hidden lg:block w-full bg-[#FAF8F5] border-y border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-14 sm:h-16 flex items-center justify-between">
        {/* LEFT: Search line icon */}
        <div className="w-28 flex items-center justify-start">
          <button
            onClick={onOpenSearch}
            aria-label="Search spices and seasonings"
            className="p-2 -ml-2 text-stone-700 hover:text-[#143627] transition-colors focus:outline-none"
            title="Search"
          >
            <Search className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* CENTER: Navigation links (No pills, no buttons, elegant tracking) */}
        <div className="flex-1 flex items-center justify-center space-x-7 xl:space-x-9">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/shop"
                ? pathname === "/shop"
                : link.href === "/#recipes"
                ? false
                : pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[11px] xl:text-[12px] uppercase tracking-[0.14em] font-sans font-normal transition-all duration-200 relative py-1",
                  isActive
                    ? "text-[#143627] border-b border-[#143627]"
                    : "text-stone-700 hover:text-[#143627] hover:opacity-100"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* RIGHT: Account, Wishlist, Bag icons */}
        <div className="w-28 flex items-center justify-end space-x-3">
          <Link
            href="/admin"
            aria-label="Account and operations"
            title="Admin & Account"
            className="p-2 text-stone-700 hover:text-[#143627] transition-colors"
          >
            <User className="w-4 h-4 stroke-[1.5]" />
          </Link>

          <Link
            href="/wishlist"
            aria-label="Wishlist saved spices"
            title="Wishlist"
            className="relative p-2 text-stone-700 hover:text-[#143627] transition-colors"
          >
            <Heart className="w-4 h-4 stroke-[1.5]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#143627] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono font-medium">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={openCart}
            aria-label="Shopping bag"
            title="Shopping Bag"
            className="relative p-2 text-stone-700 hover:text-[#143627] transition-colors focus:outline-none"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#B44C2D] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono font-medium">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
