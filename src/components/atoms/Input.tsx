import { cva, type VariantProps } from "class-variance-authority";
import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn.ts";

const inputVariants = cva(
  "w-full rounded-full bg-transparent text-sm outline-none transition placeholder:text-slate-400",
  {
    variants: {
      intent: {
        default:
          "border border-slate-300 px-5 py-3 focus:ring-4 focus:ring-amber-100",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>;

export function Input({ className = "", intent, ...props }: InputProps) {
  return (
    <input className={cn(inputVariants({ intent }), className)} {...props} />
  );
}
