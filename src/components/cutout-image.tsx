"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Transparent-cutout portrait. A plain <img> (not next/image) so CSS masks and
 * object-position work as the design needs. If the asset is missing it hides
 * itself, so the styled backdrop shows through instead of a broken-image icon.
 */
export function CutoutImage({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Catch images that already 404'd before hydration attached onError.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, [src]);

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  );
}
