import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/buy", priority: 0.9, freq: "monthly" },
    { path: "/sell", priority: 0.9, freq: "monthly" },
    { path: "/invest", priority: 0.9, freq: "monthly" },
    { path: "/property-help", priority: 0.95, freq: "monthly" },
    { path: "/videos", priority: 0.8, freq: "weekly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/reviews", priority: 0.75, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "monthly" },
    { path: "/privacy", priority: 0.3, freq: "monthly" },
  ];

  const now = new Date();
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
