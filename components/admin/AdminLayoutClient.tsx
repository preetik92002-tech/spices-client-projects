"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, ShieldCheck } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5F2EB] text-stone-900">
      {/* Admin Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Top Navbar */}
        <header className="h-16 px-4 sm:px-6 bg-white border-b border-stone-200/80 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Toggle admin sidebar"
              className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-stone-500 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#143627]" />
              <span>Production Control Center • Bilhaur Unit</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
            >
              Live Site
            </Link>

            <div className="w-8 h-8 rounded-full bg-[#143627] text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Admin Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
