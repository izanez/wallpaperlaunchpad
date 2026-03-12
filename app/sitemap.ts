import type { MetadataRoute } from "next";
import {
  getCategories,
  getCollections,
  getWallpapers
} from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteUrl}/browse`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95
    },
    {
      url: `${siteUrl}/collections`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9
    }
  ];

  const categoryPages = getCategories().map((category) => ({
    url: `${siteUrl}/categories/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85
  }));

  const collectionPages = getCollections().map((collection) => ({
    url: `${siteUrl}/collections/${collection.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  const wallpaperPages = getWallpapers().map((wallpaper) => ({
    url: `${siteUrl}/wallpapers/${wallpaper.slug}`,
    lastModified: new Date(wallpaper.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.75
  }));

  return [...staticPages, ...categoryPages, ...collectionPages, ...wallpaperPages];
}
