import type { NextConfig } from "next";

const immutableAssetCache = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/icons/:path*",
        headers: immutableAssetCache,
      },
      {
        source: "/:path*(svg|ico|png|jpg|jpeg|gif|webp|woff|woff2)",
        headers: immutableAssetCache,
      },
    ];
  },
};

export default nextConfig;
