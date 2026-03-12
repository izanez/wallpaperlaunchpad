import type { AccessLevel, Collection, Wallpaper } from "@/lib/types";

export function isPremiumAccess(accessLevel: AccessLevel) {
  return accessLevel === "premium";
}

export function getAccessLabel(accessLevel: AccessLevel) {
  return isPremiumAccess(accessLevel) ? "Premium" : "Free";
}

export function collectionHasPremiumContent(collection: Collection, wallpapers: Wallpaper[]) {
  return (
    isPremiumAccess(collection.accessLevel) ||
    wallpapers.some((wallpaper) => isPremiumAccess(wallpaper.accessLevel))
  );
}
