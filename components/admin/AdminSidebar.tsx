"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Video,
  FileText,
  Home,
  Image as ImageIcon,
  Search,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavGroup {
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: { name: string; href: string }[];
}

const NAV_GROUPS: NavGroup[] = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    name: "Products",
    icon: Package,
    subItems: [
      { name: "All Products", href: "/admin/products" },
      { name: "Add Product", href: "/admin/products/new" },
      { name: "Categories", href: "/admin/categories" },
      { name: "Collections", href: "/admin/collections" },
    ],
  },
  {
    name: "Orders",
    icon: ShoppingBag,
    subItems: [
      { name: "All Orders", href: "/admin/orders" },
    ],
  },
  { name: "Customers", href: "/admin/customers", icon: Users },
  {
    name: "Spotlight",
    icon: Video,
    subItems: [
      { name: "All Videos", href: "/admin/spotlights" },
      { name: "Add Spotlight", href: "/admin/spotlights/new" },
    ],
  },
  {
    name: "Journal",
    icon: FileText,
    subItems: [
      { name: "All Posts", href: "/admin/blogs" },
      { name: "Add Blog", href: "/admin/blogs/new" },
    ],
  },
  {
    name: "Homepage",
    href: "/admin/homepage",
    icon: Home,
    subItems: [
      { name: "Announcement", href: "/admin/homepage" },
      { name: "Hero", href: "/admin/homepage" },
      { name: "Collections", href: "/admin/homepage" },
      { name: "Featured Products", href: "/admin/homepage" },
      { name: "Spotlight", href: "/admin/homepage" },
      { name: "Editorial Sections", href: "/admin/homepage" },
      { name: "Journal", href: "/admin/homepage" },
      { name: "Newsletter", href: "/admin/homepage" },
    ],
  },
  { name: "Media Library", href: "/admin/media", icon: ImageIcon },
  {
    name: "SEO",
    href: "/admin/seo",
    icon: Search,
    subItems: [
      { name: "Global SEO", href: "/admin/seo" },
      { name: "Homepage SEO", href: "/admin/seo" },
      { name: "Product SEO", href: "/admin/seo" },
      { name: "Collection SEO", href: "/admin/seo" },
      { name: "Blog SEO", href: "/admin/seo" },
    ],
  },
  { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Products: true,
    Orders: true,
    Spotlight: true,
    Journal: true,
    Homepage: false,
    SEO: false,
  });

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-stone-950/50 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#143627] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-stone-800 lg:translate-x-0 lg:static lg:h-screen shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div>
          <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
            <div>
              <span className="font-editorial-heading text-lg tracking-wider uppercase font-semibold text-white block">
                FLAVOURON
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] block font-mono">
                Admin Control Center
              </span>
            </div>
            <Link
              href="/"
              target="_blank"
              title="View Live Store"
              className="p-1.5 rounded-md hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Hierarchical Navigation Tree */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-120px)] scrollbar-none">
            {NAV_GROUPS.map((group) => {
              const Icon = group.icon;
              const hasSubItems = group.subItems && group.subItems.length > 0;
              const isGroupOpen = openMenus[group.name] ?? false;

              // Check if parent or any sub-item is active
              const isDirectActive = group.href
                ? group.href === "/admin"
                  ? pathname === "/admin"
                  : pathname === group.href
                : false;

              const isChildActive = group.subItems
                ? group.subItems.some((sub) => pathname === sub.href)
                : false;

              const isExpanded = isGroupOpen || isChildActive;

              if (!hasSubItems) {
                return (
                  <Link
                    key={group.name}
                    href={group.href || "/admin"}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all",
                      isDirectActive
                        ? "bg-[#C5A059] text-stone-950 font-semibold shadow-xs"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{group.name}</span>
                  </Link>
                );
              }

              return (
                <div key={group.name} className="space-y-1">
                  <div
                    onClick={() => toggleMenu(group.name)}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer",
                      isChildActive && !group.href
                        ? "text-white font-semibold"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className="w-4 h-4 shrink-0" />
                      {group.href ? (
                        <Link
                          href={group.href}
                          onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                          }}
                          className="hover:underline truncate"
                        >
                          {group.name}
                        </Link>
                      ) : (
                        <span className="truncate">{group.name}</span>
                      )}
                    </div>
                    <span className="text-white/40">
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </div>

                  {/* Sub items */}
                  {isExpanded && (
                    <div className="pl-8 pr-2 py-0.5 space-y-0.5 border-l border-white/10 ml-5">
                      {group.subItems?.map((sub, sIdx) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={`${sub.name}-${sIdx}`}
                            href={sub.href}
                            onClick={onClose}
                            className={cn(
                              "block px-2.5 py-1.5 rounded-lg text-[11px] transition-all",
                              isSubActive
                                ? "text-[#C5A059] font-semibold bg-white/5"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                          >
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-white/70">
            <div className="flex flex-col">
              <span className="font-medium text-white">Shivooham Exports</span>
              <span className="text-[10px] text-white/50 font-mono">admin@flavouron.com</span>
            </div>
            <Link
              href="/"
              title="Exit Admin"
              className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
