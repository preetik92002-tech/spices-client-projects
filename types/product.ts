export type SpiceCategory =
  | "curry-masalas"
  | "tandoori-grill"
  | "gourmet-seasonings"
  | "quick-bites"
  | "speciality-blends";

export interface ProductNutrition {
  energy: string;
  protein: string;
  carbohydrate: string;
  totalFat: string;
  dietaryFibre: string;
  sodium: string;
}

export interface ProductVariant {
  id: string;
  weight: string;
  unit: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  active: boolean;
}

export interface ProductMedia {
  primary: string;
  secondary?: string;
  back?: string;
  ambient?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  hindiName?: string;
  subtitle: string;
  tagline: string;
  shortDescription: string;
  description: string;
  category: SpiceCategory;
  categoryLabel: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  brand: string;
  weight: string;
  unit: string;
  variants: ProductVariant[];
  stock: number;
  inStock: boolean;
  featured: boolean;
  published: boolean;
  mainImage: string;
  galleryImages: string[];
  editorialImages: string[];
  spiceLevel: 1 | 2 | 3 | 4 | 5;
  images: ProductMedia;
  ingredients: string[];
  usage: string[];
  storage: string;
  origin: string;
  features: string[];
  nutrition?: ProductNutrition;
  fssaiNumber: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryInfo {
  id: SpiceCategory;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  featuredCount: number;
}
