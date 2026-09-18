import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "default" | "wide" | "full";
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  size = "default",
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-12",
        {
          "max-w-4xl": size === "narrow",
          "max-w-7xl": size === "default",
          "max-w-[1440px]": size === "wide",
          "max-w-none px-0": size === "full",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
