import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

type TypographyProps = {
  as?: "h1" | "h2" | "h3" | "p" | "span";
  children: ReactNode;
  className?: string;
} & VariantProps<typeof typographyVariants>;

const typographyVariants = cva("", {
  variants: {
    size: {
      display: "text-4xl font-semibold tracking-tight sm:text-5xl",
      title: "text-2xl font-semibold tracking-tight sm:text-3xl",
      subtitle: "text-lg font-medium tracking-tight sm:text-xl",
      body: "text-sm leading-6 sm:text-base",
      caption: "text-xs font-medium uppercase tracking-[0.24em]",
    },
    tone: {
      default: "text-slate-950",
      muted: "text-slate-600",
      accent: "text-amber-700",
    },
  },
  defaultVariants: {
    size: "body",
    tone: "default",
  },
});

export function Typography({
  as: Component = "p",
  children,
  tone,
  size,
  className = "",
}: TypographyProps) {
  return <Component className={cn(typographyVariants({ size, tone }), className)}>{children}</Component>;
}
