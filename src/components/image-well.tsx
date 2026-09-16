"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Placeholder well that reveals a cover image when one exists. Drop a real file
 * at `src` and it fills the well; until then it shows either a striped pattern
 * with a label, or (when `initials` is given) a gradient badge with initials —
 * handy for author avatars. `onError` needs a client component.
 */
export function ImageWell({
  src,
  label,
  initials,
  className,
}: {
  src?: string;
  label?: string;
  initials?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const showImg = src && !failed;

  // Catch images that already errored before hydration attached onError
  // (e.g. a fast 404 on a not-yet-added local asset).
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reflect an error that fired pre-hydration
      setFailed(true);
    }
  }, [src]);

  if (showImg) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  if (initials) {
    return (
      <div
        className={cn(
          "grid place-items-center overflow-hidden bg-accent-grad font-display font-bold text-white",
          className,
        )}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className={cn("pattern-well relative overflow-hidden", className)}>
      {label && (
        <span className="absolute inset-0 grid place-items-center px-4 text-center text-[13px] italic text-muted-2">
          {label}
        </span>
      )}
    </div>
  );
}
