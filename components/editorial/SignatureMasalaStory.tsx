import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function SignatureMasalaStory() {
  return (
    <section className="py-20 sm:py-28 md:py-36 bg-white overflow-hidden border-b border-[var(--border)]/60">
      <Container size="default">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B44C2D] font-semibold block mb-3">
            Signature Craft
          </span>
          <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-tight">
            The Stories Behind Our Blends
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-600 font-serif italic">
            Each blend is balanced to bring restaurant-grade complexity into everyday home cooking without shortcuts.
          </p>
        </div>

        {/* Story 1: Paneer Lababdar Masala (Image Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 sm:mb-32">
          {/* Image composition */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-3xl bg-[#FAF8F5] border border-stone-200/80 p-8 sm:p-14 flex items-center justify-center shadow-xs overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#143627]/5 via-transparent to-[#C5A059]/10 pointer-events-none" />
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] transition-transform duration-700 group-hover:scale-105 rounded-2xl overflow-hidden">
                <Image
                  src="/images/products/paneer-lababdar/editorial-01.webp"
                  alt="Flavouron Paneer Lababdar Masala Culinary Composition"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover drop-shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* Text composition */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#143627]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              The Royal North Indian Gravy
            </div>

            <h3 className="font-editorial-heading text-3xl sm:text-4xl text-stone-900 leading-tight">
              Flavouron Paneer Lababdar Masala
            </h3>

            <p className="font-serif text-stone-600 text-sm sm:text-base leading-relaxed">
              Crafted with slow-roasted mace, green cardamom, star anise, and toasted coriander, our Paneer Lababdar masala creates that velvety, fragrant tomato-cashew reduction synonymous with old Mughal banquet houses.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700 font-sans">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#143627] shrink-0" />
                <span>Zero artificial red colours — naturally crimson with Kashmiri chili</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#143627] shrink-0" />
                <span>Stone-ground mace &amp; royal nutmeg for rich bouquet</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#143627] shrink-0" />
                <span>Authentic FSSAI certified recipe tested across 500+ home trials</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/products/paneer-lababdar-masala"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#143627] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#1b4834] transition-colors shadow-sm"
              >
                Shop This Blend <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Story 2: Veg Biryani Masala (Text Left, Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Text composition */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#B44C2D]">
              <Sparkles className="w-3.5 h-3.5 text-[#B44C2D]" />
              The Awadhi Dum Experience
            </div>

            <h3 className="font-editorial-heading text-3xl sm:text-4xl text-stone-900 leading-tight">
              Flavouron Veg Biryani Masala
            </h3>

            <p className="font-serif text-stone-600 text-sm sm:text-base leading-relaxed">
              A regal pot of biryani lives and dies by its aromatics. Our master blender in Kanpur combines whole bay leaves, black cardamom, cloves, and Ceylon cinnamon that unlock their aromas when layered under fragrant Basmati rice and sealed with slow dum.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700 font-sans">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B44C2D] shrink-0" />
                <span>Coarsely cracked botanicals that infuse every grain of rice</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B44C2D] shrink-0" />
                <span>Warm notes of saffron nuance, star anise, and whole black pepper</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B44C2D] shrink-0" />
                <span>Perfect for handi dum, layered pulao, or festive jackfruit biryani</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/products/veg-biryani-masala"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#143627] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#1b4834] transition-colors shadow-sm"
              >
                Shop This Blend <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Image composition */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-[#FAF8F5] border border-stone-200/80 p-8 sm:p-14 flex items-center justify-center shadow-xs overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B44C2D]/5 via-transparent to-[#C5A059]/10 pointer-events-none" />
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] transition-transform duration-700 group-hover:scale-105 rounded-2xl overflow-hidden">
                <Image
                  src="/images/products/veg-biryani-masala/editorial-01.webp"
                  alt="Flavouron Veg Biryani Masala Royal Presentation"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
