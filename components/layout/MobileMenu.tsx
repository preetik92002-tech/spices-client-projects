"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { siteConfig } from "@/config/site";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOBILE_NAV_LINKS = [
  { label: "Shop All", href: "/shop" },
  { label: "Curry Masalas", href: "/collections/curry-masalas" },
  { label: "Gourmet Seasonings", href: "/collections/gourmet-seasonings" },
  { label: "Tandoori & Grill", href: "/collections/tandoori-grill" },
  { label: "Collections", href: "/collections" },
  { label: "Recipes & Use Cases", href: "/#recipes" },
  { label: "Our Story & Facility", href: "/about" },
  { label: "The Journal", href: "/journal" },
  { label: "Contact & Wholesale", href: "/contact" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-xs"
          />

          {/* Premium Slide-over Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-[#FAF8F5] shadow-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
          >
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between border-b border-stone-200/80 pb-5">
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12">
                    <Image
                      src="/images/brand/flavouron-logo.png"
                      alt="Flavouron Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-editorial-heading text-lg tracking-[0.16em] uppercase font-normal text-stone-900 block">
                      FLAVOURON
                    </span>
                    <span className="text-[8px] tracking-[0.28em] uppercase text-stone-500 font-sans block -mt-0.5">
                      Artisanal Spices
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="p-2 rounded-full hover:bg-stone-200/60 text-stone-700 transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-8 flex flex-col space-y-4">
                {MOBILE_NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-center justify-between text-base font-editorial-heading tracking-wide uppercase text-stone-800 hover:text-[#143627] transition-colors py-1"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#B44C2D]" />
                  </Link>
                ))}
              </nav>

              {/* Saved Spices Quick Link */}
              <div className="mt-6 pt-4 border-t border-stone-200/70">
                <Link
                  href="/wishlist"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#143627] font-medium"
                >
                  <Heart className="w-4 h-4" /> View Saved Spices
                </Link>
              </div>
            </div>

            {/* Footer with Shivooham Credentials */}
            <div className="mt-10 pt-6 border-t border-stone-200/80 space-y-3">
              <div className="flex items-center gap-2 text-[11px] font-medium text-stone-700">
                <ShieldCheck className="w-4 h-4 text-[#143627]" />
                <span>Bilhaur, Kanpur Nagar, UP — 209205</span>
              </div>
              <div className="space-y-1.5 text-xs text-stone-500 font-serif">
                <p className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <a href="mailto:admin@flavouron.com" className="hover:underline">
                    admin@flavouron.com
                  </a>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <a href="tel:+918933813655" className="hover:underline">
                    +91 8933813655
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
