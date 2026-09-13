type IconProps = {
  src: string;
  size: number;
  alt?: string;
  className?: string;
  /** Paint with `currentColor` so parent text color / hover can recolor the icon. */
  currentColor?: boolean;
};

/** Fixed outer box + leaf size from Figma asset geometry. */
export function Icon({
  src,
  size,
  alt = "",
  className,
  currentColor = false,
}: IconProps) {
  if (currentColor) {
    return (
      <span
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={`inline-block shrink-0 bg-current ${className ?? ""}`}
        style={{
          width: size,
          height: size,
          maskImage: `url(${src})`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskImage: `url(${src})`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
        }}
      />
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="block max-w-none"
        style={{ width: size, height: size }}
      />
    </span>
  );
}
