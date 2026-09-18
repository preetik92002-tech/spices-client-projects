import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

const PROMISES = [
  {
    number: "01",
    title: "Crafted Flavour",
    description: "Every blend is developed through careful sensory testing — balancing sweet, pungent, astringent, and bitter botanical notes without artificial enhancers.",
  },
  {
    number: "02",
    title: "Thoughtful Blends",
    description: "Formulated specifically for contemporary kitchens that demand deep flavor in less cooking time, without compromising tradition.",
  },
  {
    number: "03",
    title: "Indian Culinary Heritage",
    description: "Rooted in authentic regional profiles from Awadh, Maharashtra, Gujarat, and the spice-rich coastlines of southern India.",
  },
  {
    number: "04",
    title: "Consistent Quality",
    description: "Strict laboratory grade hygiene, dual FSSAI compliance, and batch-wise aroma checks before any pouch leaves our packaging line.",
  },
  {
    number: "05",
    title: "Everyday Versatility",
    description: "Not reserved solely for festive holidays. Designed to elevate daily rotis, quick dals, midnight sandwiches, and family feasts alike.",
  },
];

export function BrandPromiseSection() {
  return (
    <section className="py-20 sm:py-28 md:py-36 bg-[#FAF8F5] border-b border-[var(--border)]/60">
      <Container size="default">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B44C2D] font-semibold block mb-3">
            Our Creed
          </span>
          <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-tight">
            The Flavouron Standard
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-600 font-serif italic">
            Honest, grounded luxury. No fabricated certifications or hollow marketing claims — just uncompromised spice integrity.
          </p>
        </div>

        {/* 5 Authentic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {PROMISES.map((promise, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200/80 flex flex-col justify-between hover:border-[#143627]/40 transition-all hover:shadow-xs"
            >
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-light text-[#C5A059] block mb-4">
                  {promise.number}
                </span>
                <h3 className="font-editorial-heading text-lg sm:text-xl text-stone-900 font-semibold mb-3">
                  {promise.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-serif">
                  {promise.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#143627] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Principle
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
