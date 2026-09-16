import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Zuula Obusobozibwo — home"
      className={cn("flex items-center gap-2.5", className)}
    >
      <Image
        src="/assets/zuula-logo.png"
        alt="Zuula Obusobozibwo"
        width={40}
        height={40}
        className="h-9 w-9 object-contain"
        priority
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-extrabold tracking-tight text-text">
          ZUULA
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-muted-2">
          Obusobozibwo
        </span>
      </span>
    </Link>
  );
}
