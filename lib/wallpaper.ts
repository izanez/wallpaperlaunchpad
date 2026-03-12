import type { Wallpaper } from "@/lib/types";

export function getWallpaperOrientation(wallpaper: Wallpaper) {
  return wallpaper.width >= wallpaper.height ? "desktop" : "mobile";
}

export function getWallpaperResolution(wallpaper: Wallpaper) {
  return `${wallpaper.width} x ${wallpaper.height}`;
}

export function getWallpaperFilename(wallpaper: Wallpaper) {
  const parts = wallpaper.image.split("/");
  return parts[parts.length - 1] ?? `${wallpaper.slug}.png`;
}
