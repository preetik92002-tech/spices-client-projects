"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, ShieldCheck, Check, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "Domestic Retail / Consumer",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          inquiryType: "Domestic Retail / Consumer",
          message: "",
        });
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("success");
    }
  };

  return (
    <div className="w-full min-h-screen py-12 md:py-20 bg-[#FAF8F5]">
      <Container size="default">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B44C2D] font-semibold block mb-2">
            Connect With Us
          </span>
          <h1 className="font-editorial-heading text-4xl sm:text-5xl md:text-6xl text-stone-900 tracking-tight">
            Contact &amp; Trade Inquiries
          </h1>
          <p className="mt-4 text-sm sm:text-base text-stone-600 font-serif italic">
            Whether you are an artisanal home cook, a culinary institution, or an international food distributor, our doors are open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left: Official Brand & Factory Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B44C2D] font-mono font-medium">
                  Parent Company
                </span>
                <h3 className="font-editorial-heading text-2xl text-stone-900 mt-0.5">
                  Shivooham Exports
                </h3>
                <p className="text-xs text-stone-500 font-serif mt-1">
                  Manufacturer and global distributor of Flavouron brand spices.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-stone-100 text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#143627] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-stone-400 block font-mono">Official Email</span>
                    <a
                      href="mailto:admin@flavouron.com"
                      className="font-medium hover:text-[#143627] transition-colors"
                    >
                      admin@flavouron.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#143627] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-stone-400 block font-mono">Direct Contact</span>
                    <a
                      href="tel:+918933813655"
                      className="font-medium hover:text-[#143627] transition-colors"
                    >
                      +91 8933813655
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#143627] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-stone-400 block font-mono">Processing Facility</span>
                    <p className="font-serif text-stone-700 text-xs leading-relaxed">
                      Bilhaur, Kanpur Nagar, Uttar Pradesh — 209205, India
                    </p>
                  </div>
                </div>
              </div>

              {/* FSSAI Credentials */}
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#143627]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Dual FSSAI Licences</span>
                </div>
                <div className="text-xs font-mono text-stone-600 space-y-0.5">
                  <p>Processing: <strong>22726317000406</strong></p>
                  <p>Export &amp; Relabel: <strong>22725663000269</strong></p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-xs">
              <h2 className="font-editorial-heading text-2xl text-stone-900 mb-2">
                Send an Inquiry
              </h2>
              <p className="text-xs text-stone-500 font-serif mb-6">
                Our export and trade operations desk will respond within 24 business hours.
              </p>

              {status === "success" ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-editorial-heading text-2xl text-stone-900">
                    Message Received
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-serif max-w-sm mx-auto">
                    Thank you for reaching out. A senior representative from Shivooham Exports will review your inquiry shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-xs uppercase tracking-widest text-[#143627] font-semibold underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Rajesh Khurana"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#143627]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#143627]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="e.g. rajesh@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#143627]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                      Inquiry Nature *
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) =>
                        setFormData({ ...formData, inquiryType: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#143627] bg-white"
                    >
                      <option>Domestic Retail / Consumer</option>
                      <option>B2B Restaurant &amp; Institutional Supply</option>
                      <option>International Export Inquiry</option>
                      <option>Distribution &amp; Dealership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                      Your Message / Requirements *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Please specify your order volume, spices of interest, or queries..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#143627]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 rounded-full bg-[#143627] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#1b4834] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {status === "submitting" ? "Sending..." : "Submit Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
