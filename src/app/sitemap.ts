import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/menu", priority: 0.9, changeFrequency: "monthly" },
  { path: "/history", priority: 0.7, changeFrequency: "yearly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path}`,
    changeFrequency,
    priority,
  }));
}
