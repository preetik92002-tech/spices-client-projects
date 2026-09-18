import { CategoryInfo } from "@/types/product";

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "curry-masalas",
    name: "Curry Masalas",
    slug: "curry-masalas",
    tagline: "Authentic Slow-Roasted Gravy Blends",
    description:
      "Signature regional curry powders and heritage masala blends perfected with royal North Indian and coastal recipes.",
    image: "/images/products/paneer-lababdar/main.webp",
    featuredCount: 6,
  },
  {
    id: "tandoori-grill",
    name: "Tandoori & Grill",
    slug: "tandoori-grill",
    tagline: "Smoky, Fiery Charred Perfection",
    description:
      "Clay oven and BBQ style spice rubs made with degi chili, roasted cumin, and black cardamom.",
    image: "/images/products/tandoori-masala/main.webp",
    featuredCount: 3,
  },
  {
    id: "gourmet-seasonings",
    name: "Gourmet Seasonings",
    slug: "gourmet-seasonings",
    tagline: "Global Flavours with Indian Soul",
    description:
      "Handcrafted herbs and artisanal spice seasonings for artisan pizzas, woodfired breads, and pasta.",
    image: "/images/products/pizza-seasoning/main.webp",
    featuredCount: 3,
  },
  {
    id: "quick-bites",
    name: "Quick Bites & Street",
    slug: "quick-bites",
    tagline: "Desi Street Food Magic at Home",
    description:
      "Chatpata taste enhancers for sandwiches, roadside momos, hakka noodles, and wok tossed rice.",
    image: "/images/products/sandwich-masala/main.webp",
    featuredCount: 4,
  },
  {
    id: "speciality-blends",
    name: "Speciality Blends",
    slug: "speciality-blends",
    tagline: "Fiery Regional Masterpieces",
    description:
      "Deep regional delicacies like Kolhapuri Tadka and Peri Peri Paneer Tikka for passionate culinary explorers.",
    image: "/images/products/kolhapuri-tadka/main.webp",
    featuredCount: 2,
  },
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
