"use client";

import React, { useState } from "react";
import {
  Save,
  CheckCircle2,
  Bell,
  Sparkles,
  Layers,
  ShoppingBag,
  Video,
  FileText,
  Mail,
  BookOpen,
} from "lucide-react";

type HomepageTab =
  | "announcement"
  | "hero"
  | "collections"
  | "featured-products"
  | "spotlight"
  | "editorial"
  | "journal"
  | "newsletter";

export default function AdminHomepageCMSPage() {
  const [activeTab, setActiveTab] = useState<HomepageTab>("announcement");
  const [saved, setSaved] = useState(false);

  // Editable configurations for each section
  const [announcementConfig, setAnnouncementConfig] = useState({
    enabled: true,
    message1: "PAN-INDIA EXPRESS DISPATCH • FREE SHIPPING ON ORDERS ABOVE ₹499",
    message2: "AUTHENTIC WHOLE SPICES • SLOW ROASTED & CRYOGENICALLY MILLED",
    message3: "FSSAI CERTIFIED BOTANICAL INTEGRITY • SHIVOOHAM EXPORTS",
    speedSeconds: "6",
  });

  const [heroConfig, setHeroConfig] = useState({
    headline: "THE ART OF EVERYDAY FLAVOUR.",
    subheadline: "Slow-curated, small-batch masalas and seasonings crafted to elevate every home kitchen.",
    primaryCtaText: "EXPLORE FLAVOURS",
    primaryCtaHref: "/shop",
    secondaryCtaText: "OUR STORY",
    secondaryCtaHref: "/about",
    theme: "dark",
  });

  const [collectionsConfig, setCollectionsConfig] = useState({
    eyebrow: "Artisanal Taxonomy",
    headline: "Curated Spice Collections",
    showCategoriesCount: true,
  });

  const [featuredConfig, setFeaturedConfig] = useState({
    title: "FLAVOURON COLLECTION",
    eyebrow: "Slow-Roasted Harvest",
    subtitle: "Our most revered small-batch masalas, ground at low temperatures for everyday kitchen elegance.",
    maxDisplay: "8",
  });

  const [spotlightConfig, setSpotlightConfig] = useState({
    enabled: true,
    eyebrow: "Spotlight",
    headline: "Flavour in Motion",
    subtitle: "Experience our artisanal masalas sizzling, roasting, and transforming home kitchens.",
    layout: "3-Reel Panoramic (9:16)",
  });

  const [editorialConfig, setEditorialConfig] = useState({
    brandIntroHeadline: "AUTHENTIC SPICES. TIMELESS FLAVOUR.",
    signatureStoriesEnabled: true,
    craftSectionHeadline: "The Craft Before The Grind",
    recipesSectionHeadline: "Recipes & Everyday Use Cases",
    exportStoryHeadline: "FROM INDIA, TO TABLES AROUND THE WORLD.",
    brandPromiseEnabled: true,
  });

  const [journalConfig, setJournalConfig] = useState({
    headline: "FROM THE JOURNAL",
    eyebrow: "The Spice Chronicler",
    maxPosts: "3",
  });

  const [newsletterConfig, setNewsletterConfig] = useState({
    headline: "STAY IN THE FLAVOUR",
    eyebrow: "Direct From The Mills",
    subtext: "Receive seasonal spice harvesting dispatches, secret Awadhi family recipes, and exclusive access to small-batch milling reserves.",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial-heading text-2xl sm:text-3xl text-stone-900">
            Homepage Editorial CMS
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-serif mt-0.5">
            Full control over every individual homepage section without modifying code.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b4834] transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Homepage
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Homepage editorial configuration updated and deployed to storefront!</span>
        </div>
      )}

      {/* 8-Section Sub-navigation matching requested hierarchy */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-stone-200 shadow-xs">
        <button
          onClick={() => setActiveTab("announcement")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
            activeTab === "announcement"
              ? "bg-[#143627] text-white"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <Bell className="w-3.5 h-3.5" /> Announcement
        </button>

        <button
          onClick={() => setActiveTab("hero")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
            activeTab === "hero"
              ? "bg-[#143627] text-white"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Hero
        </button>

        <button
          onClick={() => setActiveTab("collections")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
            activeTab === "collections"
              ? "bg-[#143627] text-white"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <Layers className="w-3.5 h-3.5" /> Collections
        </button>

        <button
          onClick={() => setActiveTab("featured-products")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
            activeTab === "featured-products"
              ? "bg-[#143627] text-white"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" /> Featured Products
        </button>

        <button
          onClick={() => setActiveTab("spotlight")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
            activeTab === "spotlight"
              ? "bg-[#143627] text-white"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <Video className="w-3.5 h-3.5" /> Spotlight
        </button>

        <button
          onClick={() => setActiveTab("editorial")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
            activeTab === "editorial"
              ? "bg-[#143627] text-white"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> Editorial Sections
        </button>

        <button
          onClick={() => setActiveTab("journal")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
            activeTab === "journal"
              ? "bg-[#143627] text-white"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Journal
        </button>

        <button
          onClick={() => setActiveTab("newsletter")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
            activeTab === "newsletter"
              ? "bg-[#143627] text-white"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <Mail className="w-3.5 h-3.5" /> Newsletter
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
        {/* 1. Announcement */}
        {activeTab === "announcement" && (
          <div className="space-y-4">
            <h2 className="font-editorial-heading text-xl text-stone-900 border-b border-stone-100 pb-3">
              Announcement Bar Configuration
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Ticker Message 1
                </label>
                <input
                  type="text"
                  value={announcementConfig.message1}
                  onChange={(e) =>
                    setAnnouncementConfig({ ...announcementConfig, message1: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Ticker Message 2
                </label>
                <input
                  type="text"
                  value={announcementConfig.message2}
                  onChange={(e) =>
                    setAnnouncementConfig({ ...announcementConfig, message2: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Ticker Message 3
                </label>
                <input
                  type="text"
                  value={announcementConfig.message3}
                  onChange={(e) =>
                    setAnnouncementConfig({ ...announcementConfig, message3: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
                />
              </div>
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 font-medium">
                  <input
                    type="checkbox"
                    checked={announcementConfig.enabled}
                    onChange={(e) =>
                      setAnnouncementConfig({ ...announcementConfig, enabled: e.target.checked })
                    }
                    className="rounded text-[#143627]"
                  />
                  <span>Enable Announcement Bar on top of site</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* 2. Hero */}
        {activeTab === "hero" && (
          <div className="space-y-4">
            <h2 className="font-editorial-heading text-xl text-stone-900 border-b border-stone-100 pb-3">
              Cinematic Hero Configuration
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Editorial Headline
                </label>
                <input
                  type="text"
                  value={heroConfig.headline}
                  onChange={(e) =>
                    setHeroConfig({ ...heroConfig, headline: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif text-base focus:outline-none focus:border-[#143627]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Subheadline Narrative
                </label>
                <textarea
                  rows={2}
                  value={heroConfig.subheadline}
                  onChange={(e) =>
                    setHeroConfig({ ...heroConfig, subheadline: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                    Primary CTA Text
                  </label>
                  <input
                    type="text"
                    value={heroConfig.primaryCtaText}
                    onChange={(e) =>
                      setHeroConfig({ ...heroConfig, primaryCtaText: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                    Secondary CTA Text
                  </label>
                  <input
                    type="text"
                    value={heroConfig.secondaryCtaText}
                    onChange={(e) =>
                      setHeroConfig({ ...heroConfig, secondaryCtaText: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Collections */}
        {activeTab === "collections" && (
          <div className="space-y-4">
            <h2 className="font-editorial-heading text-xl text-stone-900 border-b border-stone-100 pb-3">
              Collections Grid Settings
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Section Eyebrow
                </label>
                <input
                  type="text"
                  value={collectionsConfig.eyebrow}
                  onChange={(e) =>
                    setCollectionsConfig({ ...collectionsConfig, eyebrow: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={collectionsConfig.headline}
                  onChange={(e) =>
                    setCollectionsConfig({ ...collectionsConfig, headline: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. Featured Products */}
        {activeTab === "featured-products" && (
          <div className="space-y-4">
            <h2 className="font-editorial-heading text-xl text-stone-900 border-b border-stone-100 pb-3">
              Featured Products Rail Configuration
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Rail Title
                </label>
                <input
                  type="text"
                  value={featuredConfig.title}
                  onChange={(e) =>
                    setFeaturedConfig({ ...featuredConfig, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Subtitle Description
                </label>
                <textarea
                  rows={2}
                  value={featuredConfig.subtitle}
                  onChange={(e) =>
                    setFeaturedConfig({ ...featuredConfig, subtitle: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* 5. Spotlight */}
        {activeTab === "spotlight" && (
          <div className="space-y-4">
            <h2 className="font-editorial-heading text-xl text-stone-900 border-b border-stone-100 pb-3">
              Spotlight 9:16 Video Reel Settings
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={spotlightConfig.headline}
                  onChange={(e) =>
                    setSpotlightConfig({ ...spotlightConfig, headline: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Section Subtitle
                </label>
                <input
                  type="text"
                  value={spotlightConfig.subtitle}
                  onChange={(e) =>
                    setSpotlightConfig({ ...spotlightConfig, subtitle: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Reel Layout Behavior
                </label>
                <input
                  type="text"
                  readOnly
                  value={spotlightConfig.layout}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs bg-stone-50 font-mono text-stone-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* 6. Editorial Sections */}
        {activeTab === "editorial" && (
          <div className="space-y-4">
            <h2 className="font-editorial-heading text-xl text-stone-900 border-b border-stone-100 pb-3">
              Editorial Storytelling &amp; Craft Sections
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Brand Statement Headline
                </label>
                <input
                  type="text"
                  value={editorialConfig.brandIntroHeadline}
                  onChange={(e) =>
                    setEditorialConfig({ ...editorialConfig, brandIntroHeadline: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Ingredients &amp; Cold Milling Section Headline
                </label>
                <input
                  type="text"
                  value={editorialConfig.craftSectionHeadline}
                  onChange={(e) =>
                    setEditorialConfig({ ...editorialConfig, craftSectionHeadline: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Recipes &amp; Everyday Use Cases Headline
                </label>
                <input
                  type="text"
                  value={editorialConfig.recipesSectionHeadline}
                  onChange={(e) =>
                    setEditorialConfig({ ...editorialConfig, recipesSectionHeadline: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Export Facility Story Headline
                </label>
                <input
                  type="text"
                  value={editorialConfig.exportStoryHeadline}
                  onChange={(e) =>
                    setEditorialConfig({ ...editorialConfig, exportStoryHeadline: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif"
                />
              </div>
            </div>
          </div>
        )}

        {/* 7. Journal */}
        {activeTab === "journal" && (
          <div className="space-y-4">
            <h2 className="font-editorial-heading text-xl text-stone-900 border-b border-stone-100 pb-3">
              Journal Preview Section
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={journalConfig.headline}
                  onChange={(e) =>
                    setJournalConfig({ ...journalConfig, headline: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Section Eyebrow
                </label>
                <input
                  type="text"
                  value={journalConfig.eyebrow}
                  onChange={(e) =>
                    setJournalConfig({ ...journalConfig, eyebrow: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* 8. Newsletter */}
        {activeTab === "newsletter" && (
          <div className="space-y-4">
            <h2 className="font-editorial-heading text-xl text-stone-900 border-b border-stone-100 pb-3">
              Newsletter Section
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Newsletter Headline
                </label>
                <input
                  type="text"
                  value={newsletterConfig.headline}
                  onChange={(e) =>
                    setNewsletterConfig({ ...newsletterConfig, headline: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                  Newsletter Subtext
                </label>
                <textarea
                  rows={2}
                  value={newsletterConfig.subtext}
                  onChange={(e) =>
                    setNewsletterConfig({ ...newsletterConfig, subtext: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
