"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Diagonal-stripe placeholder well that reveals a cover image when one exists.
 * Drop a real file at `src` (e.g. /assets/joseph-portrait.jpg) and it fills the
 * well; until then the striped pattern + label shows. `onError` needs a client
 * component, which is why this is split out.
 */
export function ImageWell({
  src,
  label,
  className,
}: {
  src?: string;
  label?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImg = src && !failed;

  return (
    <div className={cn("pattern-well relative overflow-hidden", className)}>
      {showImg && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
      {!showImg && label && (
        <span className="absolute inset-0 grid place-items-center px-4 text-center text-[13px] italic text-muted-2">
          {label}
        </span>
      )}
    </div>
  );
}
