import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  theme = "light",
  className,
}: SectionHeadingProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "flex flex-col space-y-3",
        {
          "items-center text-center": align === "center",
          "items-start text-left": align === "left",
          "items-end text-right": align === "right",
        },
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "font-eyebrow",
            isDark ? "text-[var(--muted-gold)]" : "text-[var(--primary-green)]/80"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-editorial-heading text-2xl sm:text-3xl md:text-4xl lg:text-[42px] tracking-tight uppercase",
          isDark ? "text-[#FAF8F5]" : "text-[var(--foreground)]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-sm sm:text-base font-body-sans font-light leading-relaxed",
            isDark ? "text-[#FAF8F5]/80" : "text-[var(--muted-text)]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
