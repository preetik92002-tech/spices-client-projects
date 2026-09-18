export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
  };
  featuredImage: string;
  tags: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "journal-1",
    slug: "science-of-cold-milling-spices",
    title: "The Physics of Fragrance: Why High-Speed Grinding Destroys Spice Aromas",
    excerpt: "When whole spices hit standard industrial hammer mills at 12,000 RPM, temperatures surge past 85°C. Here is how slow cryo-milling preserves volatile terpenes and essential oils.",
    category: "Craft & Science",
    readingTime: "5 min read",
    publishedAt: "September 12, 2026",
    author: {
      name: "Dr. Alok Verma",
      role: "Chief Food Scientist, Shivooham Exports",
    },
    featuredImage: "/images/products/paneer-lababdar-black.jpeg",
    tags: ["Cold Milling", "Spice Chemistry", "Volatile Oils"],
    content: `
When you open a pouch of freshly milled Indian spice, the sensory wave that greets you is composed of hundreds of delicate volatile organic compounds: cineole in cardamom, cuminaldehyde in cumin, eugenol in cloves, and piperine in black pepper.

Most conventional industrial spice processing units employ high-speed hammer mills spinning at up to 12,000 revolutions per minute. The severe friction generated in these chambers routinely spikes internal temperatures past 85°C to 95°C. At these temperatures, over 40% of the natural aromatic terpenes flash off into the factory exhaust before the spice ever reaches the pouch.

At the Shivooham Exports facility in Bilhaur, we engineered a multi-stage cold-process milling line. By cooling the grinding chambers and running our stone and pin mills at slow, deliberate torque, the temperature of the spice grist never exceeds 38°C. 

The result? The volatile oil yield remains near 98% of the intact whole seed. When that powder hits hot ghee in your kadai, it blooms with an intensity you simply cannot replicate with supermarket commodity spices.
    `,
  },
  {
    id: "journal-2",
    slug: "anatomy-of-a-bombay-sandwich",
    title: "Anatomy of a Street Masterpiece: The Architecture of the Bombay Sandwich",
    excerpt: "From butter sealing the bread against mint chutney to the exact pinch of sour-spicy masala, dissecting the street-side culinary engineering behind Mumbai's greatest sandwich.",
    category: "Street Culture",
    readingTime: "4 min read",
    publishedAt: "August 28, 2026",
    author: {
      name: "Rhea Merchant",
      role: "Culinary Historian",
    },
    featuredImage: "/images/products/sandwich-masala-white.jpeg",
    tags: ["Street Food", "Mumbai", "Sandwich Masala"],
    content: `
To the untrained observer, a Bombay sandwich looks delightfully chaotic. But talk to any veteran sandwich vendor outside Churchgate station or in Matunga, and you realize you are witnessing a masterclass in culinary physics.

The first line of defense is the cold butter barrier. Applied liberally to every corner of white sandwich bread, it prevents the water content of spicy green coriander-mint chutney from turning the bread soggy. Next comes the geometric layering: thinly sliced boiled potatoes to absorb moisture, crisp cucumbers for temperature contrast, juicy tomatoes, and earthy boiled beetroot.

And then comes the soul: the sprinkle. 

A generic garam masala will ruin a sandwich with overwhelming clove and black pepper heat. A true Bombay Sandwich Masala must lead with sun-dried raw mango powder (amchur), black salt (kala namak) for savory sulfur umami, roasted cumin for smokiness, and a touch of dried pomegranate seed. It sharpens every bite without overpowering the freshness of the vegetables.
    `,
  },
  {
    id: "journal-3",
    slug: "royal-dum-biryani-awadh-tradition",
    title: "The Lost Dum of Awadh: How Sealed Clay Pots Capture Fragrant Steam",
    excerpt: "Tracing the centuries-old technique of 'dum pukht' — where spices, ghee, and parboiled rice mature together in their own aromatic juices under a flour dough seal.",
    category: "Heritage Recipes",
    readingTime: "6 min read",
    publishedAt: "August 15, 2026",
    author: {
      name: "Chef Bilal Qureshi",
      role: "Awadhi Cuisine Specialist",
    },
    featuredImage: "/images/products/veg-biryani.jpeg",
    tags: ["Biryani", "Awadh", "Dum Pukht", "Heritage"],
    content: `
The Persian phrase 'dum pukht' translates literally to 'air-cooked' or 'breathed cooking'. Developed during the reign of Nawab Asaf-ud-Daula in Lucknow, the technique was born out of charity during the great famine of 1784, when massive handis of rice, meat, and seasonal vegetables were sealed with dough to feed thousands with minimal fuel.

What the royal bawarchis discovered was breathtaking: when steam cannot escape, it condenses back into the pot, continually basting the rice grains with the essential oils of star anise, black cardamom, and whole cloves.

In our Flavouron Veg Biryani Masala, we cracked whole spices rather than pulverizing them into dust. This ensures that during the slow 30-minute dum on gentle embers, each botanical releases its perfume at its natural evaporation point, creating strata of flavor that unfold with every spoonful.
    `,
  },
];
