import { cn } from "@/lib/utils";

/**
 * Responsive row: a CSS grid on desktop that collapses to a horizontal
 * snap-scroller under 820px (see the [data-scroll] rules in globals.css).
 * `peek` shows the next card at the edge to signal scrollability.
 */
export function Scroller({
  children,
  className,
  peek,
  cols = "repeat(auto-fill,minmax(260px,1fr))",
}: {
  children: React.ReactNode;
  className?: string;
  peek?: boolean;
  cols?: string;
}) {
  return (
    <div
      data-scroll=""
      {...(peek ? { "data-scroll-peek": "" } : {})}
      className={cn("grid gap-5", className)}
      style={{ gridTemplateColumns: cols }}
    >
      {children}
    </div>
  );
}
