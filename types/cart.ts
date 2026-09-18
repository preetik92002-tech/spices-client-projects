import { Product, ProductVariant } from "./product";

export interface CartItem {
  id: string; // unique item id (e.g. `${productId}-${variantId}`)
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface AppliedCoupon {
  code: string;
  discountPercentage: number;
  discountAmount: number;
}

export interface CartContextType {
  items: CartItem[];
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}
