import { Star } from "lucide-react";
import { Card } from "@/components/common";

export function TestimonialCard({
  quote,
  initial,
  name,
  role,
}: {
  quote: string;
  initial: string;
  name: string;
  role: string;
}) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex gap-1" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-[var(--pink)] text-pink" />
        ))}
      </div>
      <p className="text-[15px] leading-relaxed text-text-3">“{quote}”</p>
      <div className="mt-auto flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-accent-grad font-display text-[16px] font-bold text-white">
          {initial}
        </span>
        <div>
          <div className="font-display text-[15px] font-bold text-text">{name}</div>
          <div className="text-[13px] text-muted">{role}</div>
        </div>
      </div>
    </Card>
  );
}
