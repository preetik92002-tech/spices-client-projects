import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "outline"
    | "outline-light"
    | "terracotta"
    | "gold"
    | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  isExternal,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-body-sans uppercase tracking-[0.16em] font-medium transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "text-[11px] px-5 py-2",
    md: "text-[12px] px-7 py-3",
    lg: "text-[13px] px-9 py-4 tracking-[0.2em]",
  };

  const variantStyles = {
    primary:
      "bg-[var(--primary-green)] text-[#FAF8F5] hover:bg-[var(--secondary-green)] hover:shadow-md focus-visible:ring-[var(--primary-green)]",
    outline:
      "border border-[var(--primary-green)] text-[var(--primary-green)] hover:bg-[var(--primary-green)] hover:text-[#FAF8F5] focus-visible:ring-[var(--primary-green)]",
    "outline-light":
      "border border-white/80 text-white hover:bg-white hover:text-[var(--primary-green)] backdrop-blur-sm focus-visible:ring-white",
    terracotta:
      "bg-[var(--terracotta)] text-white hover:bg-[#963B20] hover:shadow-md focus-visible:ring-[var(--terracotta)]",
    gold: "border border-[var(--muted-gold)] text-[var(--foreground)] hover:bg-[var(--muted-gold)] hover:text-white focus-visible:ring-[var(--muted-gold)]",
    ghost:
      "text-[var(--foreground)] hover:text-[var(--primary-green)] hover:bg-black/5 rounded-none px-2 py-1 tracking-[0.1em]",
  };

  const combinedClassName = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
