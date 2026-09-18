"use client";

import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { ORDERS, Order } from "@/lib/data/orders";

export default function AdminOrdersPage() {
  const [ordersList, setOrdersList] = useState<Order[]>(ORDERS);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleStatusChange = (orderId: string, newStatus: Order["fulfillmentStatus"]) => {
    setOrdersList((prev) =>
      prev.map((ord) =>
        ord.id === orderId ? { ...ord, fulfillmentStatus: newStatus } : ord
      )
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => prev ? { ...prev, fulfillmentStatus: newStatus } : null);
    }
  };

  const filtered = ordersList.filter((ord) => {
    const matchStatus = filter === "all" || ord.fulfillmentStatus === filter || ord.paymentStatus === filter;
    const matchSearch =
      ord.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      ord.customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
      ord.customer.email.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial-heading text-2xl sm:text-3xl text-stone-900">
            Customer Orders &amp; Fulfillment
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-serif mt-0.5">
            Process incoming orders, manage dispatch status, and log tracking IDs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-white px-3 py-1.5 rounded-xl border border-stone-200 text-stone-600">
            Total Orders: <strong>{ordersList.length}</strong>
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order #, customer, email..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-stone-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white text-stone-700 focus:outline-none focus:border-[#143627]"
          >
            <option value="all">All Orders</option>
            <option value="paid">Payment: Paid</option>
            <option value="processing">Fulfillment: Processing</option>
            <option value="shipped">Fulfillment: Shipped</option>
            <option value="delivered">Fulfillment: Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/70 text-stone-500 uppercase tracking-wider">
                <th className="py-3 px-4 font-medium">Order #</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Customer</th>
                <th className="py-3 px-4 font-medium">Items</th>
                <th className="py-3 px-4 font-medium">Payment</th>
                <th className="py-3 px-4 font-medium">Fulfillment</th>
                <th className="py-3 px-4 font-medium">Total</th>
                <th className="py-3 px-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-stone-900">
                    {order.orderNumber}
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-500 text-[11px]">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <span className="font-medium text-stone-900 block">
                        {order.customer.fullName}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {order.customer.city}, {order.customer.state}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {order.items.length} {order.items.length === 1 ? "item" : "items"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                        order.paymentStatus === "paid"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={order.fulfillmentStatus}
                      onChange={(e) =>
                        handleStatusChange(
                          order.id,
                          e.target.value as Order["fulfillmentStatus"]
                        )
                      }
                      className="px-2 py-1 rounded-lg border border-stone-200 text-[11px] bg-stone-50 text-stone-700 font-medium focus:outline-none"
                    >
                      <option value="unfulfilled">Unfulfilled</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-stone-900">
                    ₹{order.grandTotal}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h3 className="font-editorial-heading text-xl text-stone-900">
                  Order Details: {selectedOrder.orderNumber}
                </h3>
                <span className="text-xs text-stone-400 font-mono">
                  Razorpay ID: {selectedOrder.razorpayOrderId || "N/A"}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-stone-400 hover:text-stone-700 text-xs uppercase tracking-widest px-2 py-1 rounded-lg hover:bg-stone-100"
              >
                Close
              </button>
            </div>

            {/* Customer & Address */}
            <div className="p-4 rounded-xl bg-stone-50 space-y-1.5 text-xs text-stone-700">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono font-medium block">
                Shipping Destination
              </span>
              <p className="font-semibold text-stone-900">{selectedOrder.customer.fullName}</p>
              <p>{selectedOrder.customer.streetAddress}</p>
              <p>
                {selectedOrder.customer.city}, {selectedOrder.customer.state} — {selectedOrder.customer.pincode}
              </p>
              <p className="font-mono text-stone-500 pt-1">
                Phone: {selectedOrder.customer.phone} | Email: {selectedOrder.customer.email}
              </p>
            </div>

            {/* Items */}
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium block mb-2">
                Order Items ({selectedOrder.items.length})
              </span>
              <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-serif font-medium text-stone-900">{item.productName}</p>
                      <p className="text-[11px] text-stone-400">
                        {item.variantWeight} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-mono font-semibold text-stone-900">₹{item.subtotal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals Breakdown */}
            <div className="p-4 rounded-xl bg-stone-50 space-y-1.5 text-xs text-stone-600 font-serif">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{selectedOrder.subtotal}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({selectedOrder.couponCode || "COUPON"}):</span>
                  <span>-₹{selectedOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee:</span>
                <span>{selectedOrder.shippingFee === 0 ? "FREE" : `₹${selectedOrder.shippingFee}`}</span>
              </div>
              <div className="flex justify-between font-bold text-stone-900 text-sm pt-2 border-t border-stone-200">
                <span>Grand Total:</span>
                <span>₹{selectedOrder.grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
