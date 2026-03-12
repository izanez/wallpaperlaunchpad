import type { MetadataRoute } from "next";
import {
  getCategories,
  getCollections,
  getFaqPages,
  getIntentPages,
  getSeoGuides,
  getTagSlugs,
  getThemeHubs,
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
    },
    {
      url: `${siteUrl}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.88
    },
    {
      url: `${siteUrl}/themes`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.88
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.82
    },
    {
      url: `${siteUrl}/insights`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.82
    },
    {
      url: `${siteUrl}/tags`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
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

  const guidePages = getSeoGuides().map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.78
  }));

  const themePages = getThemeHubs().map((theme) => ({
    url: `${siteUrl}/themes/${theme.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.78
  }));

  const faqPages = getFaqPages().map((page) => ({
    url: `${siteUrl}/faq/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.76
  }));

  const insightPages = getIntentPages().map((page) => ({
    url: `${siteUrl}/insights/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.76
  }));

  const tagPages = getTagSlugs().map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.72
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...collectionPages,
    ...guidePages,
    ...themePages,
    ...faqPages,
    ...insightPages,
    ...tagPages,
    ...wallpaperPages
  ];
}
