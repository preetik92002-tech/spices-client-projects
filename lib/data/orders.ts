export interface OrderItem {
  productId: string;
  productName: string;
  variantWeight: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  customer: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  grandTotal: number;
  currency: string;
  paymentStatus: "pending" | "paid" | "failed";
  fulfillmentStatus: "unfulfilled" | "processing" | "shipped" | "delivered";
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export const ORDERS: Order[] = [
  {
    id: "ord_1001",
    orderNumber: "FLV-2026-1001",
    razorpayOrderId: "order_mock_1001",
    razorpayPaymentId: "pay_mock_9921",
    customer: {
      fullName: "Ananya Sharma",
      email: "ananya.sharma@example.com",
      phone: "+91 98201 44521",
      streetAddress: "Flat 402, Royal Palms, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050",
    },
    items: [
      {
        productId: "paneer-lababdar",
        productName: "Paneer Lababdar Masala",
        variantWeight: "100 g",
        unitPrice: 388,
        quantity: 2,
        subtotal: 776,
        image: "/images/products/paneer-lababdar-black.jpeg",
      },
      {
        productId: "sandwich-masala",
        productName: "Sandwich Masala",
        variantWeight: "100 g",
        unitPrice: 199,
        quantity: 1,
        subtotal: 199,
        image: "/images/products/sandwich-masala-white.jpeg",
      },
    ],
    subtotal: 975,
    discount: 146,
    couponCode: "HERITAGE15",
    shippingFee: 0,
    grandTotal: 829,
    currency: "INR",
    paymentStatus: "paid",
    fulfillmentStatus: "shipped",
    trackingNumber: "DTDC84920412IN",
    createdAt: "2026-09-17T14:30:00.000Z",
    updatedAt: "2026-09-17T16:00:00.000Z",
  },
  {
    id: "ord_1002",
    orderNumber: "FLV-2026-1002",
    razorpayOrderId: "order_mock_1002",
    razorpayPaymentId: "pay_mock_9922",
    customer: {
      fullName: "Vikram Malhotra",
      email: "vikram.m@example.com",
      phone: "+91 98110 32901",
      streetAddress: "B-14, Defence Colony",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110024",
    },
    items: [
      {
        productId: "veg-biryani",
        productName: "Veg Biryani Masala",
        variantWeight: "100 g",
        unitPrice: 349,
        quantity: 2,
        subtotal: 698,
        image: "/images/products/veg-biryani.jpeg",
      },
      {
        productId: "pizza-seasoning",
        productName: "Pizza Seasoning",
        variantWeight: "80 g",
        unitPrice: 220,
        quantity: 1,
        subtotal: 220,
        image: "/images/products/pizza-seasoning.jpeg",
      },
    ],
    subtotal: 918,
    discount: 0,
    shippingFee: 0,
    grandTotal: 918,
    currency: "INR",
    paymentStatus: "paid",
    fulfillmentStatus: "processing",
    createdAt: "2026-09-18T09:15:00.000Z",
    updatedAt: "2026-09-18T09:20:00.000Z",
  },
];
