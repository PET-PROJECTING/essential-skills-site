const LOCAL_FALLBACK = "http://localhost:3000";

function normalizeOrigin(value: string): string {
  return value.replace(/\/$/, "");
}

/** Canonical site origin for metadataBase, sitemap, and robots. */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return normalizeOrigin(configured);
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }

  return LOCAL_FALLBACK;
}

export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}
