import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";

const RECIPES = [
  {
    title: "Handi Dum Biryani with Fragrant Basmati",
    category: "Festive Banquet",
    time: "45 mins",
    masala: "Flavouron Veg Biryani Masala",
    productSlug: "veg-biryani-masala",
    image: "/images/products/veg-biryani.jpeg",
    excerpt: "Layered with caramelised onions, mint leaves, and saffron milk, slow-cooked in a sealed clay pot.",
    colSpan: "md:col-span-8",
  },
  {
    title: "Silky Paneer Lababdar Cashew Gravy",
    category: "North Indian Classic",
    time: "25 mins",
    masala: "Paneer Lababdar Masala",
    productSlug: "paneer-lababdar-masala",
    image: "/images/products/paneer-lababdar-black.jpeg",
    excerpt: "A velvety tomato-cashew reduction finished with fresh cream, kasuri methi, and slow-roasted mace.",
    colSpan: "md:col-span-4",
  },
  {
    title: "Crispy Bombay Grilled Sandwich",
    category: "Street Food Magic",
    time: "15 mins",
    masala: "Flavouron Sandwich Masala",
    productSlug: "sandwich-masala",
    image: "/images/products/sandwich-masala-white.jpeg",
    excerpt: "Triple-decker layered with mint chutney, boiled potatoes, beetroots, and butter-toasted golden crisp.",
    colSpan: "md:col-span-4",
  },
  {
    title: "Wok-Tossed Tangy Momos with Garlic Butter",
    category: "Indo-Tibetan Quick Bites",
    time: "20 mins",
    masala: "Flavouron Momos Masala",
    productSlug: "momos-masala",
    image: "/images/products/momos-masala-green.jpeg",
    excerpt: "Crispy pan-fried dumplings tossed in chili garlic butter and dusted with tart amchur-cured momos seasoning.",
    colSpan: "md:col-span-4",
  },
  {
    title: "Stone-Baked Pizza with Herb Infusion",
    category: "Continental Gourmet",
    time: "15 mins",
    masala: "Flavouron Pizza Seasoning",
    productSlug: "pizza-seasoning",
    image: "/images/products/pizza-seasoning.jpeg",
    excerpt: "Sun-dried Mediterranean oregano, cracked chili flakes, and toasted garlic flakes over molten mozzarella.",
    colSpan: "md:col-span-4",
  },
];

export function RecipeMagazineSection() {
  return (
    <section className="py-20 sm:py-28 md:py-36 bg-white border-b border-[var(--border)]/60">
      <Container size="default">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B44C2D] font-semibold block mb-3">
              Culinary Canvas
            </span>
            <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-tight">
              Recipes &amp; Everyday Use Cases
            </h2>
          </div>
          <p className="max-w-md text-stone-600 font-serif text-sm italic">
            From quick midnight street cravings to elaborate festive dinners, discover dishes transformed by Flavouron blends.
          </p>
        </div>

        {/* Asymmetric Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {RECIPES.map((recipe, idx) => (
            <div
              key={idx}
              className={`${recipe.colSpan} group rounded-3xl bg-[#FAF8F5] border border-stone-200/80 p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all duration-300`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
                  <span className="uppercase tracking-widest font-mono text-[10px] text-[#143627] font-semibold">
                    {recipe.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {recipe.time}
                  </span>
                </div>

                <h3 className="font-editorial-heading text-xl sm:text-2xl text-stone-900 group-hover:text-[#143627] transition-colors leading-snug">
                  {recipe.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-stone-600 font-serif leading-relaxed line-clamp-2">
                  {recipe.excerpt}
                </p>
              </div>

              {/* Product Pack Thumbnail & Direct Link */}
              <div className="mt-6 pt-5 border-t border-stone-200/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 bg-white rounded-lg p-1 border border-stone-100 shrink-0">
                    <Image
                      src={recipe.image}
                      alt={recipe.masala}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 block">
                      Powered by
                    </span>
                    <span className="font-serif text-xs font-semibold text-stone-800">
                      {recipe.masala}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/products/${recipe.productSlug}`}
                  className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-[#143627] hover:text-[#B44C2D] transition-colors group-hover:translate-x-1"
                >
                  Shop Blend <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
