import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-[14px] border bg-card px-4 text-[15px] text-text placeholder:text-muted-2 outline-none transition-colors",
          "border-border-2 focus-visible:border-[var(--pink)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[120px] w-full rounded-[14px] border bg-card px-4 py-3 text-[15px] text-text placeholder:text-muted-2 outline-none transition-colors",
          "border-border-2 focus-visible:border-[var(--pink)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
