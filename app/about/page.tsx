import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Factory, Award, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Our Heritage & Facility | FLAVOURON & Shivooham Exports",
  description:
    "Discover the story of Shivooham Exports, based in Bilhaur, Kanpur Nagar, UP — pioneering cold-milled artisanal Indian spices.",
};

export default function AboutPage() {
  return (
    <div className="w-full py-12 md:py-24 bg-[#FAF8F5]">
      <Container size="default">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B44C2D] font-semibold block mb-3">
            Generational Craft
          </span>
          <h1 className="font-editorial-heading text-4xl sm:text-5xl md:text-6xl text-stone-900 tracking-tight leading-[1.1]">
            The Journey From Botanical Purity to Everyday Kitchens
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-stone-600 font-serif italic">
            How Shivooham Exports set out to build Flavouron — restoring the lost essential oils of traditional Indian slow cooking.
          </p>
        </div>

        {/* Story Section 1: The Origin */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 sm:mb-28">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#143627] font-semibold">
              The Genesis
            </span>
            <h2 className="font-editorial-heading text-3xl sm:text-4xl text-stone-900 leading-tight">
              Rooted in the Soil of Uttar Pradesh
            </h2>
            <div className="font-serif text-stone-600 text-sm sm:text-base space-y-4 leading-relaxed">
              <p>
                Flavouron was born in Bilhaur, Kanpur Nagar, Uttar Pradesh, under the parent banner of <strong className="text-stone-900 font-semibold">Shivooham Exports</strong>. Surrounded by historic spice trade corridors and fertile agricultural plains, our founding mission was simple yet radical: eliminate the industrial shortcuts that plague supermarket spices.
              </p>
              <p>
                For decades, commercial mass production prioritized speed over aroma. Spices were pulverised at scorching speeds, leaching out the volatile oils that give cardamom, cumin, and cloves their true fragrance. Flavouron set out to rebuild the spice milling process from scratch.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-white border border-stone-200/80 p-4 sm:p-6 shadow-md flex items-center justify-center overflow-hidden group">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden">
                <Image
                  src="/images/story/curry-masala-craft.webp"
                  alt="Flavouron Royal Kitchen Curry Masala Botanical Formulation with Whole Spices"
                  fill
                  priority
                  className="object-contain transform group-hover:scale-103 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Story Section 2: Botanical Purity & Cold Milling */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 sm:mb-28">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/80 aspect-[16/10]">
              <Image
                src="/images/story/coastal-lineup.webp"
                alt="Flavouron Artisanal Spice Lineup on River Stones"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="text-xs uppercase tracking-widest text-[#B44C2D] font-semibold">
              The Cold-Milling Standard
            </span>
            <h2 className="font-editorial-heading text-3xl sm:text-4xl text-stone-900 leading-tight">
              Aroma That Never Evaporates
            </h2>
            <div className="font-serif text-stone-600 text-sm sm:text-base space-y-4 leading-relaxed">
              <p>
                Every pouch of Flavouron Curry Masala begins with intact whole pods: whole green cardamoms from Idukki, star anise from the Northeast, hand-harvested black cardamom, and sun-dried stemless red chilis.
              </p>
              <p>
                By keeping milling temperatures consistently below 40°C, the volatile essential oils remain trapped inside the micro-particles until the moment you toss them into warm ghee in your home kitchen. That is the Flavouron difference: <em className="text-stone-800">har bite mein energy</em>.
              </p>
            </div>
          </div>
        </div>

        {/* Facility Credentials Grid */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200/80 shadow-xs mb-20">
          <div className="max-w-xl mx-auto text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#143627] font-semibold">
              Safety, Origin &amp; Compliance
            </span>
            <h3 className="font-editorial-heading text-2xl sm:text-3xl text-stone-900 mt-2">
              Verified Shivooham Facility Standards
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="space-y-3 p-4 rounded-2xl bg-[#FAF8F5]">
              <div className="w-12 h-12 rounded-xl bg-[#143627] text-white flex items-center justify-center">
                <Factory className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="font-editorial-heading text-lg font-semibold text-stone-900">
                Manufacturing Location
              </h4>
              <p className="text-xs text-stone-600 font-serif leading-relaxed">
                Bilhaur, Kanpur Nagar, Uttar Pradesh — 209205. Clean-room processing rooms with continuous HEPA filtered positive air pressure.
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-[#FAF8F5]">
              <div className="w-12 h-12 rounded-xl bg-[#143627] text-white flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="font-editorial-heading text-lg font-semibold text-stone-900">
                Dual FSSAI Compliance
              </h4>
              <p className="text-xs text-stone-600 font-serif leading-relaxed">
                Manufacturing Lic. <strong>22726317000406</strong> and Export/Relabelling Lic. <strong>22725663000269</strong> verified under national food safety regulators.
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-[#FAF8F5]">
              <div className="w-12 h-12 rounded-xl bg-[#143627] text-white flex items-center justify-center">
                <Award className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="font-editorial-heading text-lg font-semibold text-stone-900">
                Nitrogen Barrier Seal
              </h4>
              <p className="text-xs text-stone-600 font-serif leading-relaxed">
                Each pouch is nitrogen flushed prior to sealing, preventing lipid rancidity and aroma degradation across domestic and overseas transit.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-md mx-auto space-y-4">
          <h3 className="font-editorial-heading text-2xl text-stone-900">
            Experience the Aroma Firsthand
          </h3>
          <p className="text-xs text-stone-500 font-serif">
            Browse our complete collection of slow-roasted masalas, curated seasonings, and street blends.
          </p>
          <div className="pt-2">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#143627] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#1b4834] transition-colors shadow-sm"
            >
              Explore All Spices <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
