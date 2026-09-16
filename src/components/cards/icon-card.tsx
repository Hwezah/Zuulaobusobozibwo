import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ICONS } from "@/data/icons";
import type { IconCard as IconCardData } from "@/data/site";
import { cn } from "@/lib/utils";

export function IconFeatureCard({
  data,
  className,
}: {
  data: IconCardData;
  className?: string;
}) {
  const Icon = ICONS[data.ico];
  const inner = (
    <>
      <span className="grid h-12 w-12 place-items-center rounded-[14px] border border-[rgba(255,45,149,.28)] bg-[rgba(139,47,214,.16)] text-pink-hover">
        <Icon className="h-6 w-6" />
      </span>
      <div className="mt-4">
        <h3 className="font-display text-[17px] font-bold text-text">{data.title}</h3>
        <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{data.desc}</p>
      </div>
      {data.cta && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-pink-hover">
          {data.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      )}
    </>
  );

  const cls = cn(
    "group flex flex-col rounded-[20px] border border-border bg-card-2 p-6 shadow-[0_6px_22px_rgba(60,30,80,.06)] transition-transform duration-200 hover:-translate-y-1",
    className,
  );

  if (data.href) {
    const external = data.href.startsWith("http") || data.href.startsWith("mailto:");
    if (external) {
      return (
        <a href={data.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={data.href} className={cls}>
        {inner}
      </Link>
    );
  }
  return <div className={cls}>{inner}</div>;
}
