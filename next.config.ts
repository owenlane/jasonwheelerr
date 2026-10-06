import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  async redirects() {
    return [
      // R3: "Property Help" is renamed to "Renovations". The old route and
      // its former child both keep working so inbound links are not lost.
      // Ordered child-first so the deeper path is not swallowed by the
      // parent rule.
      {
        source: "/property-help/out-of-state-owners",
        destination: "/renovations#out-of-state-owners",
        permanent: true,
      },
      {
        source: "/property-help",
        destination: "/renovations",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
