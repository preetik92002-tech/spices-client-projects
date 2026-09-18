"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { ORDERS } from "@/lib/data/orders";

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");

  // Extract unique customers from orders
  const customers = ORDERS.map((ord, idx) => ({
    id: `cust_${idx + 1}`,
    name: ord.customer.fullName,
    email: ord.customer.email,
    phone: ord.customer.phone,
    location: `${ord.customer.city}, ${ord.customer.state}`,
    ordersCount: 1,
    totalSpend: ord.grandTotal,
    joinedDate: new Date(ord.createdAt).toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    }),
  }));

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial-heading text-2xl sm:text-3xl text-stone-900">
            Customer Directory
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-serif mt-0.5">
            Registered customer accounts, contact details, and lifetime order histories.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-white text-xs focus:outline-none focus:border-[#143627]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/70 text-stone-500 uppercase tracking-wider">
                <th className="py-3 px-4 font-medium">Customer</th>
                <th className="py-3 px-4 font-medium">Contact</th>
                <th className="py-3 px-4 font-medium">Location</th>
                <th className="py-3 px-4 font-medium">Orders</th>
                <th className="py-3 px-4 font-medium">Total Spend</th>
                <th className="py-3 px-4 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-stone-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#143627] text-white flex items-center justify-center font-bold text-xs">
                        {cust.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-serif text-sm">{cust.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <p className="text-stone-900">{cust.email}</p>
                      <p className="text-[11px] text-stone-400 font-mono">{cust.phone}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    {cust.location}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium">
                    {cust.ordersCount}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-stone-900">
                    ₹{cust.totalSpend}
                  </td>
                  <td className="py-3.5 px-4 text-stone-500 font-mono text-[11px]">
                    {cust.joinedDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
