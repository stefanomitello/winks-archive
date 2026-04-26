import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-slate-950 text-white shadow-sm hover:bg-slate-800 disabled:bg-slate-300",
        ghost:
          "bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-100 disabled:text-slate-300",
      },
      size: {
        md: "px-4 py-2",
        sm: "px-3 py-1.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
  };

export function Button({
  children,
  className = "",
  type = "button",
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
