import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Truck,
  CreditCard,
  Printer,
  Mail,
  Phone,
} from "lucide-react";
import { ORDERS } from "@/lib/data/orders";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const order = ORDERS.find((o) => o.id === id || o.orderNumber === id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-editorial-heading text-2xl text-stone-900">
                Order {order.orderNumber}
              </h1>
              <span
                className={`text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full ${
                  order.paymentStatus === "paid"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>
            <p className="text-xs text-stone-500 font-serif">
              Placed on {new Date(order.createdAt).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/order-success?orderNumber=${order.orderNumber}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-medium hover:bg-stone-50"
          >
            <Printer className="w-3.5 h-3.5" /> Customer Invoice
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Items & Payment (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs space-y-4">
            <h2 className="font-editorial-heading text-lg text-stone-900 border-b border-stone-100 pb-3">
              Items Ordered ({order.items.length})
            </h2>

            <div className="divide-y divide-stone-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-14 h-14 rounded-xl bg-[#FAF8F5] p-1 border border-stone-100 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.productName}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-serif font-medium text-stone-900 text-sm truncate">
                        {item.productName}
                      </p>
                      <p className="text-xs text-stone-500">
                        {item.variantWeight} × {item.quantity} unit{item.quantity > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-sm font-semibold text-stone-900 block">
                      ₹{item.subtotal}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      ₹{item.unitPrice} each
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="pt-4 border-t border-stone-200 space-y-2 text-xs text-stone-600 font-serif">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-stone-900">₹{order.subtotal}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Artisanal Coupon ({order.couponCode || "COUPON"}):</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{order.shippingFee === 0 ? "FREE" : `₹${order.shippingFee}`}</span>
              </div>
              <div className="flex justify-between font-bold text-stone-900 text-base pt-2 border-t border-stone-200">
                <span>Grand Total Paid:</span>
                <span className="text-[#143627]">₹{order.grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Payment Gateway Traceability */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <CreditCard className="w-4 h-4 text-[#143627]" />
              <h2 className="font-editorial-heading text-base text-stone-900">
                Razorpay Payment Gateway Trace
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] uppercase text-stone-400 block mb-1">
                  Razorpay Order ID
                </span>
                <span className="text-stone-900 font-semibold">{order.razorpayOrderId || "N/A"}</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] uppercase text-stone-400 block mb-1">
                  Payment Transaction ID
                </span>
                <span className="text-emerald-700 font-semibold">{order.razorpayPaymentId || "Captured"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customer & Delivery Status (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Fulfillment Status */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <Truck className="w-4 h-4 text-[#143627]" />
              <h2 className="font-editorial-heading text-base text-stone-900">
                Dispatch Lifecycle
              </h2>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium block">
                Current Status
              </span>
              <span className="inline-block text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-[#EFE9DF] text-[#143627]">
                {order.fulfillmentStatus}
              </span>
              {order.trackingNumber && (
                <div className="pt-2 text-xs font-mono text-stone-600">
                  Tracking: <strong>{order.trackingNumber}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Customer Profile */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs space-y-3">
            <h2 className="font-editorial-heading text-base text-stone-900 border-b border-stone-100 pb-3">
              Customer Details
            </h2>

            <div className="space-y-2 text-xs text-stone-700">
              <p className="font-semibold text-stone-900 text-sm">{order.customer.fullName}</p>
              <div className="flex items-center gap-2 text-stone-600">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <a href={`mailto:${order.customer.email}`} className="hover:underline">
                  {order.customer.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-stone-600">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <a href={`tel:${order.customer.phone}`} className="hover:underline">
                  {order.customer.phone}
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 space-y-1 text-xs text-stone-600">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium block">
                Delivery Address
              </span>
              <p>{order.customer.streetAddress}</p>
              <p>{order.customer.city}, {order.customer.state} — {order.customer.pincode}</p>
              <p className="font-medium text-stone-800">India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
