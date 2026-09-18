import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ArrowRight,
  Plus,
} from "lucide-react";
import { PRODUCTS } from "@/lib/data/products";
import { ORDERS } from "@/lib/data/orders";

export default function AdminDashboardPage() {
  const totalProducts = PRODUCTS.length;
  const lowStockCount = PRODUCTS.filter((p) => (p.stock ?? 100) < 50).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial-heading text-2xl sm:text-3xl text-stone-900">
            Operations &amp; Sales Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-serif mt-1">
            Real-time storefront metrics, dispatch pipeline, and inventory status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#1b4834] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs uppercase tracking-wider font-medium">
              Total Revenue
            </span>
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="font-editorial-heading text-2xl sm:text-3xl text-stone-900">
            ₹1,48,250
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% from last month</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs uppercase tracking-wider font-medium">
              Orders Placed
            </span>
            <span className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </div>
          <div className="font-editorial-heading text-2xl sm:text-3xl text-stone-900">
            {ORDERS.length + 122}
          </div>
          <div className="mt-2 text-[11px] text-stone-500">
            Avg. Order Value: ₹1,195
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs uppercase tracking-wider font-medium">
              Active Catalog
            </span>
            <span className="p-2 rounded-lg bg-stone-100 text-stone-700">
              <Package className="w-4 h-4" />
            </span>
          </div>
          <div className="font-editorial-heading text-2xl sm:text-3xl text-stone-900">
            {totalProducts} Blends
          </div>
          <div className="mt-2 text-[11px] text-stone-500">
            Across 5 Core Collections
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs uppercase tracking-wider font-medium">
              Inventory Watch
            </span>
            <span className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="font-editorial-heading text-2xl sm:text-3xl text-amber-900">
            {lowStockCount} Alert{lowStockCount === 1 ? "" : "s"}
          </div>
          <div className="mt-2 text-[11px] text-amber-800">
            Stock below 50 units
          </div>
        </div>
      </div>

      {/* Main Row: Recent Orders & Top Selling */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
            <h2 className="font-editorial-heading text-lg text-stone-900">
              Recent Customer Orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-xs uppercase tracking-wider text-[#143627] hover:underline flex items-center gap-1 font-medium"
            >
              All Orders <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-100 text-stone-400 uppercase tracking-wider">
                  <th className="py-2.5 font-medium">Order #</th>
                  <th className="py-2.5 font-medium">Customer</th>
                  <th className="py-2.5 font-medium">Items</th>
                  <th className="py-2.5 font-medium">Total</th>
                  <th className="py-2.5 font-medium">Status</th>
                  <th className="py-2.5 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50 text-stone-700">
                {ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/70">
                    <td className="py-3 font-mono font-medium text-stone-900">
                      {order.orderNumber}
                    </td>
                    <td className="py-3">
                      <div>
                        <span className="font-medium text-stone-900 block">
                          {order.customer.fullName}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {order.customer.city}, {order.customer.state}
                        </span>
                      </div>
                    </td>
                    <td className="py-3">
                      {order.items.length} {order.items.length === 1 ? "item" : "items"}
                    </td>
                    <td className="py-3 font-mono font-semibold text-stone-900">
                      ₹{order.grandTotal}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                          order.paymentStatus === "paid"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href="/admin/orders"
                        className="text-[11px] font-medium text-[#143627] hover:underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Performing Blends (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs">
          <h2 className="font-editorial-heading text-lg text-stone-900 pb-4 border-b border-stone-100 mb-4">
            Top Performing Spices
          </h2>

          <div className="space-y-4">
            {PRODUCTS.slice(0, 4).map((product, idx) => (
              <div key={product.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs font-bold text-stone-400 w-4">
                    #{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-serif text-sm font-medium text-stone-900 truncate">
                      {product.name}
                    </p>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                      {product.categoryLabel}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-xs font-bold text-stone-900 block">
                    ₹{product.price}
                  </span>
                  <span className="text-[10px] text-emerald-700">In Stock</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 text-center">
            <Link
              href="/admin/products"
              className="text-xs uppercase tracking-wider text-[#143627] font-medium hover:underline inline-flex items-center gap-1"
            >
              Full Inventory Management <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
