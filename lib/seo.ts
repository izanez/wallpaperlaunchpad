import type { Collection, Wallpaper } from "@/lib/types";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://wallpaperlaunchpad.example";
}

export function buildWallpaperAltText(wallpaper: Wallpaper, categoryName?: string) {
  return `${wallpaper.title}${categoryName ? ` in ${categoryName}` : ""} AI wallpaper, ${wallpaper.width}x${wallpaper.height}`;
}

export function buildCollectionAltText(collection: Collection) {
  return `${collection.title} collection cover image for WallpaperLaunchpad`;
}

export function buildCategoryAltText(categoryName: string) {
  return `${categoryName} preview artwork on WallpaperLaunchpad`;
}
