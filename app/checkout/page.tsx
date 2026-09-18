"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  Truck,
  Check,
  AlertCircle,
  Sparkles,
  CreditCard,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Container } from "@/components/ui/Container";

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal?: {
    ondismiss: () => void;
  };
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "Uttar Pradesh",
    pincode: "",
  });

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const shippingFee = subtotal - discount >= 499 || items.length === 0 ? 0 : 60;
  const grandTotal = Math.max(0, subtotal - discount) + shippingFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorMessage("");
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const success = applyCoupon(couponInput);
    if (!success) {
      setCouponError("Invalid coupon. Try 'HERITAGE15' for 15% off.");
    } else {
      setCouponInput("");
    }
  };

  // Helper to dynamically load external Razorpay JS sdk
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (items.length === 0) {
      setErrorMessage("Your shopping bag is empty.");
      return;
    }

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.streetAddress ||
      !formData.city ||
      !formData.pincode
    ) {
      setErrorMessage("Please complete all required shipping address fields.");
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Server-side order creation & price recalculation
      const orderPayload = {
        items: items.map((item) => ({
          productId: item.product.id,
          variantId: item.variant.id,
          quantity: item.quantity,
        })),
        customer: formData,
        couponCode: appliedCoupon?.code,
      };

      const createRes = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!createRes.ok) {
        const errData = await createRes.json();
        throw new Error(errData.error || "Failed to initiate order on server");
      }

      const orderData = await createRes.json();
      const { orderNumber, razorpayOrderId, amount, keyId } = orderData;

      // Step 2: Load Razorpay SDK
      const isScriptLoaded = await loadRazorpayScript();

      // If Razorpay SDK is loaded and real credentials exist
      if (
        isScriptLoaded &&
        window.Razorpay &&
        keyId &&
        !keyId.includes("rzp_test_flavouron_demo")
      ) {
        const options: RazorpayOptions = {
          key: keyId,
          amount,
          currency: "INR",
          name: "FLAVOURON",
          description: `Order ${orderNumber} • Shivooham Exports`,
          image: "/images/brand/flavouron-logo.jpeg",
          order_id: razorpayOrderId,
          handler: async (response: RazorpayResponse) => {
            // Step 3: Server-side cryptographic signature verification
            const verifyRes = await fetch("/api/checkout/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderNumber,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (verifyRes.ok) {
              clearCart();
              router.push(`/order-success?orderNumber=${orderNumber}`);
            } else {
              setErrorMessage(
                "Payment verification failed. Please contact admin@flavouron.com"
              );
              setIsProcessing(false);
            }
          },
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#143627",
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false);
            },
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        // Deterministic Development / Fallback Testing Flow:
        // Automatically simulates payment confirmation and verifies order record
        const simPaymentId = `pay_demo_${Date.now()}`;
        const verifyRes = await fetch("/api/checkout/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderNumber,
            razorpay_order_id: razorpayOrderId,
            razorpay_payment_id: simPaymentId,
            isTestMode: true,
          }),
        });

        if (verifyRes.ok) {
          clearCart();
          router.push(`/order-success?orderNumber=${orderNumber}`);
        } else {
          throw new Error("Could not record confirmed order");
        }
      }
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(
        error.message || "An error occurred while processing checkout. Please try again."
      );
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] py-20 px-4 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
          <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h1 className="font-editorial-heading text-2xl sm:text-3xl text-stone-900">
          Your Shopping Bag is Empty
        </h1>
        <p className="mt-2 text-sm text-stone-500 max-w-sm">
          Select your favorite artisanal masalas and seasonings before proceeding to checkout.
        </p>
        <Link
          href="/collections"
          className="mt-6 px-8 py-3.5 rounded-full bg-[#143627] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#1b4834] transition-colors"
        >
          Browse Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-10 sm:py-16 bg-[#FAF8F5]">
      <Container size="default">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 hover:text-[#143627] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Shipping Address & Payment trigger */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
                <div>
                  <h2 className="font-editorial-heading text-2xl text-stone-900">
                    Shipping Details
                  </h2>
                  <p className="text-xs text-stone-500 font-serif mt-0.5">
                    Orders are packaged under nitrogen flush and dispatched from Bilhaur, UP.
                  </p>
                </div>
                <Truck className="w-5 h-5 text-[#143627]" />
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form id="checkout-form" onSubmit={handleCompleteOrder} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Priyanshu Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#143627] focus:ring-1 focus:ring-[#143627]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#143627] focus:ring-1 focus:ring-[#143627]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                    Email Address (For tracking &amp; invoice) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. priyanshu@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#143627] focus:ring-1 focus:ring-[#143627]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                    Street Address &amp; House/Building *
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    required
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="Flat No, Building Name, Street"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#143627] focus:ring-1 focus:ring-[#143627]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Kanpur"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#143627] focus:ring-1 focus:ring-[#143627]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="e.g. Uttar Pradesh"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#143627] focus:ring-1 focus:ring-[#143627]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="e.g. 209205"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#143627] focus:ring-1 focus:ring-[#143627]"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100">
                  <div className="flex items-center gap-2 text-stone-500 text-xs mb-4">
                    <Lock className="w-3.5 h-3.5 text-[#143627]" />
                    <span>256-Bit SSL Encrypted &amp; Secure Razorpay Checkout</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 rounded-full bg-[#143627] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#1b4834] transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    {isProcessing ? "Securing Order..." : `Pay ₹${grandTotal} via Razorpay`}
                  </button>
                </div>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-white border border-stone-200/80">
                <ShieldCheck className="w-5 h-5 text-[#143627] mx-auto mb-1" />
                <span className="text-[11px] font-medium text-stone-800 block">
                  Dual FSSAI Compliant
                </span>
                <span className="text-[10px] text-stone-500">
                  Lic. 22726317000406
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-stone-200/80">
                <Sparkles className="w-5 h-5 text-[#C5A059] mx-auto mb-1" />
                <span className="text-[11px] font-medium text-stone-800 block">
                  Aroma-Locked Packaging
                </span>
                <span className="text-[10px] text-stone-500">
                  Cold milled &amp; sealed
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-stone-200/80 col-span-2 sm:col-span-1">
                <Truck className="w-5 h-5 text-[#B44C2D] mx-auto mb-1" />
                <span className="text-[11px] font-medium text-stone-800 block">
                  Express Pan-India
                </span>
                <span className="text-[10px] text-stone-500">
                  Shipped within 24 hours
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs sticky top-28">
              <h2 className="font-editorial-heading text-xl text-stone-900 pb-4 border-b border-stone-200">
                Order Summary ({items.length} {items.length === 1 ? "item" : "items"})
              </h2>

              {/* Items List */}
              <div className="py-4 space-y-3 max-h-80 overflow-y-auto divide-y divide-stone-100">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-lg bg-[#FAF8F5] p-1 border border-stone-100 shrink-0">
                      <Image
                        src={item.product.images.primary}
                        alt={item.product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm text-stone-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-stone-500">
                        {item.variant.weight} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-serif text-sm font-semibold text-stone-900">
                      ₹{item.variant.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Redemption */}
              <div className="pt-4 pb-4 border-t border-b border-stone-200">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <span className="font-mono text-emerald-800 font-semibold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      {appliedCoupon.code} (-{appliedCoupon.discountPercentage}%)
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-400 hover:text-stone-700 uppercase tracking-widest text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Coupon code (e.g. HERITAGE15)"
                        className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs uppercase tracking-wider focus:outline-none focus:border-[#143627]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs uppercase tracking-wider font-medium hover:bg-stone-800 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-rose-600">{couponError}</p>
                    )}
                  </form>
                )}
              </div>

              {/* Totals Breakdown */}
              <div className="pt-4 space-y-2.5 text-xs sm:text-sm text-stone-600 font-serif">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-stone-900">₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Artisanal Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase tracking-wider text-xs">
                        FREE
                      </span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-base sm:text-lg font-serif font-bold text-stone-900">
                  <span>Grand Total</span>
                  <span className="text-[#143627]">₹{grandTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
