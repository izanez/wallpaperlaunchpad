import categories from "@/data/categories.json";
import collections from "@/data/collections.json";
import wallpapers from "@/data/wallpapers.json";
import type { Category, Collection, Wallpaper } from "@/lib/types";

const allCategories = categories as Category[];
const allCollections = collections as Collection[];
const allWallpapers = wallpapers as Wallpaper[];

export function getCategories() {
  return allCategories;
}

export function getCategoryBySlug(slug: string) {
  return allCategories.find((category) => category.slug === slug);
}

export function getCollections() {
  return allCollections;
}

export function getCollectionBySlug(slug: string) {
  return allCollections.find((collection) => collection.slug === slug);
}

export function getWallpapers() {
  return [...allWallpapers].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getWallpaperBySlug(slug: string) {
  return allWallpapers.find((wallpaper) => wallpaper.slug === slug);
}

export function getWallpapersBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getWallpaperBySlug(slug))
    .filter((wallpaper): wallpaper is Wallpaper => Boolean(wallpaper));
}

export function getWallpapersByCategory(categorySlug: string) {
  return getWallpapers().filter((wallpaper) => wallpaper.category === categorySlug);
}

export function getNewestWallpapers(limit = 4) {
  return getWallpapers().slice(0, limit);
}

export function getPopularWallpapers(limit = 4) {
  return getWallpapers()
    .sort((a, b) => b.tags.length - a.tags.length)
    .slice(0, limit);
}

type RelatedWallpaperScore = {
  wallpaper: Wallpaper;
  score: number;
};

function getSharedTagCount(source: Wallpaper, candidate: Wallpaper) {
  const sourceTags = new Set(source.tags);
  return candidate.tags.filter((tag) => sourceTags.has(tag)).length;
}

function scoreRelatedWallpaper(source: Wallpaper, candidate: Wallpaper) {
  let score = 0;

  if (source.category === candidate.category) {
    score += 8;
  }

  const sharedTagCount = getSharedTagCount(source, candidate);
  score += sharedTagCount * 5;

  if (source.mood === candidate.mood) {
    score += 4;
  }

  if (source.style === candidate.style) {
    score += 4;
  }

  if (
    (source.width >= source.height && candidate.width >= candidate.height) ||
    (source.width < source.height && candidate.width < candidate.height)
  ) {
    score += 2;
  }

  return score;
}

export function getRelatedWallpapers(slug: string, limit = 6) {
  const sourceWallpaper = getWallpaperBySlug(slug);

  if (!sourceWallpaper) {
    return [];
  }

  const rankedWallpapers: RelatedWallpaperScore[] = getWallpapers()
    .filter((wallpaper) => wallpaper.slug !== slug)
    .map((wallpaper) => ({
      wallpaper,
      score: scoreRelatedWallpaper(sourceWallpaper, wallpaper)
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return (
        new Date(b.wallpaper.createdAt).getTime() - new Date(a.wallpaper.createdAt).getTime()
      );
    });

  const fallbackWallpapers = getWallpapers()
    .filter(
      (wallpaper) =>
        wallpaper.slug !== slug &&
        !rankedWallpapers.some((entry) => entry.wallpaper.slug === wallpaper.slug)
    )
    .map((wallpaper) => ({
      wallpaper,
      score: 0
    }));

  return [...rankedWallpapers, ...fallbackWallpapers]
    .slice(0, limit)
    .map((entry) => entry.wallpaper);
}

export function getCollectionsForWallpaper(slug: string) {
  return allCollections.filter((collection) => collection.wallpapers.includes(slug));
}

export function getCollectionForWallpaper(slug: string) {
  return getCollectionsForWallpaper(slug)[0];
}

export function getRelatedCollectionsForWallpaper(slug: string, limit = 3) {
  return getCollectionsForWallpaper(slug).slice(0, limit);
}

export function getCategoryTags(categorySlug: string) {
  const category = getCategoryBySlug(categorySlug);
  const wallpaperTags = getWallpapersByCategory(categorySlug).flatMap(
    (wallpaper) => wallpaper.tags
  );

  return Array.from(new Set([...(category?.tags ?? []), ...wallpaperTags])).sort();
}

export function getWallpaperFilterOptions(sourceWallpapers = allWallpapers) {
  return {
    categories: getCategories().map((category) => ({
      slug: category.slug,
      name: category.name
    })),
    formats: ["desktop", "mobile"],
    moods: Array.from(new Set(sourceWallpapers.map((wallpaper) => wallpaper.mood))).sort(),
    styles: Array.from(new Set(sourceWallpapers.map((wallpaper) => wallpaper.style))).sort(),
    tags: Array.from(new Set(sourceWallpapers.flatMap((wallpaper) => wallpaper.tags))).sort()
  };
}
