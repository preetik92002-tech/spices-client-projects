"use client";

import React, { useState } from "react";
import { Save, CheckCircle2, ShieldCheck, Lock } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    companyName: "Shivooham Exports",
    brandName: "Flavouron",
    officialEmail: "admin@flavouron.com",
    phone: "+91 8933813655",
    factoryAddress: "Bilhaur, Kanpur Nagar, Uttar Pradesh — 209205",
    fssaiLicense1: "22726317000406",
    fssaiLicense2: "22725663000269",
    razorpayKeyId: "rzp_test_flavouron_demo",
    razorpayKeySecret: "••••••••••••••••••••••••",
    freeShippingThreshold: "499",
    standardShippingFee: "60",
    currency: "INR",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial-heading text-2xl sm:text-3xl text-stone-900">
            Store &amp; Payment Settings
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-serif mt-0.5">
            Configure legal entity details, FSSAI licenses, payment gateway, and shipping thresholds.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b4834] transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Store settings and payment configuration saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Business Identity */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
          <h2 className="font-editorial-heading text-lg text-stone-900 border-b border-stone-100 pb-3">
            Company &amp; Legal Entity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Parent Company
              </label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Consumer Brand
              </label>
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={settings.officialEmail}
                onChange={(e) => setSettings({ ...settings, officialEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Phone
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
              Registered Facility Address
            </label>
            <input
              type="text"
              value={settings.factoryAddress}
              onChange={(e) => setSettings({ ...settings, factoryAddress: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
            />
          </div>
        </div>

        {/* FSSAI Credentials */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-[#143627]" />
            <h2 className="font-editorial-heading text-lg text-stone-900">
              FSSAI Food Safety Licences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Primary Processing Licence
              </label>
              <input
                type="text"
                value={settings.fssaiLicense1}
                onChange={(e) => setSettings({ ...settings, fssaiLicense1: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono focus:outline-none focus:border-[#143627]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Export &amp; Relabelling Licence
              </label>
              <input
                type="text"
                value={settings.fssaiLicense2}
                onChange={(e) => setSettings({ ...settings, fssaiLicense2: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono focus:outline-none focus:border-[#143627]"
              />
            </div>
          </div>
        </div>

        {/* Razorpay Gateway */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Lock className="w-5 h-5 text-[#143627]" />
            <h2 className="font-editorial-heading text-lg text-stone-900">
              Razorpay Payment Gateway Credentials
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Razorpay Key ID
              </label>
              <input
                type="text"
                value={settings.razorpayKeyId}
                onChange={(e) => setSettings({ ...settings, razorpayKeyId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono focus:outline-none focus:border-[#143627]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Razorpay Key Secret (Server-only)
              </label>
              <input
                type="password"
                value={settings.razorpayKeySecret}
                onChange={(e) => setSettings({ ...settings, razorpayKeySecret: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono focus:outline-none focus:border-[#143627]"
              />
            </div>
          </div>
        </div>

        {/* Shipping Thresholds */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
          <h2 className="font-editorial-heading text-lg text-stone-900 border-b border-stone-100 pb-3">
            Shipping Rules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Free Shipping Minimum Threshold (₹)
              </label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono focus:outline-none focus:border-[#143627]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1">
                Standard Shipping Fee (₹)
              </label>
              <input
                type="number"
                value={settings.standardShippingFee}
                onChange={(e) => setSettings({ ...settings, standardShippingFee: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono focus:outline-none focus:border-[#143627]"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
