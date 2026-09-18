"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductVariant } from "@/types/product";
import { CartItem, AppliedCoupon, CartContextType } from "@/types/cart";

const CART_STORAGE_KEY = "flavouron_guest_cart_v1";
const FREE_SHIPPING_THRESHOLD = 499;

const VALID_COUPONS: Record<string, number> = {
  HERITAGE15: 15, // 15% off
  WELCOME10: 10,  // 10% off
  FLAVOURON: 20,  // 20% off
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage once mounted
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setTimeout(() => {
          setItems(parsed);
          setIsHydrated(true);
        }, 0);
      } else {
        setTimeout(() => setIsHydrated(true), 0);
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
      setTimeout(() => setIsHydrated(true), 0);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items, isHydrated]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (
    product: Product,
    variant?: ProductVariant,
    quantity: number = 1
  ) => {
    const selectedVariant: ProductVariant =
      variant ||
      product.variants[0] || {
        id: `v-default-${product.id}`,
        weight: product.weight,
        unit: product.unit,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        sku: product.sku,
        stock: product.stock,
        active: true,
      };

    const itemId = `${product.id}-${selectedVariant.id}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prevItems,
        {
          id: itemId,
          product,
          variant: selectedVariant,
          quantity,
        },
      ];
    });

    setIsOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (VALID_COUPONS[cleanCode]) {
      const discountPct = VALID_COUPONS[cleanCode];
      setAppliedCoupon({
        code: cleanCode,
        discountPercentage: discountPct,
        discountAmount: 0, // calculated in totals
      });
      return {
        success: true,
        message: `Coupon ${cleanCode} applied! (${discountPct}% off)`,
      };
    }
    return {
      success: false,
      message: "Invalid or expired coupon code. Try HERITAGE15.",
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce(
    (acc, item) => acc + item.variant.price * item.quantity,
    0
  );

  const discount = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.discountPercentage) / 100)
    : 0;

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 60;

  const total = Math.max(0, subtotal - discount + shipping);

  const amountNeededForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        shipping,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
