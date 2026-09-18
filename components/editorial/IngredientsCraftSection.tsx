import { Sparkles, Flame, ShieldAlert, ThermometerSnowflake, Droplets } from "lucide-react";
import { Container } from "@/components/ui/Container";

const WHOLE_SPICES = [
  {
    name: "Alleppey Green Cardamom",
    origin: "Western Ghats, Kerala",
    character: "Earthy camphor, sweet botanical citrus notes",
    keyIn: "Veg Biryani, Paneer Lababdar",
  },
  {
    name: "Coorg Black Pepper",
    origin: "Karnataka Plantations",
    character: "High piperine heat, intense aromatic pungency",
    keyIn: "Tandoori Chicken, Curry Masala",
  },
  {
    name: "Toasted Royal Mace (Javitri)",
    origin: "Kerala & Konkan Coast",
    character: "Delicate floral perfume with warm sweet undertones",
    keyIn: "Paneer Lababdar, Awadhi Biryani",
  },
  {
    name: "Ceylon True Cinnamon",
    origin: "Southern Coast",
    character: "Soft sweet bark, gentle warmth without harshness",
    keyIn: "Curry Masala, Speciality Blends",
  },
  {
    name: "Sun-Cured Star Anise",
    origin: "Northeast Hills",
    character: "Subtle licorice bouquet, digestive lightness",
    keyIn: "Biryani Dum, Fried Rice Masala",
  },
  {
    name: "Unpolished Jeera (Cumin)",
    origin: "Saurashtra, Gujarat",
    character: "Rich cuminaldehyde content, nutty smokiness",
    keyIn: "Sandwich Masala, Chhole Masala",
  },
];

const CRAFT_PILLARS = [
  {
    icon: ThermometerSnowflake,
    title: "Low-Temperature Cold Milling",
    desc: "Industrial high-speed grinding generates intense heat (up to 90°C) that evaporates delicate aroma compounds. We grind at controlled low temperatures under 38°C to keep volatile oils intact.",
  },
  {
    icon: Droplets,
    title: "Essential Volatile Oil Preservation",
    desc: "A masala is only as potent as the oils sealed inside the spice cell walls. Our slow grinding method ensures maximum volatile essential oils per gram.",
  },
  {
    icon: Flame,
    title: "Small-Batch Hand Roasting",
    desc: "Spices are gently dry-toasted in small batches, triggering the Maillard reaction that brings out deep sweetness without scorching.",
  },
  {
    icon: ShieldAlert,
    title: "Zero MSG, Zero Colours, Zero Fillers",
    desc: "No starch bulkers, no artificial red dyes (Sudan/Rhodamine B free), no artificial flavor enhancers. Just pure, uncompromised botanicals.",
  },
];

export function IngredientsCraftSection() {
  return (
    <section className="py-20 sm:py-28 md:py-36 bg-[#FAF8F5] border-b border-[var(--border)]/60">
      <Container size="default">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#143627] font-semibold block mb-3">
            Botanical Integrity
          </span>
          <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-tight">
            The Craft Before The Grind
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-600 font-serif italic">
            A great blend is not created in a machine — it begins in the soil and is protected by gentle handling.
          </p>
        </div>

        {/* Whole Spices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {WHOLE_SPICES.map((spice, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-stone-200/80 hover:border-stone-300 transition-all hover:shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest text-[#B44C2D] font-mono font-medium">
                  {spice.origin}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              </div>
              <h3 className="font-editorial-heading text-lg sm:text-xl text-stone-900 font-semibold mb-2">
                {spice.name}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-serif mb-4">
                &ldquo;{spice.character}&rdquo;
              </p>
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Featured in:</span>
                <span className="font-medium text-[#143627]">{spice.keyIn}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Craft Process Pillars */}
        <div className="rounded-3xl bg-[#EFE9DF] p-8 sm:p-12 lg:p-16 border border-stone-300/60">
          <div className="max-w-xl mx-auto text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#143627] font-semibold">
              The Flavouron Milling Standard
            </span>
            <h3 className="font-editorial-heading text-2xl sm:text-3xl text-stone-900 mt-2">
              Why Our Blends Taste Different
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CRAFT_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="flex flex-col space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#143627] text-[#FAF8F5] flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h4 className="font-editorial-heading text-base font-semibold text-stone-900">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-serif">
                    {pillar.desc}
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
