"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, Tag, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    itemCount,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput("");
    }
  };

  const freeShippingProgress = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs"
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 240 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[var(--border)]"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[var(--border)] bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <ShoppingBag className="w-5 h-5 text-[var(--primary-green)]" />
                  <h2 className="font-editorial-heading text-lg sm:text-xl font-medium tracking-wide uppercase text-[var(--foreground)]">
                    Your Spice Bag
                  </h2>
                  <span className="text-xs font-medium font-body-sans px-2 py-0.5 rounded-full bg-[var(--sand)] text-[var(--foreground)]">
                    {itemCount}
                  </span>
                </div>

                <button
                  onClick={closeCart}
                  aria-label="Close bag"
                  className="p-1.5 rounded-full text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-[var(--sand)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="mt-4 pt-3 border-t border-[var(--border)]/60">
                <div className="flex justify-between items-center text-[11px] font-body-sans mb-1.5">
                  {amountNeededForFreeShipping > 0 ? (
                    <span className="text-[var(--muted-text)]">
                      Add{" "}
                      <strong className="text-[var(--terracotta)] font-semibold">
                        ₹{amountNeededForFreeShipping}
                      </strong>{" "}
                      more for complimentary delivery
                    </span>
                  ) : (
                    <span className="text-[var(--primary-green)] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> You unlocked free
                      express shipping!
                    </span>
                  )}
                  <span className="text-[10px] text-[var(--muted-text)]">
                    ₹{freeShippingThreshold} threshold
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#E8E2D6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--primary-green)] transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Items List / Empty State */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 divide-y divide-[var(--border)]/60">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--sand)] flex items-center justify-center text-[var(--primary-green)]">
                    <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                  </div>
                  <div>
                    <h3 className="font-editorial-heading text-lg text-[var(--foreground)] uppercase">
                      Your bag is empty
                    </h3>
                    <p className="font-body-sans text-xs text-[var(--muted-text)] max-w-xs mt-1 leading-relaxed">
                      Discover our royal curry masalas, fragrant biryani powders,
                      and handpicked seasonings.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    href="/collections"
                    onClick={closeCart}
                  >
                    Discover Collections
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                    {/* Packaging Thumbnail */}
                    <div className="relative w-20 h-24 shrink-0 bg-white rounded-sm border border-[var(--border)] p-1 flex items-center justify-center">
                      <Image
                        src={item.product.images.primary}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    </div>

                    {/* Details & Stepper */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <Link
                            href={`/products/${item.product.slug}`}
                            onClick={closeCart}
                            className="font-editorial-heading text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary-green)] transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label="Remove item"
                            className="text-[var(--muted-text)] hover:text-[var(--terracotta)] p-1 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-[11px] font-body-sans text-[var(--muted-text)] block mt-0.5">
                          Variant: {item.variant.weight}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Stepper */}
                        <div className="flex items-center border border-[var(--border)] bg-white rounded-sm">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                            className="p-1 hover:bg-[var(--sand)] text-[var(--foreground)] transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-medium font-body-sans">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                            className="p-1 hover:bg-[var(--sand)] text-[var(--foreground)] transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-body-sans text-sm font-semibold text-[var(--foreground)]">
                          ₹{(item.variant.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-5 sm:p-6 bg-white border-t border-[var(--border)] space-y-4">
                {/* Promo Code Accordion/Form */}
                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Coupon (e.g. HERITAGE15)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full text-xs uppercase tracking-wider px-3 py-2 border border-[var(--border)] rounded-sm bg-[#FAF8F5] focus:outline-none focus:border-[var(--primary-green)]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[var(--sand)] hover:bg-[var(--primary-green)] hover:text-white rounded-sm transition-colors text-[var(--foreground)]"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2.5 rounded-sm bg-[var(--sand-light)] border border-[var(--border)] text-xs">
                    <div className="flex items-center space-x-2">
                      <Tag className="w-3.5 h-3.5 text-[var(--primary-green)]" />
                      <span className="font-semibold text-[var(--primary-green)]">
                        {appliedCoupon.code}
                      </span>
                      <span className="text-[var(--muted-text)]">
                        ({appliedCoupon.discountPercentage}% off)
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[var(--terracotta)] hover:underline font-medium text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponFeedback && (
                  <p
                    className={`text-[11px] ${
                      couponFeedback.success
                        ? "text-[var(--primary-green)]"
                        : "text-[var(--terracotta)]"
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs font-body-sans text-[var(--muted-text)] pt-2 border-t border-[var(--border)]/60">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[var(--foreground)] font-medium">
                      ₹{subtotal.toLocaleString("en-IN")}.00
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[var(--primary-green)]">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-₹{discount.toLocaleString("en-IN")}.00</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-[var(--foreground)] font-medium">
                      {shipping === 0 ? (
                        <span className="text-[var(--primary-green)] font-semibold uppercase text-[11px]">
                          Free
                        </span>
                      ) : (
                        `₹${shipping}.00`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-semibold text-[var(--foreground)] pt-2 border-t border-[var(--border)]">
                    <span className="font-editorial-heading uppercase tracking-wide">
                      Total
                    </span>
                    <span>₹{total.toLocaleString("en-IN")}.00</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2 group"
                  href="/checkout"
                  onClick={closeCart}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>

                {/* Trust Seal */}
                <p className="text-[10px] text-center text-[var(--muted-text)] uppercase tracking-wider">
                  Guaranteed Authentic Indian Spices • Secure Razorpay Checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
