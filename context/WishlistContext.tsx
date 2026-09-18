"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (slug: string) => void;
  removeFromWishlist: (slug: string) => void;
  toggleWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = "flavouron_wishlist_v1";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [, startTransition] = useTransition();

  // Hydrate from localStorage safely on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTimeout(() => {
            startTransition(() => {
              setWishlist(parsed);
              setIsHydrated(true);
            });
          }, 0);
          return;
        }
      }
    } catch {
      // ignore parse errors
    }
    setTimeout(() => {
      startTransition(() => {
        setIsHydrated(true);
      });
    }, 0);
  }, []);

  // Save to localStorage whenever wishlist changes after hydration
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist, isHydrated]);

  const addToWishlist = (slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
  };

  const removeFromWishlist = (slug: string) => {
    setWishlist((prev) => prev.filter((item) => item !== slug));
  };

  const toggleWishlist = (slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]
    );
  };

  const isInWishlist = (slug: string) => wishlist.includes(slug);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
