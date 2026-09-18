import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface StoryItem {
  eyebrow: string;
  title: string;
  accentColor: string;
  description: string;
  bullets: string[];
  productName: string;
  productSlug: string;
  editorialImage: string;
  imageAlt: string;
  reversed: boolean;
}

const SIGNATURE_STORIES: StoryItem[] = [
  {
    eyebrow: "The Royal North Indian Banquet",
    title: "Flavouron Paneer Lababdar",
    accentColor: "#C5A059",
    description:
      "Crafted with slow-roasted royal mace, fragrant green cardamom, and toasted coriander. Our master blend emulsifies effortlessly into a velvety, aromatic cashew-and-tomato reduction, recreating the banquet dining experience of old Delhi palaces at your dinner table.",
    bullets: [
      "Zero artificial red food dyes — naturally crimson with sun-dried Kashmiri chilies",
      "Stone-ground royal mace and nutmeg for an intoxicating top note",
      "Authentic FSSAI certified heritage recipe perfected across 500+ trial batches",
    ],
    productName: "Paneer Lababdar Masala",
    productSlug: "paneer-lababdar-masala",
    editorialImage: "/images/products/paneer-lababdar/editorial-01.webp",
    imageAlt: "Flavouron Paneer Lababdar Masala Culinary Composition with Copper Handi",
    reversed: false,
  },
  {
    eyebrow: "The Awadhi Dum Experience",
    title: "Flavouron Veg Biryani Masala",
    accentColor: "#B44C2D",
    description:
      "A regal pot of biryani lives and dies by the subtleties of its volatile aromatics. Whole Ceylon cinnamon quills, black cardamom pods, and star anise are cracked gently at low temperatures so they unfurl when sealed under steam with aged long-grain basmati.",
    bullets: [
      "Coarsely cracked whole botanicals that infuse every grain with subtle fragrance",
      "Layered undertones of saffron nuance, star anise, and whole black pepper",
      "Engineered for slow handi dum, celebratory layered pulao, or jackfruit biryani",
    ],
    productName: "Veg Biryani Masala",
    productSlug: "veg-biryani-masala",
    editorialImage: "/images/products/veg-biryani-masala/editorial-01.webp",
    imageAlt: "Flavouron Veg Biryani Masala Royal Presentation with Basmati Rice",
    reversed: true,
  },
  {
    eyebrow: "Iconic Street Food Heritage",
    title: "Flavouron Bombay Sandwich Masala",
    accentColor: "#143627",
    description:
      "The quintessential Mumbai street-corner sandwich relies on a razor-sharp balance between tang, heat, and herbaceous depth. Our Bombay Sandwich Masala combines toasted cumin, dry black salt, amchur, and roasted peppercorns to make every toasted bite burst with chatpata vibrancy.",
    bullets: [
      "Signature amchur-black salt formulation calibrated for cheese and toasties",
      "Zero added MSG, pure sun-dried spices and fresh botanical undertones",
      "Transforms everyday grilled toast, french fries, and chaats into culinary nostalgia",
    ],
    productName: "Sandwich Masala",
    productSlug: "sandwich-masala",
    editorialImage: "/images/products/sandwich-masala/editorial-01.webp",
    imageAlt: "Flavouron Bombay Sandwich Masala Grilled Composition with Fresh Herbs",
    reversed: false,
  },
  {
    eyebrow: "Himalayan Roadside Legend",
    title: "Flavouron Himalayan Momos Masala",
    accentColor: "#1b4834",
    description:
      "From Darjeeling to Kathmandu, authentic roadside momos demand a specific herbaceous aroma and pungent garlic-ginger warmth. This blend infuses vegetable and paneer stuffings with savory depth while elevating homemade red chili dip into an irresistible accompaniment.",
    bullets: [
      "Complex herb and spice balance designed for delicate steamed wrappers",
      "Dual-use: ideal for both dumpling stuffings and fiery garlic dipping chutney",
      "Pure clean formulation with no artificial preservatives or filler starches",
    ],
    productName: "Momos Masala",
    productSlug: "momos-masala",
    editorialImage: "/images/products/momos-masala/editorial-01.webp",
    imageAlt: "Flavouron Momos Masala Bamboo Steamer Culinary Presentation",
    reversed: true,
  },
];

export function SignatureMasalaStory() {
  return (
    <section className="py-20 sm:py-28 md:py-36 bg-white overflow-hidden border-b border-stone-200/80">
      <Container size="default">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#B44C2D] font-medium block mb-3">
            Artisanal Culinary Chronicles
          </span>
          <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl text-stone-900 uppercase font-normal tracking-wide">
            The Stories Behind Our Blends
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-600 font-serif italic max-w-2xl mx-auto leading-relaxed">
            Every blend is formulated to bring restaurant-grade complexity and generational Indian culinary memories into your everyday kitchen.
          </p>
        </div>

        {/* Alternating Editorial Stories */}
        <div className="space-y-28 sm:space-y-36">
          {SIGNATURE_STORIES.map((story, idx) => {
            const isReversed = story.reversed;

            return (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Image Composition */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? "order-1 lg:order-2" : "order-2 lg:order-1"
                  }`}
                >
                  <div className="relative rounded-3xl bg-[#FAF8F5] border border-stone-200/80 p-4 sm:p-8 shadow-xs overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-900/5 via-transparent to-[#C5A059]/10 pointer-events-none" />
                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl transition-transform duration-700 ease-out group-hover:scale-102">
                      <Image
                        src={story.editorialImage}
                        alt={story.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Text Composition */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? "order-2 lg:order-1" : "order-1 lg:order-2"
                  } space-y-6`}
                >
                  <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.22em] font-sans font-medium text-[#143627]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{story.eyebrow}</span>
                  </div>

                  <h3 className="font-editorial-heading text-2xl sm:text-4xl text-stone-900 uppercase font-normal leading-tight">
                    {story.title}
                  </h3>

                  <p className="font-serif text-stone-600 text-sm sm:text-base leading-relaxed">
                    {story.description}
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm text-stone-700 font-sans">
                    {story.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#143627] shrink-0 mt-0.5" />
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3">
                    <Link
                      href={`/products/${story.productSlug}`}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#143627] text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#1b4834] transition-all shadow-sm group/btn"
                    >
                      <span>Shop {story.productName}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
