"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  fallback?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  aspectRatio?: string;
  badge?: string;
}

export function ProductImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className,
  fill = true,
  width,
  height,
  fallback = "/images/brand/flavouron-logo.png",
  objectFit = "contain",
  aspectRatio,
  badge,
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  if (hasError) {
    return (
      <div
        className={cn(
          "w-full h-full flex flex-col items-center justify-center bg-stone-100/80 p-4 text-center select-none",
          className
        )}
      >
        <div className="relative w-16 h-16 opacity-40 mb-2">
          <Image
            src={fallback}
            alt="Flavouron placeholder"
            fill
            className="object-contain"
          />
        </div>
        <span className="font-editorial-heading text-xs tracking-widest text-stone-500 uppercase">
          FLAVOURON
        </span>
        <span className="text-[9px] tracking-widest text-stone-400 uppercase font-sans mt-0.5">
          Artisanal Spice
        </span>
      </div>
    );
  }

  const fitClass =
    objectFit === "contain"
      ? "object-contain"
      : objectFit === "cover"
      ? "object-cover"
      : "";

  if (fill) {
    return (
      <div className={cn("relative w-full h-full", aspectRatio)}>
        <Image
          src={imgSrc}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(fitClass, "transition-all duration-500", className)}
          onError={() => {
            setHasError(true);
          }}
        />
        {badge && (
          <span className="absolute top-2 left-2 bg-[#B44C2D] text-white text-[9px] uppercase tracking-wider px-2 py-0.5 font-medium z-10">
            {badge}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative inline-block", aspectRatio)}>
      <Image
        src={imgSrc}
        alt={alt}
        width={width || 400}
        height={height || 400}
        priority={priority}
        sizes={sizes}
        className={cn(fitClass, "transition-all duration-500", className)}
        onError={() => {
          setHasError(true);
        }}
      />
      {badge && (
        <span className="absolute top-2 left-2 bg-[#B44C2D] text-white text-[9px] uppercase tracking-wider px-2 py-0.5 font-medium z-10">
          {badge}
        </span>
      )}
    </div>
  );
}
