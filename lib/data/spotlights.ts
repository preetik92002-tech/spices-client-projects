export interface SpotlightItem {
  id: string;
  title: string;
  description: string;
  videoUrl?: string; // mp4 stream or high-res video
  posterUrl: string;
  thumbnailUrl: string;
  productId: string;
  productSlug: string;
  productName: string;
  productPrice: number;
  creatorName: string;
  published: boolean;
  sortOrder: number;
}

export const SPOTLIGHTS: SpotlightItem[] = [
  {
    id: "spotlight-paneer-lababdar",
    title: "Silky Paneer Lababdar in 20 Minutes",
    description: "Watch how a single spoonful of slow-roasted Flavouron Paneer Lababdar masala unlocks rich cashew velvet gravy.",
    posterUrl: "/images/products/paneer-lababdar/editorial-01.webp",
    thumbnailUrl: "/images/products/paneer-lababdar/editorial-01.webp",
    productId: "paneer-lababdar",
    productSlug: "paneer-lababdar-masala",
    productName: "Paneer Lababdar Masala",
    productPrice: 388,
    creatorName: "Chef Raghav • Spice Lab",
    published: true,
    sortOrder: 1,
  },
  {
    id: "spotlight-bombay-sandwich",
    title: "The Ultimate Bombay Street Sandwich",
    description: "Layered potatoes, mint chutney, and a liberal pinch of Flavouron Sandwich Masala for that iconic street-corner crunch.",
    posterUrl: "/images/products/sandwich-masala/editorial-01.webp",
    thumbnailUrl: "/images/products/sandwich-masala/editorial-01.webp",
    productId: "sandwich-masala",
    productSlug: "sandwich-masala",
    productName: "Sandwich Masala",
    productPrice: 280,
    creatorName: "Pooja's Rasoi",
    published: true,
    sortOrder: 2,
  },
  {
    id: "spotlight-veg-biryani",
    title: "Awadhi Dum Layering Technique",
    description: "The aromatic steam released when opening the flour-sealed handi seasoned with Flavouron Veg Biryani Masala.",
    posterUrl: "/images/products/veg-biryani-masala/editorial-01.webp",
    thumbnailUrl: "/images/products/veg-biryani-masala/editorial-01.webp",
    productId: "veg-biryani",
    productSlug: "veg-biryani-masala",
    productName: "Veg Biryani Masala",
    productPrice: 388,
    creatorName: "Master Chef Bilal",
    published: true,
    sortOrder: 3,
  },
  {
    id: "spotlight-kolhapuri-tadka",
    title: "Fiery Maharashtrian Kolhapuri Tempering",
    description: "Sizzling mustard seeds, curry leaves, and spicy Kolhapuri Tadka crackling in hot cold-pressed oil.",
    posterUrl: "/images/products/kolhapuri-tadka/main.webp",
    thumbnailUrl: "/images/products/kolhapuri-tadka/main.webp",
    productId: "kolhapuri-tadka",
    productSlug: "kolhapuri-tadka-masala",
    productName: "Kolhapuri Tadka Masala",
    productPrice: 388,
    creatorName: "Desi Flavours Studio",
    published: true,
    sortOrder: 4,
  },
  {
    id: "spotlight-momos-toss",
    title: "Crispy Fried Momos Wok Toss",
    description: "Wok-seared momos coated in garlic butter and dusted with Flavouron Tangy Momos Seasoning.",
    posterUrl: "/images/products/momos-masala/editorial-01.webp",
    thumbnailUrl: "/images/products/momos-masala/editorial-01.webp",
    productId: "momos-masala",
    productSlug: "momos-masala",
    productName: "Momos Masala",
    productPrice: 280,
    creatorName: "Street Food Diaries",
    published: true,
    sortOrder: 5,
  },
];
