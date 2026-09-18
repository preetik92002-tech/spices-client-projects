import React from "react";
import { Leaf, ShieldCheck, Flame } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function PhilosophySection() {
  const pillars = [
    {
      icon: Leaf,
      title: "100% Pure & Natural",
      description:
        "Zero artificial food colors, zero MSG, and no artificial flavor enhancers. Just pure, sun-cured spices in their truest botanical form.",
    },
    {
      icon: Flame,
      title: "Cold-Process Milling",
      description:
        "Ground slowly at controlled temperatures to prevent heat friction from burning off the delicate, aromatic essential spice oils.",
    },
    {
      icon: ShieldCheck,
      title: "FSSAI Certified Purity",
      description:
        "Every batch from Shivooham Exports meets stringent food safety and hygienic packing standards with authentic dual FSSAI licensing.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] border-t border-[var(--border)]/60">
      <Container size="default">
        {/* Philosophy Editorial */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-eyebrow text-xs text-[var(--primary-green)]/80 tracking-[0.22em] block mb-3">
            OUR PROMISE
          </span>
          <h2 className="font-editorial-heading text-3xl sm:text-4xl lg:text-[40px] uppercase font-light text-[var(--foreground)] mb-6">
            Philosophy
          </h2>
          <p className="font-body-sans text-sm sm:text-base leading-relaxed text-[var(--muted-text)] font-light">
            We believe that true flavor should feel honest, unhurried, and
            wholesome. In an era of chemical food enhancers and mass-produced
            commercial powders, Flavouron was created to restore the genuine soul
            of Indian cuisine. Our recipes are crafted with patience,
            hand-selected whole spices, and balanced spices that bring people
            together around the dining table.
          </p>
        </div>

        {/* Brand Pillars */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center mb-10">
            <h3 className="font-eyebrow text-xs uppercase tracking-[0.2em] text-[var(--foreground)]">
              Brand Pillars
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-sm bg-white border border-[var(--border)] shadow-xs transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-full bg-[var(--sand)] flex items-center justify-center text-[var(--primary-green)] mb-5">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h4 className="font-editorial-heading text-lg font-medium text-[var(--foreground)] mb-2 uppercase tracking-wide">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm font-body-sans text-[var(--muted-text)] font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
