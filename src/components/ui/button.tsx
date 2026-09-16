import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-display font-bold whitespace-nowrap transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-60 cursor-pointer [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-grad text-white shadow-[0_10px_28px_rgba(255,45,149,.35)] hover:brightness-110",
        subtle:
          "bg-[rgba(255,255,255,.08)] text-text hover:bg-[rgba(255,255,255,.14)]",
        ghost:
          "bg-card border border-border-2 text-text hover:bg-card-strong",
        outline:
          "border border-border-2 bg-transparent text-text hover:bg-card",
        link: "text-pink-hover hover:underline p-0 h-auto shadow-none",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        default: "h-11 px-5 text-[14px]",
        lg: "h-[52px] px-7 text-[15px]",
        icon: "h-11 w-11 px-0",
      },
      shape: {
        rounded: "rounded-[14px]",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      shape: "rounded",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, shape }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
