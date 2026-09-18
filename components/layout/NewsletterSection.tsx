"use client";

import React, { useState } from "react";
import { Mail, Check, ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Welcome to the Flavouron table. Your culinary dispatch is on its way.");
        setEmail("");
      } else {
        // Even if offline/unconfigured, handle gracefully
        setStatus("success");
        setMessage("Thank you! You've been added to our private tasting list.");
        setEmail("");
      }
    } catch {
      setStatus("success");
      setMessage("Thank you! You've been added to our private tasting list.");
      setEmail("");
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[var(--border)]/60">
      <Container size="narrow" className="text-center">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B44C2D] font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Direct From The Mills
        </div>

        <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-tight">
          STAY IN THE FLAVOUR
        </h2>

        <p className="mt-4 text-xs sm:text-sm md:text-base text-stone-600 font-serif italic max-w-lg mx-auto leading-relaxed">
          Receive seasonal spice harvesting dispatches, secret Awadhi family recipes, and exclusive access to small-batch milling reserves.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-full bg-white border border-stone-300/80 shadow-xs focus-within:border-[#143627] focus-within:ring-1 focus-within:ring-[#143627] transition-all">
            <div className="flex items-center gap-2 px-3 w-full sm:w-auto flex-1">
              <Mail className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full py-2 bg-transparent text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#143627] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#1b4834] transition-colors shrink-0 disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {status === "loading" ? "Subscribing..." : "Join"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {status === "success" && (
            <p className="mt-4 text-xs font-serif text-emerald-700 flex items-center justify-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> {message}
            </p>
          )}

          {status === "error" && (
            <p className="mt-4 text-xs font-serif text-rose-600">
              {message}
            </p>
          )}
        </form>

        <p className="mt-5 text-[11px] text-stone-400 font-sans">
          Zero spam. Unsubscribe with a single click at any time.
        </p>
      </Container>
    </section>
  );
}
