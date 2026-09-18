import React from "react";
import Link from "next/link";
import { Globe2, ShieldCheck, Factory, ArrowRight, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function ExportStorySection() {
  return (
    <section className="py-20 sm:py-28 md:py-36 bg-[#143627] text-white relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#C5A059] via-transparent to-black pointer-events-none" />

      <Container size="default" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
              <Globe2 className="w-3.5 h-3.5" /> Shivooham Exports
            </span>

            <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FAF8F5] tracking-tight leading-[1.1]">
              FROM INDIA, TO TABLES AROUND THE WORLD.
            </h2>

            <div className="space-y-4 text-xs sm:text-sm md:text-base text-white/80 font-serif leading-relaxed max-w-2xl">
              <p>
                Flavouron is the flagship consumer brand of <strong className="text-white font-semibold">Shivooham Exports</strong>, headquartered in Bilhaur, Kanpur Nagar, Uttar Pradesh. Operating under stringent dual FSSAI licenses, our facility is engineered to process whole Indian botanicals with uncompromising hygiene and export-grade aroma barrier packaging.
              </p>
              <p className="text-white/70">
                Prepared with precision for domestic homes and international food lovers seeking authentic Indian origin, our blends preserve volatile oils across transit, ensuring that when each seal is broken, the aroma is as fresh as the day it was ground.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FAF8F5] text-[#143627] text-xs uppercase tracking-widest font-semibold hover:bg-[#EFE9DF] transition-colors shadow-sm"
              >
                Trade &amp; Export Inquiries <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/30 text-white text-xs uppercase tracking-widest font-medium hover:bg-white/10 transition-colors"
              >
                Our Facility &amp; Standards
              </Link>
            </div>
          </div>

          {/* Right Column: Verification & Standards Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#C5A059]">
                <Factory className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest font-semibold">
                  Manufacturing Facility
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/90 font-serif">
                Bilhaur, Kanpur Nagar, Uttar Pradesh — 209205. Clean-room spice sorting, pneumatic cleaning, and inert gas flushing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#C5A059]">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest font-semibold">
                  Dual FSSAI Licences
                </span>
              </div>
              <div className="font-mono text-xs text-white/80 space-y-1">
                <div>Manufacturing: <span className="text-[#FAF8F5] font-semibold">22726317000406</span></div>
                <div>Export &amp; Relabel: <span className="text-[#FAF8F5] font-semibold">22725663000269</span></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#C5A059]">
                <Award className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest font-semibold">
                  Aroma-Barrier Packaging
                </span>
              </div>
              <p className="text-xs text-white/70 font-serif">
                Multi-layer nitrogen-flushed metalized pouches preventing oxidation, UV exposure, and moisture ingress during global transit.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
