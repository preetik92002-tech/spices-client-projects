import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-[#F7F3EC] border-t border-[var(--border)] pt-16 pb-12 text-[var(--foreground)]">
      <Container size="default">
        {/* Brand Crest & Primary Details */}
        <div className="flex flex-col items-center text-center pb-12 border-b border-[var(--border)]/70">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 overflow-hidden rounded-full border border-[var(--border)] bg-white shadow-sm">
            <Image
              src="/images/brand/flavouron-logo.jpeg"
              alt="Flavouron Official Crest"
              fill
              className="object-contain p-1"
            />
          </div>

          <h3 className="font-editorial-heading text-2xl sm:text-3xl tracking-[0.16em] uppercase font-semibold text-[var(--foreground)]">
            {siteConfig.name}
          </h3>
          <p className="font-eyebrow text-xs text-[var(--muted-text)] mt-1">
            Artisanal Spices & Blends
          </p>

          {/* Direct Contacts - Pristine Forest style */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs font-body-sans text-[var(--foreground)]">
            <div>
              <span className="text-[var(--muted-text)] mr-2 uppercase tracking-wider">
                Email:
              </span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-[var(--primary-green)] underline underline-offset-4 decoration-[var(--border)]"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="hidden sm:block text-[var(--border)]">•</div>
            <div>
              <span className="text-[var(--muted-text)] mr-2 uppercase tracking-wider">
                Phone:
              </span>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="hover:text-[var(--primary-green)] underline underline-offset-4 decoration-[var(--border)]"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Multi-column Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 py-12 border-b border-[var(--border)]/70 text-xs uppercase tracking-[0.16em]">
          {/* Column 1: Explore */}
          <div>
            <h4 className="font-serif font-semibold text-sm tracking-widest text-[var(--primary-green)] mb-4">
              Explore
            </h4>
            <ul className="space-y-3 font-normal text-[var(--muted-text)]">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/curry-masalas"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Curry Masalas
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/tandoori-grill"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Tandoori & Grill
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/gourmet-seasonings"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Gourmet Seasonings
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/quick-bites"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Quick Bites
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: The House */}
          <div>
            <h4 className="font-serif font-semibold text-sm tracking-widest text-[var(--primary-green)] mb-4">
              The House
            </h4>
            <ul className="space-y-3 font-normal text-[var(--muted-text)]">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Philosophy
                </Link>
              </li>
              <li>
                <Link
                  href="/about#sourcing"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Spice Sourcing
                </Link>
              </li>
              <li>
                <Link
                  href="/about#pillars"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Quality Standards
                </Link>
              </li>
              <li>
                <Link
                  href="/journal"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  The Spice Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="font-serif font-semibold text-sm tracking-widest text-[var(--primary-green)] mb-4">
              Customer Care
            </h4>
            <ul className="space-y-3 font-normal text-[var(--muted-text)]">
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Frequently Asked
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Sourcing & Integrity */}
          <div>
            <h4 className="font-serif font-semibold text-sm tracking-widest text-[var(--primary-green)] mb-4">
              Food Safety
            </h4>
            <div className="space-y-2 text-[11px] font-normal normal-case tracking-normal text-[var(--muted-text)]">
              <p className="font-medium text-[var(--foreground)]">
                FSSAI Certified Facilities
              </p>
              <p>Mfg Lic: {siteConfig.fssai.mfg}</p>
              <p>Packing Lic: {siteConfig.fssai.packing}</p>
              <p className="pt-2 text-[10px] uppercase tracking-wider text-[var(--terracotta)] font-semibold">
                100% Vegetarian • Zero MSG
              </p>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[var(--muted-text)] space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>
              © {new Date().getFullYear()} {siteConfig.name}. Manufactured &
              Marketed by {siteConfig.company}.
            </span>
            <span className="hidden sm:inline">•</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6 text-[10px] uppercase tracking-widest">
            <Link
              href="/privacy"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/compliance"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              FSSAI Info
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
