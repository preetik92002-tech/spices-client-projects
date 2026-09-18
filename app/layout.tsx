import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartDrawer } from "@/components/cart/CartDrawer";

export const viewport: Viewport = {
  themeColor: "#143627",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://flavouron.com"
  ),
  title: "FLAVOURON | Ultra Premium Indian Spices & Artisanal Masalas",
  description:
    "Handcrafted, slow-curated authentic Indian spices, masalas, and seasonings by Shivooham Exports. Taste that brings everyone together.",
  keywords: [
    "Flavouron",
    "premium Indian spices",
    "Paneer Lababdar Masala",
    "artisanal spices",
    "Shivooham Exports",
    "authentic masala",
    "gourmet seasonings",
  ],
  openGraph: {
    title: "FLAVOURON | Ultra Premium Indian Spices",
    description:
      "Handcrafted, slow-curated authentic Indian spices and masalas by Shivooham Exports.",
    type: "website",
    locale: "en_IN",
    siteName: "FLAVOURON",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://flavouron.com/#organization",
        name: "Shivooham Exports",
        alternateName: "FLAVOURON",
        url: "https://flavouron.com",
        logo: "https://flavouron.com/images/brand/flavouron-logo.jpeg",
        email: "admin@flavouron.com",
        telephone: "+91 8933813655",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Bilhaur",
          addressLocality: "Kanpur Nagar",
          addressRegion: "Uttar Pradesh",
          postalCode: "209205",
          addressCountry: "IN",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://flavouron.com/#website",
        url: "https://flavouron.com",
        name: "FLAVOURON",
        description: "Ultra Premium Artisanal Indian Spices & Slow-Roasted Masalas",
        publisher: {
          "@id": "https://flavouron.com/#organization",
        },
      },
    ],
  };

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--terracotta)] selection:text-white">
        <WishlistProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
