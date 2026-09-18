"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Printer, ArrowRight, Truck, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "FLV-2026-1048";

  return (
    <div className="w-full min-h-[75vh] py-12 md:py-20 bg-[#FAF8F5]">
      <Container size="narrow">
        <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-12 shadow-sm text-center">
          {/* Success Check Icon */}
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 stroke-[1.75]" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#B44C2D] font-semibold block mb-2">
            Payment Confirmed
          </span>

          <h1 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-tight">
            Thank You for Your Order
          </h1>

          <p className="mt-3 text-sm sm:text-base text-stone-600 font-serif italic max-w-md mx-auto">
            Your artisanal blends are being small-batch packed with nitrogen flush and prepared for dispatch.
          </p>

          {/* Order Details Card */}
          <div className="mt-8 p-6 rounded-2xl bg-[#FBF9F5] border border-stone-200/80 text-left max-w-lg mx-auto space-y-3 font-serif">
            <div className="flex justify-between items-center text-xs pb-3 border-b border-stone-200">
              <span className="text-stone-500 uppercase tracking-wider font-mono">
                Order Reference
              </span>
              <span className="font-mono font-bold text-stone-900 text-sm">
                {orderNumber}
              </span>
            </div>

            <div className="flex items-start gap-3 pt-2 text-xs text-stone-600">
              <Truck className="w-4 h-4 text-[#143627] shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-stone-900 block">
                  Dispatching from Shivooham Facility
                </span>
                <span>Bilhaur, Kanpur Nagar, Uttar Pradesh — 209205</span>
                <span className="block text-[11px] text-stone-500 mt-0.5">
                  Estimated Delivery: 3–5 Business Days via Express Courier
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 text-xs text-stone-600">
              <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-stone-900 block">
                  Quality &amp; Food Safety Guarantee
                </span>
                <span>Dual FSSAI Licences: 22726317000406 &amp; 22725663000269</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 text-stone-700 text-xs uppercase tracking-widest font-medium hover:bg-stone-50 transition-colors"
            >
              <Printer className="w-4 h-4" /> Print Invoice
            </button>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#143627] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#1b4834] transition-colors shadow-sm"
            >
              Continue Exploring <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="font-serif text-stone-500">Loading order confirmation...</p>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
