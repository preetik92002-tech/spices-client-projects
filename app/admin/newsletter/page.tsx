"use client";

import React, { useState } from "react";
import { Mail, Download, Search, CheckCircle2 } from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  source: string;
  subscribedAt: string;
  status: "Active" | "Unsubscribed";
}

const INITIAL_SUBSCRIBERS: Subscriber[] = [
  { id: "sub_1", email: "priya.verma@example.com", source: "Homepage Footer", subscribedAt: "2026-09-17", status: "Active" },
  { id: "sub_2", email: "karan.mehta@example.com", source: "Checkout Opt-in", subscribedAt: "2026-09-16", status: "Active" },
  { id: "sub_3", email: "anita.deshmukh@example.com", source: "Homepage Footer", subscribedAt: "2026-09-15", status: "Active" },
  { id: "sub_4", email: "rohit.sen@example.com", source: "Journal Article", subscribedAt: "2026-09-14", status: "Active" },
  { id: "sub_5", email: "tarun.khanna@example.com", source: "Homepage Footer", subscribedAt: "2026-09-12", status: "Active" },
  { id: "sub_6", email: "deepika.patel@example.com", source: "Checkout Opt-in", subscribedAt: "2026-09-10", status: "Active" },
];

export default function AdminNewsletterPage() {
  const [subscribers] = useState<Subscriber[]>(INITIAL_SUBSCRIBERS);
  const [search, setSearch] = useState("");

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = ["ID", "Email", "Acquisition Source", "Subscription Date", "Status"];
    const rows = subscribers.map((s) => [
      s.id,
      s.email,
      s.source,
      s.subscribedAt,
      s.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `flavouron_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial-heading text-2xl sm:text-3xl text-stone-900">
            Newsletter Subscribers &amp; Leads
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-serif mt-0.5">
            View active culinary dispatch subscribers and export customer email leads.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#143627] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b4834] transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4" /> Export CSV Leads
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
          <span className="text-xs uppercase tracking-wider text-stone-400 font-mono block mb-1">
            Total Subscribers
          </span>
          <span className="font-editorial-heading text-2xl text-stone-900">
            {subscribers.length + 38}
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
          <span className="text-xs uppercase tracking-wider text-stone-400 font-mono block mb-1">
            Active Open Rate
          </span>
          <span className="font-editorial-heading text-2xl text-emerald-700">
            44.2%
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
          <span className="text-xs uppercase tracking-wider text-stone-400 font-mono block mb-1">
            Opt-in Source
          </span>
          <span className="font-editorial-heading text-2xl text-stone-900">
            Storefront Direct
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-200">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search subscriber email..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#143627]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/70 text-stone-500 uppercase tracking-wider">
                <th className="py-3 px-4 font-medium">Email</th>
                <th className="py-3 px-4 font-medium">Acquisition Channel</th>
                <th className="py-3 px-4 font-medium">Date Subscribed</th>
                <th className="py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-stone-900">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span>{sub.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    {sub.source}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-stone-500 text-[11px]">
                    {sub.subscribedAt}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> {sub.status}
                    </span>
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
