"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Plus, Trash2, CheckCircle2, Image as ImageIcon } from "lucide-react";

export default function AdminNewProductPage() {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    hindiName: "",
    subtitle: "",
    category: "curry-masalas",
    price: "",
    comparePrice: "",
    sku: "",
    weight: "100 g",
    shortDescription: "",
    description: "",
    ingredients: "",
    fssaiLicense: "22726317000406",
    mainImage: "/images/products/paneer-lababdar/main.webp",
    galleryImages: ["/images/products/paneer-lababdar/gallery-01.webp"],
    editorialImages: ["/images/products/paneer-lababdar/editorial-01.webp"],
    featured: true,
  });

  const [variants, setVariants] = useState([
    { weight: "100 g", price: "388", comparePrice: "450", stock: "100", sku: "FLV-NEW-100" },
    { weight: "250 g", price: "899", comparePrice: "999", stock: "50", sku: "FLV-NEW-250" },
  ]);

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      { weight: "500 g", price: "1699", comparePrice: "1899", stock: "25", sku: `FLV-NEW-${variants.length + 1}` },
    ]);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-editorial-heading text-2xl text-stone-900">
              New Spice Formulation
            </h1>
            <p className="text-xs text-stone-500 font-serif">
              Publish an authentic blend into the Flavouron digital catalog.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b4834] transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Formulation
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Product formulation saved successfully to catalog registry!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Basic Identity */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
          <h2 className="font-editorial-heading text-lg text-stone-900 border-b border-stone-100 pb-3">
            Product Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                English Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Royal Shahi Garam Masala"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Devanagari / Hindi Name
              </label>
              <input
                type="text"
                placeholder="e.g. शाही गरम मसाला"
                value={formData.hindiName}
                onChange={(e) => setFormData({ ...formData, hindiName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white text-stone-700 focus:outline-none focus:border-[#143627]"
              >
                <option value="curry-masalas">Curry Masalas</option>
                <option value="tandoori-grill">Tandoori &amp; Grill</option>
                <option value="gourmet-seasonings">Gourmet Seasonings</option>
                <option value="quick-bites">Quick Bites</option>
                <option value="speciality-blends">Speciality Blends</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Base SKU Prefix
              </label>
              <input
                type="text"
                placeholder="e.g. FLV-SGM"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono focus:outline-none focus:border-[#143627]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
              Short Editorial Tagline
            </label>
            <input
              type="text"
              placeholder="e.g. Slow-roasted botanical bouquet for celebration curries"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
              Detailed Culinary Story
            </label>
            <textarea
              rows={3}
              placeholder="Describe the aroma profile, regional heritage, and preparation ritual..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
            />
          </div>
        </div>

        {/* Section 2: Multi-weight Variants */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h2 className="font-editorial-heading text-lg text-stone-900">
                Packaging Variants &amp; Pricing
              </h2>
              <p className="text-xs text-stone-500 font-serif">
                Configure weight options, prices in INR, and inventory levels.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddVariant}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium"
            >
              <Plus className="w-3.5 h-3.5" /> Add Variant
            </button>
          </div>

          <div className="space-y-3">
            {variants.map((v, idx) => (
              <div
                key={idx}
                className="grid grid-cols-2 sm:grid-cols-6 gap-3 p-3.5 rounded-xl bg-stone-50/70 border border-stone-200 items-end"
              >
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                    Weight
                  </label>
                  <input
                    type="text"
                    value={v.weight}
                    onChange={(e) => {
                      const copy = [...variants];
                      copy[idx].weight = e.target.value;
                      setVariants(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                    Selling Price (₹)
                  </label>
                  <input
                    type="number"
                    value={v.price}
                    onChange={(e) => {
                      const copy = [...variants];
                      copy[idx].price = e.target.value;
                      setVariants(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                    Compare MRP (₹)
                  </label>
                  <input
                    type="number"
                    value={v.comparePrice}
                    onChange={(e) => {
                      const copy = [...variants];
                      copy[idx].comparePrice = e.target.value;
                      setVariants(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={v.stock}
                    onChange={(e) => {
                      const copy = [...variants];
                      copy[idx].stock = e.target.value;
                      setVariants(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={v.sku}
                    onChange={(e) => {
                      const copy = [...variants];
                      copy[idx].sku = e.target.value;
                      setVariants(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs bg-white font-mono"
                  />
                </div>

                <div className="flex justify-end pb-1">
                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(idx)}
                    disabled={variants.length === 1}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 disabled:opacity-30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Ingredients & Compliance */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
          <h2 className="font-editorial-heading text-lg text-stone-900 border-b border-stone-100 pb-3">
            Ingredients &amp; Verification
          </h2>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
              Full Botanical Ingredients (Comma separated)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Coriander, Cumin, Green Cardamom, Star Anise, Mace, Black Pepper, Cloves, Dried Ginger"
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                FSSAI License Assigned
              </label>
              <input
                type="text"
                value={formData.fssaiLicense}
                onChange={(e) => setFormData({ ...formData, fssaiLicense: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono bg-stone-50"
              />
            </div>

          </div>
        </div>

        {/* Section 4: Product Media & Visual Assets */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h2 className="font-editorial-heading text-lg text-stone-900">
                Visual Assets &amp; Product Photography
              </h2>
              <p className="text-xs text-stone-500 font-sans mt-0.5">
                Manage high-resolution packaging, nutritional panels, and editorial campaign photography.
              </p>
            </div>
            <Link
              href="/admin/media"
              target="_blank"
              className="text-xs font-medium text-[#143627] hover:underline"
            >
              Browse Media Library →
            </Link>
          </div>

          {/* Main Product Image */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium">
              Main Packaging Image Path (Front Pouch / Bottle)
            </label>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl bg-[#FAF8F5] border border-stone-200 p-1 shrink-0 overflow-hidden">
                <Image
                  src={formData.mainImage}
                  alt="Main image preview"
                  fill
                  className="object-contain"
                />
              </div>
              <input
                type="text"
                value={formData.mainImage}
                onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                className="flex-1 px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono"
                placeholder="/images/products/slug/main.webp"
              />
            </div>
          </div>

          {/* Gallery Images */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium">
                Gallery Images (Back Scans &amp; Variants)
              </label>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    galleryImages: [...formData.galleryImages, ""],
                  })
                }
                className="inline-flex items-center gap-1 text-xs text-[#143627] font-semibold hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Gallery Image
              </button>
            </div>

            <div className="space-y-2">
              {formData.galleryImages.map((img, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg bg-[#FAF8F5] border border-stone-200 p-1 shrink-0 overflow-hidden">
                    {img ? (
                      <Image
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-stone-300 m-auto" />
                    )}
                  </div>
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => {
                      const updated = [...formData.galleryImages];
                      updated[idx] = e.target.value;
                      setFormData({ ...formData, galleryImages: updated });
                    }}
                    placeholder="/images/products/slug/gallery-01.webp"
                    className="flex-1 px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.galleryImages.filter((_, i) => i !== idx);
                      setFormData({ ...formData, galleryImages: updated });
                    }}
                    className="p-2 text-stone-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Images */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium">
                Editorial &amp; Lifestyle Photography
              </label>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    editorialImages: [...formData.editorialImages, ""],
                  })
                }
                className="inline-flex items-center gap-1 text-xs text-[#143627] font-semibold hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Editorial Image
              </button>
            </div>

            <div className="space-y-2">
              {formData.editorialImages.map((img, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg bg-[#FAF8F5] border border-stone-200 p-1 shrink-0 overflow-hidden">
                    {img ? (
                      <Image
                        src={img}
                        alt={`Editorial ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-stone-300 m-auto" />
                    )}
                  </div>
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => {
                      const updated = [...formData.editorialImages];
                      updated[idx] = e.target.value;
                      setFormData({ ...formData, editorialImages: updated });
                    }}
                    placeholder="/images/products/slug/editorial-01.webp"
                    className="flex-1 px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.editorialImages.filter((_, i) => i !== idx);
                      setFormData({ ...formData, editorialImages: updated });
                    }}
                    className="p-2 text-stone-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link
            href="/admin/products"
            className="px-6 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs uppercase tracking-wider font-medium hover:bg-stone-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-8 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b4834] transition-colors"
          >
            Save &amp; Publish
          </button>
        </div>
      </form>
    </div>
  );
}
