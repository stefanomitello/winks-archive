import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

const cardVariants = cva(
  "rounded-2xl border bg-white/95 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)]",
  {
    variants: {
      padding: {
        md: "p-5",
        lg: "p-6",
        none: "p-0",
      },
      surface: {
        default: "border-slate-200/80",
        muted: "border-slate-200 bg-white/80",
        bare: "border-0 shadow-none",
      },
    },
    defaultVariants: {
      padding: "md",
      surface: "default",
    },
  },
);

type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & {
    children: ReactNode;
  };

export function Card({
  children,
  className = "",
  padding,
  surface,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ padding, surface }), className)}
      {...props}
    >
      {children}
    </div>
  );
}
